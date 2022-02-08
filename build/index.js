"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
function getFullUri() {
    const space_param = (0, core_1.getInput)('space');
    const key_param = (0, core_1.getInput)('key');
    const token_param = (0, core_1.getInput)('token');
    const URL_FULL = `https://chat.googleapis.com/v1/spaces/${space_param}/messages?key=${key_param}&token=${token_param}`;
    return URL_FULL;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = getFullUri();
            (0, core_1.setOutput)("notify", url);
            const payload = JSON.stringify(github_1.context.payload, undefined, 2);
            console.log(`The event payload: ${payload}`);
        }
        catch (error) {
            (0, core_1.setFailed)(error.message);
        }
    });
}
main();
