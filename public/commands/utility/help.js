"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Help = void 0;
var Command_1 = require("../../assets/classes/Command");
var Help = /** @class */ (function (_super) {
    __extends(Help, _super);
    function Help() {
        return _super.call(this, {
            name: "help",
            description: "Receieve a list of commands and info!",
            arguments: "none",
            example: "help",
            category: "utility",
            deleteMessage: true,
            cooldown: true,
            requirements: {
                guildOnly: true,
                minimumArguments: 0,
                permissions: ["SEND_MESSAGES"]
            }
        }) || this;
    }
    Help.prototype.execute = function () {
    };
    return Help;
}(Command_1.Command));
exports.Help = Help;
