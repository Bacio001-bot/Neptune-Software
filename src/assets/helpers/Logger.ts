import chalk, { 
    white, 
    Chalk, 
} from "chalk";
import CustomClient from "../classes/Client";

class Logger {       
    constructor(client: CustomClient, prefix = `${chalk.gray("[")}${chalk.blueBright("!")}${chalk.gray("]")}`) {
        this.client = client;

        this.prefixes = {
            default: prefix,
            log: `${chalk.gray("[")}${chalk.yellow("LOG")}${chalk.gray("]")}`,
            command: `${chalk.gray("[")}${chalk.blueBright("COMMANDS")}${chalk.gray("]")}`,
            event: `${chalk.gray("[")}${chalk.blueBright("EVENTS")}${chalk.gray("]")}`
        };
    }

    getPrefix(prefix: "default" | "log" | "command" | "event"): string { return this.prefixes[prefix]; }

    setPrefix(prefix: string): string { return this.prefixes.default = prefix; }

    message(message: string): void { return console.log(`${this.prefixes.default} ${message}\n`); }

    log(log: string): void { return console.log(`${this.prefixes.log} ${log}\n`); }

    logCommand(log: string): void { return this.log(`${this.prefixes.command} ${log}`); }

    logEvent(log: string): void { return this.log(`${this.prefixes.event} ${log}`); }

    chalk(): Chalk { return chalk };

}

interface Logger {
    client: CustomClient;
    prefixes: {
        default: string;
        log: string;
        command: string;
        event: string;
    };
}

export default Logger;