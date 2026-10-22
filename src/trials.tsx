import { useEffect, useState } from 'react';
import { getActiveTrials, WeeklyTrial, type WeeklyTrialsResponse } from './utils/trials';
import { Action, ActionPanel, Detail, Grid, Icon, List, useNavigation } from '@vicinae/api';
import { metaforgeLinks } from './utils/links';

export default function ActiveWeeklyTrials() {
  const [activeTrials, setActiveTrials] = useState<WeeklyTrialsResponse|null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApiError, setIsApiError] = useState(false);
  const { push } = useNavigation();

  useEffect(() => {
    getActiveTrials()
      .then(value => setActiveTrials(value))
      .catch(() => setIsApiError(true))
      .finally(() => setIsLoading(false))
  }, []);

  return (
    <Grid
      searchBarPlaceholder="This weeks trials"
      isLoading={isLoading}
      columns={3}
      aspectRatio="3/4"
      fit={Grid.Fit.Contain}
    >
      <EmptyView isApiError={isApiError} />
      {activeTrials?.data.map((trial) => (
        <Grid.Item
          key={trial.trial_id}
          content={trial.image_url}
          title={trial.name}
          actions={
            <ActionPanel>
              <Action title="Show description" onAction={() => push(TrialsDetail(trial))} />
              <Action.OpenInBrowser title="Show trials on metaforge.app" url={metaforgeLinks.trialsPage} icon={Icon.ArrowNe} />
            </ActionPanel>
          }
        />
      ))}
    </Grid>
  )
}

function TrialsDetail(trial: WeeklyTrial) {
  return (
    <Detail markdown={`## ${trial.name}\n\n ![](${trial.image_url})`} />
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
            <Action.OpenInBrowser title="Show trials on metaforge.app" url={metaforgeLinks.trialsPage} icon={Icon.ArrowNe} />
          </ActionPanel>
        }
      />
    );
  }

  return (
    <List.EmptyView
      icon={Icon.AppWindowList}
      title="No trials"
      description="It seems like there are no trials this week."
    />
  );
}

