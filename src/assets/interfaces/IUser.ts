export default interface IUser {
    discordID: string;
    discordName: string;
    verifyCode: string;
    xp: number;
    tickets: {
        openTickets: number;
        closedTickets: number;
    }
    applications: {
        openApplications: number;
        closedApplications: number;
    }
    messages: {
        everyone: number;
        replies: number;
        tts: number;
        total: number;
    }
    voiceTime: number;
}