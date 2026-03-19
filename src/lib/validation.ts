import { GENRES } from './genres';

export function validateRequest(body: Record<string, unknown> | null) {
  if (!body || typeof body !== 'object') {
    return { valid: false as const, error: 'Request body is required' };
  }

  const { month, day, genre } = body;

  if (month === undefined || month === null) {
    return { valid: false as const, error: 'month is required' };
  }
  if (day === undefined || day === null) {
    return { valid: false as const, error: 'day is required' };
  }

  const monthNum = Number(month);
  const dayNum = Number(day);

  if (!Number.isInteger(monthNum) || monthNum < 1 || monthNum > 12) {
    return { valid: false as const, error: 'month must be an integer between 1 and 12' };
  }
  if (!Number.isInteger(dayNum) || dayNum < 1 || dayNum > 31) {
    return { valid: false as const, error: 'day must be an integer between 1 and 31' };
  }

  // Genre is optional — validate only if provided
  const genreStr = genre !== undefined && genre !== null ? String(genre) : null;
  if (genreStr !== null && !(GENRES as readonly string[]).includes(genreStr)) {
    return { valid: false as const, error: 'Invalid genre' };
  }

  return { valid: true as const, data: { month: monthNum, day: dayNum, genre: genreStr } };
}

export function monthName(month: number) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1] || 'January';
}

export function buildUserMessage(month: number, day: number, genre?: string) {
  const base = `Write a comical creative nonfiction vignette about a REAL lost treasure, misplaced fortune, or vanished valuable connected to ${monthName(month)} ${day}. Focus on the most outlandish, absurd, and factually documented treasure losses in history.`;

  if (!genre) {
    return base;
  }

  return `${base} GENRE LENS: "${genre}". Find a lost treasure event from this date that fits the ${genre} genre. Let this genre shape your comedic storytelling approach: adopt the tone, pacing, and humor style that ${genre} content demands. Lead with the absurd details that this genre thrives on — the bumbling treasure hunters, the cosmic irony, and the face-palm moments that make ${genre} stories hilarious. Choose the narrative angle that a ${genre} comedian-historian would instinctively gravitate toward. The event must still be historically accurate, but frame it through the ${genre} lens with maximum comedic effect.`;
}
