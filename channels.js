#!/usr/bin/node

var lineReader = require("readline").createInterface({
  input: process.stdin,
});

let channels = [];
lineReader.on("line", (input) => {
  const line = JSON.parse(input);
  if (line.type == "channel") {
    channels.push(line.channel);
  }
});

lineReader.on("close", () => {
  channels = channels.sort((a, b) => a.name.localeCompare(b.name));
  channels.forEach((channel) => {
    process.stdout.write(`${channel.name} - ${channel.display_name}\n`);
  });
});
