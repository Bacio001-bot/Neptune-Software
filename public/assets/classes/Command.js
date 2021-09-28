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
exports.Command = void 0;
var Client_1 = require("./Client");
var Command = /** @class */ (function (_super) {
    __extends(Command, _super);
    function Command(options) {
        var _this = _super.call(this) || this;
        _this.message = "";
        _this.help = {
            name: options.name,
            description: options.description,
            arguments: options.arguments || "None",
            example: options.example || options.name,
            category: options.category || "xenon",
            guildOnly: options.requirements.guildOnly,
            permissions: options.requirements.permissions || ["SEND_MESSAGES"]
        };
        return _this;
    }
    Command.prototype.setMessage = function (message) {
        return this.message = message;
    };
    return Command;
}(Client_1.CustomClient));
exports.Command = Command;
