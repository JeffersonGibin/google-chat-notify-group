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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const axios_1 = __importDefault(require("axios"));
function getFullUri() {
    const space_param = (0, core_1.getInput)('space');
    const key_param = (0, core_1.getInput)('key');
    const token_param = (0, core_1.getInput)('token');
    const URL_FULL = `https://chat.googleapis.com/v1/spaces/${space_param}/messages?key=${key_param}&token=${token_param}`;
    return URL_FULL;
}
const getNotationGroup = () => {
    const notifyAllGroup = (0, core_1.getInput)('notify-all-group');
    return notifyAllGroup === 'yes' ? '@all' : '';
};
function doRequest() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = getFullUri();
        const textNotation = getNotationGroup();
        yield (0, axios_1.default)({
            method: 'post',
            url,
            data: {
                'text': `${textNotation} Message sent of pipeline`,
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield doRequest().then(() => {
                (0, core_1.setOutput)("notify", 'Message Sent');
            }).catch((err) => {
                (0, core_1.setOutput)("err", JSON.stringify(err));
            });
            const payload = JSON.stringify(github_1.context.payload, undefined, 2);
            console.log(`The event payload: ${payload}`);
        }
        catch (error) {
            (0, core_1.setFailed)(error.message);
        }
    });
}
main();
