#!/usr/bin/node

var lineReader = require("readline").createInterface({
  input: process.stdin,
});

lineReader.on("line", (input) => {
  const line = JSON.parse(input);
  if (line.type == "user") {
    const channel = line.channel;
    process.stdout.write(`${input}\n`);
  }
});
