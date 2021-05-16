import transform from "stream-transform";
import {
    Channel,
    ChannelRecord,
    Post,
    PostRecord,
    Record,
    User,
    UserRecord,
} from "./model";

export const users = () =>
    transform<Record, User | undefined>((record) =>
        record.type == "user" ? (record as UserRecord).user : undefined
    );

export const channels = () =>
    transform<Record, Channel | undefined>((record) =>
        record.type == "channel" ? (record as ChannelRecord).channel : undefined
    );

export const posts = (channels: string[] = []) =>
    transform<Record, Post | undefined>((record) => {
        if (record.type == "post") {
            const post = (record as PostRecord).post;
            if (
                (channels.length > 0 && channels.indexOf(post.channel) >= 0) ||
                channels.length == 0
            ) {
                return post;
            }
        }
    });
