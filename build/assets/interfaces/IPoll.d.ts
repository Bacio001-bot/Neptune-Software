export default interface IPoll {
    discordID: string;
    pollID: number;
    title: string;
    description: string;
    options: string;
    active: boolean;
    channelID: string;
    messageID: string;
    startDate: string;
    endDate: string;
    durationMs: number;
    votes: [
        {
            option?: string;
            voteCount?: number;
            voters?: string[];
        }
    ];
}
