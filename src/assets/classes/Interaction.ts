import IInteraction from "../interfaces/IInteraction";
import CustomClient from "./Client";
import Messages from "../helpers/Messages";
import UserDatabase from "../databases/Users";

class Interaction {

    constructor(client: CustomClient, options: IInteraction) {
        
        this.client = client; 
        this.messages = this.client.messages;
        this.userdb = this.client.userdb;
        this.help = {
            name: options.name,
            userPermissions: options.requirements.userPermissions || ["SEND_MESSAGES"],
            clientPermissions: options.requirements.clientPermissions || ["SEND_MESSAGES"],
        }
    }
}

interface Interaction {
    client: CustomClient;
    help: object;
    messages: Messages;
    userdb: UserDatabase;

}

export default Interaction;
