import { metaforgeLinks } from './links';
import { LocalStorage, showToast, Toast } from '@vicinae/api';
import { LocalStorageKeys } from './local-storage';

export interface WeeklyTrialsResponse {
  data: WeeklyTrial[];
  activeWindowEnd: number;
  nextWindowStart: number;
}

export interface WeeklyTrial {
  id: string;
  trial_id: string;
  name: string;
  content_name: string;
  image_url: string;
  guide_link: string | null;
  video_link: string | null;
  database_links: TrialDatabaseLink[];
  is_active: boolean;
  upcoming: boolean;
  has_event_header: boolean;
  sort_order: number;
  multiplier: number | null;
  parameters: TrialParameter[] | null;
  objective_id: number | null;
  window_id: number | null;
  map_ids: number[] | null;
  map_names: string[];
  map_condition: string | null;
  map_links: TrialMapLink[];
  image_id: number | null;
  description_key: string | null;
  type: TrialType | null;
  window_start: number | null;
  window_end: number | null;
}

export type TrialType = "Damage" | "Interact" | "KillEnemy";

export interface TrialParameter {
  name: string;
  value: string;
}

export interface TrialDatabaseLink {
  url: string;
  label: string;
  icon_url: string;
}

export interface TrialMapLink {
  mapId: string;
  mapName: string;
  enemyIds: string[];
  url: string;
}

export async function getTrialsData() {
  const response = await fetch(metaforgeLinks.trialsApi);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.json() as WeeklyTrialsResponse;
}

export async function getActiveTrialsFromApi() {
  const apiResponse = await getTrialsData();
  apiResponse.data = apiResponse.data.filter(weeklyTrial => weeklyTrial.is_active);

  return apiResponse;
}

async function updateLocalStorage() {
  const activeWeeklyTrials = await getActiveTrialsFromApi();
  await LocalStorage.setItem(LocalStorageKeys.activeWeeklyTrials, JSON.stringify(activeWeeklyTrials));
  await showToast({ title: 'Fetched latest trials', style: Toast.Style.Success });

  return activeWeeklyTrials;
}

export async function getActiveTrials() {
  const localStoredDataString = await LocalStorage.getItem<string>(LocalStorageKeys.activeWeeklyTrials);

  if (!localStoredDataString) {
    return await updateLocalStorage();
  }

  const localStoredData = await JSON.parse(localStoredDataString) as WeeklyTrialsResponse;

  if ((localStoredData.activeWindowEnd * 1000) <= Date.now()) {
    return await updateLocalStorage();
  }

  return localStoredData;
}
