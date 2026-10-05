import { Region } from './map-conditions';
import { getPreferenceValues as viciGetPreferenceValues } from '@vicinae/api';

export interface Preferences {
  region: Region;
}

export function getPreferenceValues() {
  return viciGetPreferenceValues<Preferences>();
}
