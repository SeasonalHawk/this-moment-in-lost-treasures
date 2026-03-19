import crypto from 'crypto';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes
const SWEEP_INTERVAL_MS = 5 * 60 * 1000; // Sweep stale entries every 5 minutes

interface AttemptRecord {
  attempts: number;
  lockedUntil: number; // 0 = not locked
}

const attemptMap = new Map<string, AttemptRecord>();
let lastSweep = Date.now();

function sweepStaleEntries(now: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;

  for (const [ip, record] of attemptMap) {
    // Remove entries that are unlocked and idle
    if (record.lockedUntil > 0 && now > record.lockedUntil) {
      attemptMap.delete(ip);
    } else if (record.lockedUntil === 0 && record.attempts === 0) {
      attemptMap.delete(ip);
    }
  }
}

export type VerifyResult =
  | { success: true }
  | { success: false; locked: boolean; retryAfter?: number; attemptsRemaining?: number };

export function verifyPin(submittedPin: string, ip: string): VerifyResult {
  const now = Date.now();
  sweepStaleEntries(now);

  const record = attemptMap.get(ip);

  // Check lockout
  if (record && record.lockedUntil > 0) {
    if (now < record.lockedUntil) {
      const retryAfter = Math.ceil((record.lockedUntil - now) / 1000);
      return { success: false, locked: true, retryAfter };
    }
    // Lockout expired — reset
    record.attempts = 0;
    record.lockedUntil = 0;
  }

  // Validate format
  if (!/^\d{8}$/.test(submittedPin)) {
    return { success: false, locked: false, attemptsRemaining: MAX_ATTEMPTS - (record?.attempts ?? 0) };
  }

  const correctPin = process.env.APP_ACCESS_PIN;
  if (!correctPin) {
    return { success: false, locked: false, attemptsRemaining: 0 };
  }

  // Timing-safe comparison
  const submittedBuf = Buffer.from(submittedPin);
  const correctBuf = Buffer.from(correctPin);
  const isCorrect = submittedBuf.length === correctBuf.length &&
    crypto.timingSafeEqual(submittedBuf, correctBuf);

  if (isCorrect) {
    // Clear attempts on success
    attemptMap.delete(ip);
    return { success: true };
  }

  // Wrong PIN — increment attempts
  if (!record) {
    attemptMap.set(ip, { attempts: 1, lockedUntil: 0 });
    return { success: false, locked: false, attemptsRemaining: MAX_ATTEMPTS - 1 };
  }

  record.attempts += 1;

  if (record.attempts >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
    const retryAfter = Math.ceil(LOCKOUT_MS / 1000);
    return { success: false, locked: true, retryAfter };
  }

  return { success: false, locked: false, attemptsRemaining: MAX_ATTEMPTS - record.attempts };
}

export function clearPinAttempts() {
  attemptMap.clear();
}
