# Mattermost to Slack Migration

There are 3 basic steps:

1. Export data from Mattermost
2. Convert data from Mattermost format to Slack format
3. Import data into Slack

## Pre-requisites

-   [node](https://nodejs.org/en/) >= 15
-   [csvkit](https://csvkit.readthedocs.io): on MacOS using [homebrew](https://brew.sh) install with `brew install csvkit`.

## Export data from Mattermost

Follow the guide at:
https://docs.mattermost.com/administration/bulk-export.html#running-the-bulk-export-command

This needs to be run from the Mattermost server.

```
sudo -u mattermost bin/mattermost export bulk bulk.json
```

Copy this file from the mattermost server to your local machine to make the next steps easier.

## Convert data from Mattermost format to Slack format

To list all exported channels, execute the following command, where <bulk.json> is the file generated in the previous step.

```
cat <bulk.json> | yarn --silent start channels | csvsort -H -c 2 | tail -n +2
```

To list all exported users, execute the following command, where <bulk.json> is the file generated in the previous step.

```
cat <bulk.json> | yarn --silent start users | csvsort -H -c 1 | tail -n +2
```

Now, for each desired channel, execute the following command:

```
./migrate.sh <channel_name>
```

This will create a file called <channel_name>.json in the current directory.

## Import data into Slack

Now go to the address below and import the file created in the previous step.

https://your_domain.slack.com/services/import/csv

The UI will guide through the process of mapping the users and channel to data in Slack.

-   Users can be mapped to existing users, ignored, or invited to join Slack.
-   Channels can be created private or public. Private channels cannot be made public.
