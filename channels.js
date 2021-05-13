#!/usr/bin/node

var lineReader = require("readline").createInterface({
  input: process.stdin,
});

lineReader.on("line", (input) => {
  const line = JSON.parse(input);
  if (line.type == "channel") {
    const channel = line.channel;
    process.stdout.write(`${channel.name}\t${channel.display_name}\n`);
  }
});
