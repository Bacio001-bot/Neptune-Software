import IInteraction from "../interfaces/IInteraction";
import CustomClient from "./Client";
import Messages from "../helpers/Messages";
import UserDatabase from "../databases/Users";
declare class Interaction {
    constructor(client: CustomClient, options: IInteraction);
}
interface Interaction {
    client: CustomClient;
    help: object;
    messages: Messages;
    userdb: UserDatabase;
}
export default Interaction;
