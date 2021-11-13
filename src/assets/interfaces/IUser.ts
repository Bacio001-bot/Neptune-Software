export default interface IUser {
    discordID: string;
    discordName: string;
    verifyCode: string;
    tickets: {
        openTickets: number;
        closedTickets: number;
    }
    messages: {
        everyone: number;
        replies: number;
        tts: number;
        total: number;
    }
}