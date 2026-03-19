export const GENRES = [
  'Sunken Ships & Drowned Gold',
  'Buried Pirate Loot',
  'Lost Crown Jewels',
  'Vanished Art Masterpieces',
  'Forgotten Tombs & Crypts',
  'Cursed Treasure Hunts',
  'Missing War Plunder',
  'Legendary Lost Mines',
  'Disappeared Museum Collections',
  'Shipwrecked Fortunes',
  'Hidden Vault Disasters',
  'Stolen Relics & Artifacts',
  'Lost Libraries & Scrolls',
  'Misplaced National Treasures',
  'Treasure Maps Gone Wrong',
  'Accidental Treasure Discoveries',
  'Ransomed Riches Never Returned',
  'Gold Rush Catastrophes',
  'Royal Heirlooms Gone AWOL',
  'Embarrassingly Lost Fortunes',
] as const;

export type Genre = (typeof GENRES)[number];

export function getRandomGenre(): Genre {
  return GENRES[Math.floor(Math.random() * GENRES.length)];
}
