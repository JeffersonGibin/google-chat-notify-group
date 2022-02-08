"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const github_1 = __importDefault(require("@actions/github"));
try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core_1.default.getInput('full-uri');
    console.log(`Hello ${nameToGreet}!`);
    core_1.default.setOutput("notify", nameToGreet);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github_1.default.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
}
catch (error) {
    core_1.default.setFailed(error.message);
}
