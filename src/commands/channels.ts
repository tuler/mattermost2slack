import ndjson from "ndjson";
import stringify from "csv-stringify";
import { channels } from "../filter";

interface Args {}

export const command = ["channels"];
export const describe = "Export channels in CSV format";

export const handler = (args: Args) => {
    process.stdin
        .pipe(ndjson.parse())
        .pipe(channels())
        .pipe(
            stringify({
                header: false,
                quoted: true,
                columns: ["team", "name", "display_name"],
            })
        )
        .pipe(process.stdout);
};
