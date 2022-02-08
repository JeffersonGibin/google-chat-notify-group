import { setFailed, getInput, setOutput } from '@actions/core';
import {context} from '@actions/github';

function getFullUri(){
	const space_param = getInput('space');
	const key_param = getInput('key');
	const token_param = getInput('token');

	const URL_FULL = `https://chat.googleapis.com/v1/spaces/${space_param}/messages?key=${key_param}&token=${token_param}`;

	return URL_FULL;
}

async function main (){
	try {

		const url = getFullUri();


		setOutput("notify", url);

	
		const payload = JSON.stringify(context.payload, undefined, 2)
		console.log(`The event payload: ${payload}`);
	} catch (error: any) {
		setFailed(error.message);
	}
}

main()