import { setFailed, getInput, setOutput } from '@actions/core';
import { context } from '@actions/github';
import axios from 'axios';

function getFullUri(){
	const space_param = getInput('space');
	const key_param = getInput('key');
	const token_param = getInput('token');

	const URL_FULL = `https://chat.googleapis.com/v1/spaces/${space_param}/messages?key=${key_param}&token=${token_param}`;

	return URL_FULL;
}

const getNotationGroup = () => {
	const notifyAllGroup = getInput('notify-all-group');
	return notifyAllGroup === 'yes' ? '<users/all>' : '';
}

async function doRequest(){
	const url = getFullUri();

	const textNotation = getNotationGroup();

	await axios({
		method: 'post',
		url,
		data: {
			'text': `${textNotation} Message sent of pipeline`,
		}
	});
}

async function main (){
	try {

		await doRequest().then(() => {
			setOutput("notify", 'Message Sent');
		}).catch((err) => {
			setOutput("err", JSON.stringify(err));
		});

  	console.log(`The event payload: ${JSON.stringify(context.payload, undefined, 2)}`);
  	console.log(`The event action: ${JSON.stringify(context.action, undefined, 2)}`);
  	console.log(`The event actor: ${JSON.stringify(context.actor, undefined, 2)}`);
  	console.log(`The event apiUrl: ${JSON.stringify(context.apiUrl, undefined, 2)}`);
  	console.log(`The event eventName: ${JSON.stringify(context.eventName, undefined, 2)}`);
  	console.log(`The event graphqlUrl: ${JSON.stringify(context.graphqlUrl, undefined, 2)}`);
  	console.log(`The event issue: ${JSON.stringify(context.issue, undefined, 2)}`);
  	console.log(`The event job: ${JSON.stringify(context.job, undefined, 2)}`);
  	console.log(`The event payload: ${JSON.stringify(context.payload, undefined, 2)}`);
  	console.log(`The event ref: ${JSON.stringify(context.ref, undefined, 2)}`);
  	console.log(`The event repo: ${JSON.stringify(context.repo, undefined, 2)}`);
  	console.log(`The event runId: ${JSON.stringify(context.runId, undefined, 2)}`);
  	console.log(`The event runNumber: ${JSON.stringify(context.runNumber, undefined, 2)}`);
  	console.log(`The event serverUrl: ${JSON.stringify(context.serverUrl, undefined, 2)}`);
  	console.log(`The event sha: ${JSON.stringify(context.sha, undefined, 2)}`);
  	console.log(`The event workflow: ${JSON.stringify(context.workflow, undefined, 2)}`);
  	console.log(`The event workflow: ${JSON.stringify(context.workflow, undefined, 2)}`);
	
	} catch (error: any) {
		setFailed(error.message);
	}
}

main()