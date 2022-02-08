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
const axios_1 = __importDefault(require("axios"));
const github_1 = __importDefault(require("@actions/github"));
function getFullUri() {
    const space_param = (0, core_1.getInput)('space');
    const key_param = (0, core_1.getInput)('key');
    const token_param = (0, core_1.getInput)('token');
    const URL_FULL = `https://chat.googleapis.com/v1/spaces/${space_param}/messages?key=${key_param}&token=${token_param}`;
    return URL_FULL;
}
const getNotationGroup = () => {
    const notifyAllGroup = (0, core_1.getInput)('notify-all-group');
    return notifyAllGroup === 'yes' ? '<users/all>' : '';
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
            console.log(`The event payload: ${JSON.stringify(github_1.default.context.payload, undefined, 2)}`);
            console.log(`The event action: ${JSON.stringify(github_1.default.context.action, undefined, 2)}`);
            console.log(`The event actor: ${JSON.stringify(github_1.default.context.actor, undefined, 2)}`);
            console.log(`The event apiUrl: ${JSON.stringify(github_1.default.context.apiUrl, undefined, 2)}`);
            console.log(`The event eventName: ${JSON.stringify(github_1.default.context.eventName, undefined, 2)}`);
            console.log(`The event graphqlUrl: ${JSON.stringify(github_1.default.context.graphqlUrl, undefined, 2)}`);
            console.log(`The event issue: ${JSON.stringify(github_1.default.context.issue, undefined, 2)}`);
            console.log(`The event job: ${JSON.stringify(github_1.default.context.job, undefined, 2)}`);
            console.log(`The event payload: ${JSON.stringify(github_1.default.context.payload, undefined, 2)}`);
            console.log(`The event ref: ${JSON.stringify(github_1.default.context.ref, undefined, 2)}`);
            console.log(`The event repo: ${JSON.stringify(github_1.default.context.repo, undefined, 2)}`);
            console.log(`The event runId: ${JSON.stringify(github_1.default.context.runId, undefined, 2)}`);
            console.log(`The event runNumber: ${JSON.stringify(github_1.default.context.runNumber, undefined, 2)}`);
            console.log(`The event serverUrl: ${JSON.stringify(github_1.default.context.serverUrl, undefined, 2)}`);
            console.log(`The event sha: ${JSON.stringify(github_1.default.context.sha, undefined, 2)}`);
            console.log(`The event workflow: ${JSON.stringify(github_1.default.context.workflow, undefined, 2)}`);
        }
        catch (error) {
            (0, core_1.setFailed)(error.message);
        }
    });
}
main();
