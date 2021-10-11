import { RankString } from "./Types";

export default interface IUser {
    discordID: string;
    discordTag: string;
    paypal: string;
    ign: string;
    rank: RankString; 
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