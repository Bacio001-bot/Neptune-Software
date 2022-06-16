import chalk from "chalk";
import CustomClient from "../classes/Client";
declare class Logger {
    constructor(client: CustomClient, prefix?: string);
    getPrefix(prefix: "default" | "log" | "command" | "event"): string;
    setPrefix(prefix: string): string;
    message(message: string): void;
    log(log: string): void;
    logCommand(log: string): void;
    logEvent(log: string): void;
    logLicense(log: string): void;
    logDiscord(log: string): void;
    logMinecraft(log: string): void;
    highlight(text: string): string;
    chalk(): chalk.Chalk;
    logo(): void;
}
interface Logger {
    client: CustomClient;
    prefixes: {
        default: string;
        log: string;
        license: string;
        command: string;
        event: string;
        discord: string;
        minecraft: string;
    };
}
export default Logger;
