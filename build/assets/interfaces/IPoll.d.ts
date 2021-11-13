export default interface IPoll {
    discordID: string;
    pollID: number;
    title: string;
    startDate: string;
    endDate: string;
    durationMs: number;
    noVoters: string[];
    yesVoters: string[];
}
