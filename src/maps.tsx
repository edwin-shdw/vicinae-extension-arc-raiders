import { Action, ActionPanel, Color, Icon, List } from '@vicinae/api';
import { type ArcRaidersMap, arcRaidersMaps } from './utils/maps';
import { useEffect, useState } from 'react';
import {
  filterActiveConditions,
  getRegionalSchedule,
  type Region,
  type RegionalMapCondition,
} from './utils/map-conditions';
import { getPreferenceValues } from './utils/preferences';

export default function MapConditionsList() {
  const [activeConditions, setActiveConditions] = useState<RegionalMapCondition[]>([]);
  const [region, setRegion] = useState<Region>(getPreferenceValues().region);

  useEffect(() => {
    getRegionalSchedule().then(schedule => {
      setActiveConditions(filterActiveConditions(schedule[region]));
    });
  }, []);

  return (
    <List isShowingDetail>
      {arcRaidersMaps.map((map) => (
        <List.Item
          key={map.name}
          title={map.name}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser title="Open interactive map" url={map.interactiveMapUrl} icon={Icon.ArrowNe} />
              <ActionPanel.Section>
                <Action.Open title="View events" target={`vicinae://launch/@edwin-shdw/arc-raiders/map-conditions?fallbackText=${map.name}`} />
              </ActionPanel.Section>
            </ActionPanel>
          }
          detail={DetailView(map, activeConditions)}
        />
      ))}
    </List>
  );
}

function DetailView(map: ArcRaidersMap, activeConditions: RegionalMapCondition[]) {
  activeConditions = activeConditions.filter(condition => condition.mapDisplayName === map.name);

  return (
    <List.Item.Detail
      markdown={`# ${map.name}\n\n![](${map.coverImage.toString()})\n\n${map.description}`}
      metadata={
        <List.Item.Detail.Metadata>
          <List.Item.Detail.Metadata.TagList title="Currently Active Condition">
            {activeConditions.length
              ? activeConditions.map((condition, index) => (
                <List.Item.Detail.Metadata.TagList.Item
                  key={`${condition.type}-${index}`}
                  icon={condition.iconUrl}
                  text={condition.conditionName}
                  color={Color.Yellow}
                />
              ))
              : <List.Item.Detail.Metadata.TagList.Item text="None" />
            }
          </List.Item.Detail.Metadata.TagList>
        </List.Item.Detail.Metadata>
      }
    />
  )
}
