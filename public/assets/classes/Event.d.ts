import { CustomClient } from "./Client";
export declare class Event extends CustomClient {
    name: string;
    handlers: {
        filter: Function;
        run: Function;
    }[];
    constructor(name: string);
    addHandler(name: string, filter: Function): Promise<void>;
    execute(...args: any): void;
}
