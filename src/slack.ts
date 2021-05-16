import transform from "stream-transform";
import { Post } from "./model";

export type SlackMessage = {
    timestamp: number;
    channel: string;
    user: string;
    message: string;
};

// slack timestamp goes to second (not millisecond)
const convertTimestamp = (ts: number): number => Math.floor(ts / 1000);

// getting rid of escaped quotes, because
const cleanMessage = (str: string): string => str.replace(/\\"/g, '"');

export interface SlackOptions {
    includeMessage?: boolean;
    includeReplies?: boolean;
}

export default (options?: SlackOptions) =>
    transform<Post>((post, callback) => {
        const { includeMessage = true, includeReplies = true } = options || {};

        const messages: SlackMessage[] = [];
        // convert message
        if (includeMessage) {
            messages.push({
                timestamp: convertTimestamp(post.create_at),
                channel: post.channel,
                user: post.user,
                message: cleanMessage(post.message),
            });
        }

        // convert post replies
        if (includeReplies) {
            const replies = post.replies || [];
            messages.push(
                ...replies.map((reply) => ({
                    timestamp: convertTimestamp(reply.create_at),
                    channel: post.channel,
                    user: reply.user,
                    message: cleanMessage(reply.message),
                }))
            );
        }

        callback(null, ...messages);
    });
