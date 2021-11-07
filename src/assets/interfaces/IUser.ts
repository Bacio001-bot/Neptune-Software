export default interface IUser {
    discordID: string;
    discordTag: string;
    discordName: string;
    verifyCode: string;
    tickets: {
        openTickets: number;
        closedTickets: number;
    }
}