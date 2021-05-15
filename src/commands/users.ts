import ndjson from "ndjson";
import stringify from "csv-stringify";
import { users } from "../filter";

interface Args {}

export const command = ["users"];
export const describe = "Export users in CSV format";

export const handler = (args: Args) => {
    process.stdin
        .pipe(ndjson.parse())
        .pipe(users())
        .pipe(
            stringify({
                header: false,
                quoted: true,
                columns: [
                    "username",
                    "email",
                    "nickname",
                    "first_name",
                    "last_name",
                ],
            })
        )
        .pipe(process.stdout);
};
