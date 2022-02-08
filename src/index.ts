import core from '@actions/core';
import github from '@actions/github';

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('full-uri');
  console.log(`Hello ${nameToGreet}!`);
  core.setOutput("notify", nameToGreet);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error: any) {
  core.setFailed(error.message);
}