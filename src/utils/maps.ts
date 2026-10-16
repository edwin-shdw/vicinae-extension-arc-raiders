import { type ImageLike } from '@vicinae/api';

export interface ArcRaidersMap {
  name: string;
  interactiveMapUrl: string;
  coverImage: ImageLike;
  description: string;
}

export const arcRaidersMaps: ArcRaidersMap[] = [
  {
    name: 'Dam Battlegrounds',
    interactiveMapUrl: 'https://metaforge.app/arc-raiders/map/dam',
    coverImage: `${__dirname}/assets/maps/DamBattlegrounds.png`,
    description: 'Alcantara Power Plant, or "The Dam", stands as a silent sentinel amidst a toxic, waterlogged land, nourishing a riot of resilient vegetation and fauna. A monument echoing with the memories of a power once generated.',
  },
  {
    name: 'Spaceport',
    interactiveMapUrl: 'https://metaforge.app/arc-raiders/map/spaceport',
    coverImage: `${__dirname}/assets/maps/Spaceport.png`,
    description: 'Acerra Spaceport is a majestic testament to humanity’s past ambitions. This is where the Exodus shuttles, vessels of hope and desperation, once roared into the heavens, leaving a beleaguered Earth behind.',
  },
  {
    name: 'Buried City',
    interactiveMapUrl: 'https://metaforge.app/arc-raiders/map/buried-city',
    coverImage: `${__dirname}/assets/maps/BuriedCity.png`,
    description: 'Amidst the sand dunes in this arid wasteland you will find a remnant of the old world quite unlike the cold steel spires of the Exodus age. Walk these narrow streets and empty plazas, and know that people once lived here.',
  },
  {
    name: 'The Blue Gate',
    interactiveMapUrl: 'https://metaforge.app/arc-raiders/map/blue-gate',
    coverImage: `${__dirname}/assets/maps/TheBlueGate.png`,
    description: 'Once a steadfast symbol of defiant connection, the Blue Gate now serves as a daunting entryway into the perilous mountain ranges. The surrounding valley bears scars both new and old.',
  },
  {
    name: 'Stella Montis',
    interactiveMapUrl: 'https://metaforge.app/arc-raiders/map/stella-montis',
    coverImage: `${__dirname}/assets/maps/StellaMontis.png`,
    description: 'A secluded research facility amidst snow-draped peaks, Stella Montis is said to have been the last bulwark of humanity\'s preservation.',
  },
  {
    name: 'Riven Tides',
    interactiveMapUrl: 'https://metaforge.app/arc-raiders/map/riven-tides',
    coverImage: `${__dirname}/assets/maps/RivenTides.png`,
    description: 'A twice-abandoned coastal paradise, this magnificent harbor resort holds memories of both grand ambitions and reluctant retreat. Yet for all the upheaval this place has known, the ocean looks much the same.',
  },
  {
    name: 'Pendola Pass',
    interactiveMapUrl: 'https://metaforge.app/arc-raiders/map/pendola-pass',
    coverImage: `${__dirname}/assets/maps/PendolaPass.png`,
    description: 'A man-made eyrie of cutting-edge instruments and lofty ideals, this summit observatory now finds itself at the center of orbital attention.',
  },
];
