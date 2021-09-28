import { CustomClient } from "./Client";
import { ICommand } from "../interfaces/ICommand";
export declare class Command extends CustomClient {
    help: object;
    message: string;
    constructor(options: ICommand);
    setMessage(message: string): string;
}
