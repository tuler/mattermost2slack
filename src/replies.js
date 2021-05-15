#!/usr/bin/node

var lineReader = require("readline").createInterface({
  input: process.stdin,
});

lineReader.on("line", (input) => {
  const line = JSON.parse(input);
  if (line.type == "post") {
    const replies = line.post.replies || [];
    replies.forEach((reply) => {
      const post = {
        type: "post",
        post: {
          team: line.post.team,
          channel: line.post.channel,
          user: reply.user,
          message: reply.message,
          create_at: reply.create_at,
        },
      };
      process.stdout.write(JSON.stringify(post) + "\n");
    });
  }
});
