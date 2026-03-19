import { NextRequest } from 'next/server';
import { getSession } from '@/lib/session';
import { verifyPin } from '@/lib/pinAuth';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  const { allowed, retryAfter } = rateLimit(ip);
  if (!allowed) {
    return Response.json({ error: 'Too many requests', retryAfter }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.pin !== 'string') {
    return Response.json({ error: 'PIN is required' }, { status: 400 });
  }

  const result = verifyPin(body.pin, ip);

  if (!result.success) {
    if (result.locked) {
      return Response.json(
        { error: 'Too many failed attempts. Try again later.', retryAfter: result.retryAfter },
        { status: 429 }
      );
    }
    return Response.json(
      { error: 'Invalid PIN', attemptsRemaining: result.attemptsRemaining },
      { status: 401 }
    );
  }

  // PIN correct — create session
  const session = await getSession();
  session.isAuthenticated = true;
  session.authenticatedAt = Date.now();
  await session.save();

  return Response.json({ success: true });
}
