#!/usr/bin/node

const lineReader = require("readline").createInterface({
  input: process.stdin,
});

lineReader.on("line", (input) => {
  const line = JSON.parse(input);
  if (line.type == "direct_post") {
    process.stdout.write(input + "\n");
  }
});
