export default interface IGiveaway {
    discordID: string;
    giveawayID: number;
    title: string;
    description: string;
    requiredInvites: number;
    price: string;
    winner: string;
    active: boolean;
    channelID: string;
    messageID: string
    startDate: string;
    endDate: string;
    durationMs: number;
    enteries: string[];
}