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
    const key_param = (0, core_1.getInput)('key');
    const space_param = (0, core_1.getInput)('space');
    const token_param = (0, core_1.getInput)('token');
    const googleChatPath = `https://chat.googleapis.com/v1/spaces/${space_param}/messages?key=${key_param}&token=${token_param}`;
    return googleChatPath;
}
const getNotationGroup = () => {
    const notifyAllGroup = (0, core_1.getBooleanInput)('notify-all-group');
    return notifyAllGroup ? '<users/all>' : '';
};
const createGoogleChatCard = () => {
    // create header card
    // create section card
    // create image url card
};
const templateDefault = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    return {
        text: "<users/all> 🔥 *Build Fail* 🔥,",
        cards: [
            {
                header: {
                    title: (_b = (_a = github_1.context.repo) === null || _a === void 0 ? void 0 : _a.repo) !== null && _b !== void 0 ? _b : "Repostório",
                    subtitle: (_e = (_d = (_c = github_1.context.payload) === null || _c === void 0 ? void 0 : _c.head_commit) === null || _d === void 0 ? void 0 : _d.timestamp) !== null && _e !== void 0 ? _e : 'subtitulo',
                    imageUrl: (_j = (_h = (_g = (_f = github_1.context.payload) === null || _f === void 0 ? void 0 : _f.repository) === null || _g === void 0 ? void 0 : _g.owner) === null || _h === void 0 ? void 0 : _h.avatar_url) !== null && _j !== void 0 ? _j : "https://user-images.githubusercontent.com/32027253/50383712-64890900-06f4-11e9-975c-66dbe4c26fb4.PNG"
                },
                sections: [
                    {
                        widgets: [
                            {
                                keyValue: {
                                    icon: "PERSON",
                                    topLabel: "Autor",
                                    content: (_k = github_1.context.actor) !== null && _k !== void 0 ? _k : 'Autor teste'
                                }
                            },
                            {
                                keyValue: {
                                    icon: "BOOKMARK",
                                    topLabel: "Mensagem do commit",
                                    content: (_o = (_m = (_l = github_1.context.payload) === null || _l === void 0 ? void 0 : _l.head_commit) === null || _m === void 0 ? void 0 : _m.message) !== null && _o !== void 0 ? _o : "Mensagem de test"
                                }
                            },
                            {
                                keyValue: {
                                    icon: "TICKET",
                                    topLabel: "O evento que causou a execução do build.",
                                    content: "Sucesso"
                                }
                            }
                        ]
                    },
                    {
                        widgets: [
                            {
                                image: {
                                    imageUrl: "https://cdn.pixabay.com/photo/2012/04/14/15/55/beetle-34372_960_720.png"
                                },
                                buttons: [
                                    {
                                        textButton: {
                                            text: "Analisar Build Quebrada",
                                            onClick: {
                                                openLink: {
                                                    "url": "https://www.google.com"
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
};
function doRequest() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = getFullUri();
        yield (0, axios_1.default)({
            method: 'post',
            url,
            data: templateDefault()
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield doRequest();
            console.log(`The event payload: ${JSON.stringify(github_1.context.payload, undefined, 2)}`);
            console.log(`The event action: ${JSON.stringify(github_1.context.action, undefined, 2)}`);
            console.log(`The event actor: ${JSON.stringify(github_1.context.actor, undefined, 2)}`);
            console.log(`The event apiUrl: ${JSON.stringify(github_1.context.apiUrl, undefined, 2)}`);
            console.log(`The event eventName: ${JSON.stringify(github_1.context.eventName, undefined, 2)}`);
            console.log(`The event graphqlUrl: ${JSON.stringify(github_1.context.graphqlUrl, undefined, 2)}`);
            console.log(`The event issue: ${JSON.stringify(github_1.context.issue, undefined, 2)}`);
            console.log(`The event job: ${JSON.stringify(github_1.context.job, undefined, 2)}`);
            console.log(`The event payload: ${JSON.stringify(github_1.context.payload, undefined, 2)}`);
            console.log(`The event ref: ${JSON.stringify(github_1.context.ref, undefined, 2)}`);
            console.log(`The event repo: ${JSON.stringify(github_1.context.repo, undefined, 2)}`);
            console.log(`The event runId: ${JSON.stringify(github_1.context.runId, undefined, 2)}`);
            console.log(`The event runNumber: ${JSON.stringify(github_1.context.runNumber, undefined, 2)}`);
            console.log(`The event serverUrl: ${JSON.stringify(github_1.context.serverUrl, undefined, 2)}`);
            console.log(`The event sha: ${JSON.stringify(github_1.context.sha, undefined, 2)}`);
            console.log(`The event workflow: ${JSON.stringify(github_1.context.workflow, undefined, 2)}`);
            console.log(`The event workflow: ${JSON.stringify(github_1.context.workflow, undefined, 2)}`);
        }
        catch (error) {
            (0, core_1.setFailed)(error.message);
        }
    });
}
main();
