#!/usr/bin/node

var lineReader = require("readline").createInterface({
  input: process.stdin,
});

const lines = [];
lineReader.on("line", (input) => lines.push(JSON.parse(input)));
lineReader.on("close", () => {
  const sorted = lines.sort((a, b) => a.post.create_at - b.post.create_at);
  sorted.forEach((l) => process.stdout.write(JSON.stringify(l) + "\n"));
});
