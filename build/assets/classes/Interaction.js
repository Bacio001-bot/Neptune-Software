"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Interaction {
    constructor(client, options) {
        this.client = client;
        this.messages = this.client.messages;
        this.userdb = this.client.userdb;
        this.help = {
            name: options.name,
            userPermissions: options.requirements.userPermissions || ["SEND_MESSAGES"],
            clientPermissions: options.requirements.clientPermissions || ["SEND_MESSAGES"],
        };
    }
}
exports.default = Interaction;
