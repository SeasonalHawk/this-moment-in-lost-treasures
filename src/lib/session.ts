import { getIronSession, type SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  isAuthenticated: boolean;
  authenticatedAt: number;
}

const defaultSession: SessionData = {
  isAuthenticated: false,
  authenticatedAt: 0,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || 'fallback-secret-must-be-at-least-32-chars-long!!',
  cookieName: 'lost-treasures-session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24, // 24 hours
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  // Initialize defaults if session is empty
  if (session.isAuthenticated === undefined) {
    session.isAuthenticated = defaultSession.isAuthenticated;
    session.authenticatedAt = defaultSession.authenticatedAt;
  }

  return session;
}

/** Returns the session if authenticated, or null if not. Use in API route guards. */
export async function requireAuth() {
  const session = await getSession();
  if (!session.isAuthenticated) return null;
  return session;
}
