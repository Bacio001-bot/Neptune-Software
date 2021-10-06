import CustomClient from "./Client";

class Event extends CustomClient {
    name: string;
    handlers: { filter: Function, run: Function }[];

    constructor(name: string) {
        super();

        this.name = name;
        this.handlers = [];
    }
    
    getCommand(command: string): any {
        return this.commands.get(command);
    }

    async addHandler(name: string, filter: Function): Promise<void> {
        this.handlers.push({
            filter: filter,
            run: (await import(`../handlers/${name}`)).default
        })
        return;
    }

    _run(...args: any): void {
        for (let handler of this.handlers) if (handler.filter(...args)) handler.run(this, ...args);
        // @ts-ignore
        this.execute(...args);
    }

}

export default Event;