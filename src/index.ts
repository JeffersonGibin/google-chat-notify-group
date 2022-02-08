import { setFailed, getInput, setOutput} from '@actions/core';
import {context} from '@actions/github';

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = getInput('full-uri');
  console.log(`Hello ${nameToGreet}!`);
  setOutput("notify", nameToGreet);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error: any) {
  setFailed(error.message);
}