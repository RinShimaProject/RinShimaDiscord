import { BaseCommand } from "../../structures/BaseCommand";
import { CommandQueryContext } from "../../structures/CommandQueryContext";
import { readFileSync } from "fs";
import { resolve } from "path";
import { glob } from "glob";

export default class TotalCodeCommand extends BaseCommand {
    public constructor(rin: BaseCommand["rin"]) {
        super(rin, {
            query: "totalcode",
            type: "text"
        });
    }

    public execute(context: CommandQueryContext): void {
        glob(resolve(__dirname, "..", "..", "**", "*.{js,ts}"), (err, files) => {
            if (err) {
                return context.reply({
                    content: "An error occurred while trying to get the total amount of code."
                });
            }

            const fileContents = files.map(file => readFileSync(file, "utf8"));

            return context.reply({
                embeds: [
                    this.rin.utils.createEmbed("success", `Files: ${files.length}\nLines: ${fileContents.map(v => v.split("\n").length).reduce((a, b) => a + b)}`)
                ]
            });
        });
    }
}