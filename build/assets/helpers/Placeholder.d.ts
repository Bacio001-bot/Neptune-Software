import { Guild, GuildMember } from "discord.js";
import CustomClient from "../classes/Client";
import IUser from "../interfaces/IUser";
export default class Placeholder {
    client: CustomClient;
    guild?: Guild | undefined;
    getUser: (findBy: string, property: string) => IUser | null;
    constructor(client: CustomClient);
    replace(message: string, user: GuildMember | null, author: GuildMember | null, player: string | null): string;
    replaceWelcomeMessage(message: string, user: GuildMember | null): string;
}
