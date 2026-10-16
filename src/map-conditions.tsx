import { useEffect, useState } from 'react';
import {
  getRegionalSchedule,
  regionNames,
  type Region,
  type RegionalMapCondition,
  filterActiveConditions,
} from './utils/map-conditions';
import {
  Action,
  ActionPanel,
  Color,
  Icon,
  List,
  openExtensionPreferences,
} from '@vicinae/api';
import { getPreferenceValues } from './utils/preferences';
import { arcRaidersLinks, metaforgeLinks } from './utils/links';

const timeOptions: Intl.DateTimeFormatOptions = {
  hourCycle: 'h23',
  hour: '2-digit',
  minute: '2-digit',
};

const dateOptions: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
};

function getTimeFrameString(condition: RegionalMapCondition): string {
  const startTime = new Date(condition.startTime);
  const endTime = new Date(condition.endTime);
  return `${startTime.toLocaleDateString(undefined, dateOptions)} · ${startTime.toLocaleTimeString(undefined, timeOptions)} - ${endTime.toLocaleTimeString(undefined, timeOptions)}`;
}

function getNextConditionTag(condition: RegionalMapCondition): List.Item.Tag {
  const difference = new Date(condition.startTime).getTime() - Date.now();

  const minutes = Math.ceil(difference / 60 / 1000) % 60;

  if (difference <= 60 * 60 * 1000) {
    return {
      value: `${minutes}min`,
      color: Color.Magenta,
    };
  }

  const hours = Math.floor(difference / 60 / 60 / 1000);

  return {
    value: `${hours}h ${minutes}min`,
    color: Color.SecondaryText,
  }
}

export default function MapConditionsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState<Region>(getPreferenceValues().region);
  const [activeConditions, setActiveConditions] = useState<RegionalMapCondition[]>([]);
  const [upcomingConditions, setUpcomingConditions] = useState<RegionalMapCondition[]>([]);
  const [isApiError, setIsApiError] = useState(false);

  useEffect(() => {
    getRegionalSchedule().then(schedule => {
      const timestampNow = Date.now();
      setActiveConditions(filterActiveConditions(schedule[region]));
      setUpcomingConditions(schedule[region].filter((condition) => new Date(condition.startTime).getTime() > timestampNow));
    })
      .catch(() => setIsApiError(true))
      .finally(() => setIsLoading(false));
  }, [region]);

  return (
    <List
      searchBarPlaceholder="Search map conditions..."
      isLoading={isLoading}
      searchBarAccessory={
        <List.Dropdown value={region} onChange={setRegion as (newValue: string) => void}>
          {Object.entries(regionNames).map(([key, region]) => (
            <List.Dropdown.Item title={region} value={key} key={key} />
          ))}
        </List.Dropdown>
      }
      actions={
        <ActionPanel>
          <OpenScheduleLinksActions />
          <ActionPanel.Section>
            <Action
              title="Change default region"
              onAction={openExtensionPreferences}
              shortcut={{ modifiers: ["cmd"], key: "," }}
              icon={Icon.Cog}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    >
      <EmptyView isApiError={isApiError} />
      <List.Section title="Active now">
        {activeConditions.map((condition, index) => (
          <List.Item
            key={`active-${index}`}
            title={condition.conditionName}
            subtitle={condition.mapDisplayName}
            icon={condition.iconUrl}
            accessories={[
              {
                tag: {
                  value: 'Active',
                  color: Color.Green,
                },
              },
            ]}
          />
        ))}
      </List.Section>
      <List.Section title="Coming up">
        {upcomingConditions.map((condition, index) => (
          <List.Item
            key={`upcoming-${index}`}
            title={condition.conditionName}
            subtitle={condition.mapDisplayName}
            icon={condition.iconUrl}
            accessories={[
              {
                text: getTimeFrameString(condition),
              },
              {
                tag: getNextConditionTag(condition),
              },
            ]}
          />
        ))}
      </List.Section>
    </List>
  );
}

function EmptyView({ isApiError }: { isApiError: boolean }) {
  if (isApiError) {
    return (
      <List.EmptyView
        icon={Icon.Bug}
        title="API error"
        description="An error occured while fetching the data from the API"
        actions={
          <ActionPanel>
            <OpenScheduleLinksActions />
          </ActionPanel>
        }
      />
    );
  }

  return (
    <List.EmptyView
      icon={Icon.XMarkCircle}
      title="Nothing scheduled for now"
      description="It seems like there is no upcoming Map Condition."
    />
  );
}

function OpenScheduleLinksActions() {
  return (
    <>
      <Action.OpenInBrowser
        title="View schedule on arcraiders.com"
        url={arcRaidersLinks.mapConditionPage}
        icon={Icon.ArrowNe}
      />
      <Action.OpenInBrowser
        title="View schedule on metaforge.app"
        url={metaforgeLinks.mapConditionPage}
        icon={Icon.ArrowNe}
      />
    </>
  );
}
