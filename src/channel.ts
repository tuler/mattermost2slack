#!/usr/bin/node

const lineReader = require("readline").createInterface({
  input: process.stdin,
});

const channel = process.argv[2];
lineReader.on("line", (input: string) => {
  const line = JSON.parse(input);
  if (line.type == "post" && line.post.channel == channel) {
    process.stdout.write(input + "\n");
  }
});
