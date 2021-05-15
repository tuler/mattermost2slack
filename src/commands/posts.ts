import { Argv } from "yargs";
import ndjson from "ndjson";
import stringify from "csv-stringify";
import slack from "../slack";
import { posts } from "../filter";

interface Args {
    channel?: string;
}

export const command = ["posts"];
export const describe = "Export posts in CSV format";

export const builder = (yargs: Argv) => {
    return yargs.option("channel", {
        describe: "Filter by channel",
    });
};

export const handler = (args: Args) => {
    process.stdin
        .pipe(ndjson.parse())
        .pipe(posts(args.channel))
        .pipe(slack())
        .pipe(
            stringify({
                header: false,
                quoted: true,
                columns: ["timestamp", "channel", "user", "message"],
            })
        )
        .pipe(process.stdout);
};
