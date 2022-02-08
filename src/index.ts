import { setFailed, getInput, setOutput } from '@actions/core';
import {context} from '@actions/github';
import axios from 'axios';
import github from '@actions/github';

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

  	console.log(`The event payload: ${JSON.stringify(github.context.payload, undefined, 2)}`);
  	console.log(`The event action: ${JSON.stringify(github.context.action, undefined, 2)}`);
  	console.log(`The event actor: ${JSON.stringify(github.context.actor, undefined, 2)}`);
  	console.log(`The event apiUrl: ${JSON.stringify(github.context.apiUrl, undefined, 2)}`);
  	console.log(`The event eventName: ${JSON.stringify(github.context.eventName, undefined, 2)}`);
  	console.log(`The event graphqlUrl: ${JSON.stringify(github.context.graphqlUrl, undefined, 2)}`);
  	console.log(`The event issue: ${JSON.stringify(github.context.issue, undefined, 2)}`);
  	console.log(`The event job: ${JSON.stringify(github.context.job, undefined, 2)}`);
  	console.log(`The event payload: ${JSON.stringify(github.context.payload, undefined, 2)}`);
  	console.log(`The event ref: ${JSON.stringify(github.context.ref, undefined, 2)}`);
  	console.log(`The event repo: ${JSON.stringify(github.context.repo, undefined, 2)}`);
  	console.log(`The event runId: ${JSON.stringify(github.context.runId, undefined, 2)}`);
  	console.log(`The event runNumber: ${JSON.stringify(github.context.runNumber, undefined, 2)}`);
  	console.log(`The event serverUrl: ${JSON.stringify(github.context.serverUrl, undefined, 2)}`);
  	console.log(`The event sha: ${JSON.stringify(github.context.sha, undefined, 2)}`);
  	console.log(`The event workflow: ${JSON.stringify(github.context.workflow, undefined, 2)}`);

		
	
	} catch (error: any) {
		setFailed(error.message);
	}
}

main()