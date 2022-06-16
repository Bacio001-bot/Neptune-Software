"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    constructor(client, prefix = `${chalk_1.default.gray("[")}${chalk_1.default.blueBright("!")}${chalk_1.default.gray("]")}`) {
        this.client = client;
        this.prefixes = {
            default: prefix,
            log: `${chalk_1.default.gray("[")}${chalk_1.default.yellow("LOG")}${chalk_1.default.gray("]")}`,
            command: `${chalk_1.default.gray("[")}${chalk_1.default.blueBright("COMMANDS")}${chalk_1.default.gray("]")}`,
            license: `${chalk_1.default.gray("[")}${chalk_1.default.redBright("❌")}${chalk_1.default.gray("]")}`,
            event: `${chalk_1.default.gray("[")}${chalk_1.default.blueBright("EVENTS")}${chalk_1.default.gray("]")}`,
            discord: `${chalk_1.default.gray("[")}${chalk_1.default.redBright("DISCORD")}${chalk_1.default.gray("]")}`,
            minecraft: `${chalk_1.default.gray("[")}${chalk_1.default.greenBright("MINECRAFT")}${chalk_1.default.gray("]")}`,
        };
    }
    getPrefix(prefix) { return this.prefixes[prefix]; }
    setPrefix(prefix) { return this.prefixes.default = prefix; }
    message(message) { return console.log(`${this.prefixes.default} ${message}\n`); }
    log(log) { return console.log(`${this.prefixes.log} ${log}\n`); }
    logCommand(log) { return this.log(`${this.prefixes.command} ${log}`); }
    logEvent(log) { return this.log(`${this.prefixes.event} ${log}`); }
    logLicense(log) { return this.log(`${this.prefixes.license} ${log}`); }
    logDiscord(log) { return this.log(`${this.prefixes.discord} ${log}`); }
    logMinecraft(log) { return this.log(`${this.prefixes.minecraft} ${log}`); }
    highlight(text) { return chalk_1.default.gray(text); }
    chalk() { return chalk_1.default; }
    logo() {
        console.log(chalk_1.default.black("--------------------------------------------------------------------------------------------------------------------------------------------------\n"), chalk_1.default.blue("███╗   ██╗███████╗██████╗ ████████╗██╗   ██╗███╗   ██╗███████╗"), chalk_1.default.blueBright("   ███████╗███████╗██████╗ ██╗   ██╗██╗ ██████╗███████╗███████╗\n"), chalk_1.default.blue("████╗  ██║██╔════╝██╔══██╗╚══██╔══╝██║   ██║████╗  ██║██╔════╝"), chalk_1.default.blueBright("   ██╔════╝██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝██╔════╝\n"), chalk_1.default.blue("██╔██╗ ██║█████╗  ██████╔╝   ██║   ██║   ██║██╔██╗ ██║█████╗ "), chalk_1.default.blueBright("    ███████╗█████╗  ██████╔╝██║   ██║██║██║     █████╗  ███████╗\n"), chalk_1.default.blue("██║╚██╗██║██╔══╝  ██╔═══╝    ██║   ██║   ██║██║╚██╗██║██╔══╝ "), chalk_1.default.blueBright("    ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██║██║     ██╔══╝  ╚════██║\n"), chalk_1.default.blue("██║ ╚████║███████╗██║        ██║   ╚██████╔╝██║ ╚████║███████╗"), chalk_1.default.blueBright("   ███████║███████╗██║  ██║ ╚████╔╝ ██║╚██████╗███████╗███████║\n"), chalk_1.default.blue("╚═╝  ╚═══╝╚══════╝╚═╝        ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚══════╝"), chalk_1.default.blueBright("   ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚═════╝╚══════╝╚══════╝\n"), chalk_1.default.gray("\n[»] "), chalk_1.default.bold("Neptune Services Server Bot V1"), chalk_1.default.gray("\n[»] "), chalk_1.default.bold(`Config contents validated`), chalk_1.default.gray("\n[»] "), chalk_1.default.bold("Developer: Bacio"), chalk_1.default.gray("\n[»] "), chalk_1.default.bold("https://discord.gg/Y8djTwsj88\n"));
    }
}
exports.default = Logger;
