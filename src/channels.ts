#!/usr/bin/node

const lineReader = require("readline").createInterface({
  input: process.stdin,
});

lineReader.on("line", (input: string) => {
  const line = JSON.parse(input);
  if (line.type == "channel") {
    const channel = line.channel;
    process.stdout.write(`${channel.name}\t${channel.display_name}\n`);
  }
});
