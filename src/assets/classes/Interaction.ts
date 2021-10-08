import CustomClient from "./Client";

class Interaction {
    client: CustomClient;
    name: string;
    handlers: { filter: Function, run: Function }[];

    constructor(client: CustomClient, name: string) {
        this.client = client; 
        this.name = name;
        this.handlers = [];
    }
    

    async addHandler(name: string, filter: Function): Promise<void> {
        this.handlers.push({
            filter: filter,
            run: (await import(`../handlers/${name}`)).default
        })

        this.client.getCommand("help").aliases
        return;
    }

    _run(...args: any): void {
        for (let handler of this.handlers) if (handler.filter(...args)) handler.run(this.client, ...args);
        // @ts-ignore
        this.execute(...args);
    }
}

export default Interaction;
