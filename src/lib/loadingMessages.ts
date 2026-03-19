/**
 * Themed loading messages for each pipeline phase.
 *
 * Phase 1 (story generation): treasure hunt / expedition theme
 * Phase 2 (audio narration): discovery / unearthing theme
 */

export const STORY_PHASE_MESSAGES = [
  'Consulting a suspiciously stained treasure map...',
  'Bribing a parrot for insider information...',
  'Blowing dust off a very dramatic treasure chest...',
  'Cross-referencing pirate diaries with tax records...',
  'Digging through history\'s lost-and-found bin...',
];

export const AUDIO_PHASE_MESSAGES = [
  'A treasure hunter is clearing their throat...',
  'Polishing the narration until it gleams like gold...',
  'The storyteller found a megaphone in the ruins...',
  'Translating ancient treasure gossip into English...',
  'A voice echoes from inside a treasure chest...',
  'Someone is dramatically unrolling a scroll...',
];

/** Pick a random element from a non-empty array. */
export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
