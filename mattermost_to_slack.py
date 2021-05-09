#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import pprint
import csv
import sys
import fileinput

if __name__ == '__main__':
    writer = csv.writer(sys.stdout, lineterminator='\n', quoting=csv.QUOTE_ALL)
    for line in fileinput.input():
        data = json.loads(line)
        if data.has_key('post'):
            writer.writerow([data['post']['create_at']/1000, data['post']['channel'], data['post']['user'], data['post']['message'].encode('utf-8')])
