import { LocalStorage } from '@vicinae/api';
import { LocalStorageKeys, type LocalStorageRegionalEventSchedule } from './local-storage';

export type Region = 'europe' | 'north-america' | 'brazil' | 'east-asia' | 'oceania';

interface RegionInterface {
  start: string;
  end: string;
}

type MapConditionType = 'minor' | 'major';

type MapConditionRegions = Record<Region, RegionInterface>;

interface MapCondition {
  type: MapConditionType;
  conditionName: string;
  mapDisplayName: string;
  regions: MapConditionRegions;
  iconUrl: string;
}

interface MapConditionsApiResponse {
  conditions: MapCondition[];
}

export interface RegionalMapCondition {
  startTime: string;
  endTime: string;
  type: MapConditionType;
  conditionName: string;
  mapDisplayName: string;
  iconUrl: string;
}

export type RegionalMapConditionSchedule = Record<Region, RegionalMapCondition[]>;

export const regionNames: Record<Region, string> = {
  europe: 'Europe',
  'north-america': 'North America',
  brazil: 'South America',
  'east-asia': 'Asia',
  oceania: 'Oceania',
};

export async function getApiMapConditions() {
  const url = 'https://arcraiders.com/external-api/map-conditions';

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.json() as MapConditionsApiResponse;
}

export function buildRegionalSchedule(schedule: MapConditionsApiResponse) {
  const regions = Object.keys(regionNames)
    .reduce((result, region) => {
      result[region as Region] = [];
      return result;
    }, {} as RegionalMapConditionSchedule);

  schedule.conditions.forEach((condition) => {
    Object.entries(condition.regions).forEach(([key, region]) => {
      regions[key as Region].push({
        startTime: region.start,
        endTime: region.end,
        type: condition.type,
        conditionName: condition.conditionName,
        mapDisplayName: condition.mapDisplayName,
        iconUrl: condition.iconUrl,
      });
    });
  });

  return regions;
}

async function updateLocalStorage() {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).getTime();
  const apiSchedule = await getApiMapConditions();
  const regionalSchedule = buildRegionalSchedule(apiSchedule);
  await LocalStorage.setItem(LocalStorageKeys.regionalEventSchedule, JSON.stringify({
    expiresAt,
    regionalSchedule
  }));

  return regionalSchedule;
}

export async function getRegionalSchedule() {
  const localStoredDataString = await LocalStorage.getItem<string>(LocalStorageKeys.regionalEventSchedule);

  if (!localStoredDataString) {
    return await updateLocalStorage();
  }

  const localStoredData = await JSON.parse(localStoredDataString) as LocalStorageRegionalEventSchedule;

  if (localStoredData.expiresAt <= new Date().getTime()) {
    return await updateLocalStorage();
  }

  return localStoredData.regionalSchedule;
}
