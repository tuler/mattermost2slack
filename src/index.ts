import ndjson from "ndjson";
import transform from "stream-transform";
import stringify from "csv-stringify";
import {
    Channel,
    ChannelRecord,
    Post,
    PostRecord,
    Record,
    User,
    UserRecord,
} from "./model";

type SlackMessage = {
    timestamp: number;
    channel: string;
    user: string;
    message: string;
};

const slack = transform<Post, SlackMessage>((post) => {
    return {
        timestamp: Math.floor(post.create_at / 1000),
        channel: post.channel,
        user: post.user,
        message: post.message,
    };
});

const posts = transform<Record, Post | undefined>((record) =>
    record.type == "post" ? (record as PostRecord).post : undefined
);

const users = transform<Record, User | undefined>((record) =>
    record.type == "user" ? (record as UserRecord).user : undefined
);

const channels = transform<Record, Channel | undefined>((record) =>
    record.type == "channel" ? (record as ChannelRecord).channel : undefined
);

const channel = (channelName: string) =>
    transform<Post, Post | undefined>((post) =>
        post.channel == channelName ? post : undefined
    );

process.stdin
    .pipe(ndjson.parse())
    .pipe(posts)
    .pipe(channel("development"))
    .pipe(slack)
    .pipe(
        stringify({
            header: false,
            quoted: true,
            columns: ["timestamp", "channel", "user", "message"],
        })
    )
    .pipe(process.stdout);
