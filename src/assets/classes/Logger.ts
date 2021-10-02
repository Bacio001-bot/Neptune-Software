import chalk, { 
    keyword, 
    blueBright, 
    white, 
    hex, 
    Chalk, 
    yellow, 
    greenBright 
    } from "chalk";

class Logger {       
    constructor(prefix = `${blueBright}[${white}!${blueBright}]`) {
        this.prefixes = {
            default: prefix,
            log: `${white("[")}${yellow("LOG")}${white("]")}`,
            command: `${white("[")}${blueBright("COMMANDS")}${white("]")}`,
            event: `${white("[")}${greenBright("EVENTS")}${white("]")}`
        };
    }

    getPrefix(prefix: "default" | "log" | "command" | "event"): string { return this.prefixes[prefix]; }

    setPrefix(prefix: string): string { return this.prefixes.default = prefix; }

    color(color: string): Chalk { return keyword(color) || chalk[color] || hex(color); }

    log(log: string): void { return console.log(`${this.prefixes.log} ${log}\n`) }

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