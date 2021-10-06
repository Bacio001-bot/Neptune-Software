import chalk, { 
    keyword, 
    blueBright, 
    white, 
    hex, 
    Chalk, 
    yellow, 
    greenBright, 
    gray,
    bgGray
    } from "chalk";

class Logger {       
    constructor(prefix = `${chalk.gray("[")}${chalk.blueBright("!")}${chalk.gray("]")}`,) {
        this.prefixes = {
            default: prefix,
            log: `${chalk.gray("[")}${chalk.yellow("LOG")}${chalk.gray("]")}`,
            command: `${chalk.gray("[")}${chalk.blueBright("COMMANDS")}${chalk.gray("]")}`,
            event: `${chalk.gray("[")}${chalk.blueBright("EVENTS")}${chalk.gray("]")}`
        };
    }

    getPrefix(prefix: "default" | "log" | "command" | "event"): string { return this.prefixes[prefix]; }

    setPrefix(prefix: string): string { return this.prefixes.default = prefix; }

    color(color: string): Chalk { return keyword(color) || chalk[color] || hex(color); }

    message(message: string): void { return console.log(`${this.prefixes.default} ${message}\n`); }

    log(log: string): void { return console.log(`${this.prefixes.log} ${log}\n`); }

    logCommand(log: string): void { return this.log(`${this.prefixes.command} ${white(log)}`); }

    logEvent(log: string): void { return this.log(`${this.prefixes.event} ${white(log)}`); }

}

interface Logger {
    prefixes: {
        default: string;
        log: string;
        command: string;
        event: string;
    };
}

export default Logger;