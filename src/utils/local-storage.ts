import type { RegionalMapConditionSchedule } from './map-conditions';

export const LocalStorageKeys = {
  regionalEventSchedule: 'regionalEventSchedule',
}

export interface LocalStorageRegionalEventSchedule {
  /** Timestamp when a refresh of the local storage should happen */
  expiresAt: number;
  regionalSchedule: RegionalMapConditionSchedule;
}
