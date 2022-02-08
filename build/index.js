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
const node_fetch_1 = __importDefault(require("node-fetch"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // `who-to-greet` input defined in action metadata file
            const url = (0, core_1.getInput)('full-uri');
            console.log(`Hello ${url}!`);
            (0, core_1.setOutput)("notify", url);
            const data = JSON.stringify({
                'text': 'Hello from a Node script!',
            });
            yield (0, node_fetch_1.default)(url, {
                method: 'post',
                body: data,
                headers: { 'Content-Type': 'application/json' }
            });
            // Get the JSON webhook payload for the event that triggered the workflow
            const payload = JSON.stringify(github_1.context.payload, undefined, 2);
            console.log(`The event payload: ${payload}`);
        }
        catch (error) {
            (0, core_1.setFailed)(error.message);
        }
    });
}
main();
