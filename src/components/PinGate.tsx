'use client';

import { useState, useRef, useCallback } from 'react';

interface PinGateProps {
  onAuthenticated: () => void;
}

export default function PinGate({ onAuthenticated }: PinGateProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 8 || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onAuthenticated();
        return;
      }

      if (res.status === 429) {
        const retryAfter = data.retryAfter || 900;
        setLockedUntil(Date.now() + retryAfter * 1000);
        setError(`Too many attempts. Try again in ${Math.ceil(retryAfter / 60)} minutes.`);
      } else if (res.status === 401) {
        setAttemptsRemaining(data.attemptsRemaining ?? null);
        setError(
          data.attemptsRemaining !== undefined
            ? `Invalid PIN. ${data.attemptsRemaining} attempt${data.attemptsRemaining !== 1 ? 's' : ''} remaining.`
            : 'Invalid PIN.'
        );
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setPin('');
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [pin, loading, onAuthenticated]);

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-500 tracking-tight">
            This Moment in Lost Treasures
          </h1>
          <p className="text-stone-400 mt-2 text-sm">
            Enter your access code to continue
          </p>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="bg-stone-900 border border-stone-700 rounded-xl p-6 shadow-lg">
          <label htmlFor="pin-input" className="block text-stone-400 text-sm font-medium mb-2">
            8-Digit Access PIN
          </label>
          <input
            ref={inputRef}
            id="pin-input"
            type="text"
            inputMode="numeric"
            pattern="\d{8}"
            maxLength={8}
            value={pin}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              setPin(val);
              setError(null);
            }}
            placeholder="Enter PIN"
            autoFocus
            disabled={isLocked || loading}
            className="w-full px-4 py-3 bg-stone-800 border border-stone-600 rounded-lg text-center text-2xl tracking-[0.5em] font-mono text-stone-100 placeholder:text-stone-600 placeholder:tracking-normal placeholder:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* Error message */}
          {error && (
            <p className="mt-3 text-red-400 text-sm text-center" role="alert">
              {error}
            </p>
          )}

          {/* Attempts indicator */}
          {attemptsRemaining !== null && attemptsRemaining > 0 && attemptsRemaining <= 2 && !isLocked && (
            <div className="mt-2 flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < (5 - attemptsRemaining) ? 'bg-red-500' : 'bg-stone-600'
                  }`}
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={pin.length !== 8 || loading || isLocked}
            className="w-full mt-4 px-4 py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-700 disabled:text-stone-500 text-white font-medium rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </>
            ) : isLocked ? (
              'Locked Out'
            ) : (
              'Unlock'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-stone-600 text-xs mt-6">
          Built with Kajiro IQ Pro | Powered by Anthropic Claude
        </p>
      </div>
    </div>
  );
}
