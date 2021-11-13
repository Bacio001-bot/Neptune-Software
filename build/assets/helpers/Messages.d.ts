import { Message, Channel, ThreadChannel, GuildMember, TextChannel, ColorResolvable, Role, User, GuildEmoji, Sticker } from "discord.js";
import CustomClient from "../classes/Client";
export default class Messages {
    client: CustomClient;
    constructor(client: CustomClient);
    success(title: string, description: string, message: Message, deleteAfter?: number): Promise<void>;
    default(title: string, description: string, message: Message, deleteAfter?: number): Promise<void>;
    error(title: string, description: string, message: Message, deleteAfter?: number): Promise<void>;
    loading(title: string, description: string, message: Message, deleteAfter?: number): void;
    invalidUser(message: Message, channel: Channel | ThreadChannel): void;
    invalidRole(message: Message, channel: Channel | ThreadChannel): void;
    private(title: string, description: string, user: GuildMember, deleteAfter?: number): Promise<void>;
    voiceEvent(description: string, member: GuildMember, channel: TextChannel | ThreadChannel, color: ColorResolvable): Promise<void>;
    roleEvent(title: string, description: string, role: Role, channel: TextChannel | ThreadChannel, color: ColorResolvable): Promise<void>;
    banKickEvent(description: string, user: User, channel: TextChannel | ThreadChannel): Promise<void>;
    joinEvent(description: string, user: User, channel: TextChannel | ThreadChannel): Promise<void>;
    emojiEvent(title: string, description: string, emoji: GuildEmoji, channel: TextChannel | ThreadChannel, color: ColorResolvable): Promise<void>;
    stickerEvent(title: string, description: string, sticker: Sticker, channel: TextChannel | ThreadChannel, color: ColorResolvable): Promise<void>;
    boostEvent(title: string, description: string, channel: TextChannel): Promise<void>;
    ticketEvent(title: string, description: string, channel: TextChannel, color: ColorResolvable): Promise<void>;
}
