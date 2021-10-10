export default interface IUser {
    discordID: string;
    discordTag: string;
    paypal: string;
    ign: string;
    rank: string; 
    checks: {
        wallChecks: number; 
        bufferChecks: number;
        lastWallChecked: number; 
        lastBufferChecked: number;
    }
    money: {
        deposits: number;
        withdraws: number; 
        balance: number;
    }
}