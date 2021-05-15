#!/bin/sh
cat data/bulk.json | yarn --silent start posts --channel $1 | csvsort -H -c 1 | tail -n +2 > data/$1.csv
