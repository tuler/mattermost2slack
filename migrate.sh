#!/bin/sh
cat bulk.json | node channel.js $1 | node sort.js | python mattermost_to_slack.py > $1.csv
