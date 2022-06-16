import chalk from "chalk";
import CustomClient from "../classes/Client";

class Logger {       
    constructor(client: CustomClient, prefix = `${chalk.gray("[")}${chalk.blueBright("!")}${chalk.gray("]")}`) {
        this.client = client;

        this.prefixes = {
            default: prefix,
            log: `${chalk.gray("[")}${chalk.yellow("LOG")}${chalk.gray("]")}`,
            command: `${chalk.gray("[")}${chalk.blueBright("COMMANDS")}${chalk.gray("]")}`,
            license: `${chalk.gray("[")}${chalk.redBright("❌")}${chalk.gray("]")}`,
            event: `${chalk.gray("[")}${chalk.blueBright("EVENTS")}${chalk.gray("]")}`,
            discord: `${chalk.gray("[")}${chalk.redBright("DISCORD")}${chalk.gray("]")}`,
            minecraft: `${chalk.gray("[")}${chalk.greenBright("MINECRAFT")}${chalk.gray("]")}`,
        };
    }

    getPrefix(prefix: "default" | "log" | "command" | "event"): string { return this.prefixes[prefix]; }

    setPrefix(prefix: string): string { return this.prefixes.default = prefix; }

    message(message: string): void { return console.log(`${this.prefixes.default} ${message}\n`); }

    log(log: string): void { return console.log(`${this.prefixes.log} ${log}\n`); }

    logCommand(log: string): void { return this.log(`${this.prefixes.command} ${log}`); }

    logEvent(log: string): void { return this.log(`${this.prefixes.event} ${log}`); }

    logLicense(log: string): void { return this.log(`${this.prefixes.license} ${log}`); }

    logDiscord(log: string): void { return this.log(`${this.prefixes.discord} ${log}`); }

    logMinecraft(log: string): void { return this.log(`${this.prefixes.minecraft} ${log}`); }

    highlight(text: string): string { return chalk.gray(text); }

    chalk(): chalk.Chalk { return chalk; }

    logo(): void {
        console.log(

            chalk.black ("--------------------------------------------------------------------------------------------------------------------------------------------------\n"),
            chalk.blue("███╗   ██╗███████╗██████╗ ████████╗██╗   ██╗███╗   ██╗███████╗"),chalk.blueBright ("   ███████╗███████╗██████╗ ██╗   ██╗██╗ ██████╗███████╗███████╗\n"),
            chalk.blue("████╗  ██║██╔════╝██╔══██╗╚══██╔══╝██║   ██║████╗  ██║██╔════╝"),chalk.blueBright ("   ██╔════╝██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝██╔════╝\n"),
            chalk.blue("██╔██╗ ██║█████╗  ██████╔╝   ██║   ██║   ██║██╔██╗ ██║█████╗ "),chalk.blueBright ("    ███████╗█████╗  ██████╔╝██║   ██║██║██║     █████╗  ███████╗\n"),
            chalk.blue("██║╚██╗██║██╔══╝  ██╔═══╝    ██║   ██║   ██║██║╚██╗██║██╔══╝ "),chalk.blueBright ("    ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██║██║     ██╔══╝  ╚════██║\n"),
            chalk.blue("██║ ╚████║███████╗██║        ██║   ╚██████╔╝██║ ╚████║███████╗"),chalk.blueBright ("   ███████║███████╗██║  ██║ ╚████╔╝ ██║╚██████╗███████╗███████║\n"),
            chalk.blue("╚═╝  ╚═══╝╚══════╝╚═╝        ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚══════╝"),chalk.blueBright ("   ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚═════╝╚══════╝╚══════╝\n"),
            chalk.gray("\n[»] "),chalk.bold("Neptune Services Server Bot V1"),
            chalk.gray("\n[»] "),chalk.bold(`Config contents validated`),
            chalk.gray("\n[»] "),chalk.bold("Developer: Bacio"),
            chalk.gray("\n[»] "),chalk.bold("https://discord.gg/Y8djTwsj88\n"),
          
          );
    }

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