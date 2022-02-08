import { setFailed, getInput, setOutput } from '@actions/core';
import {context} from '@actions/github';
import fetch from 'node-fetch';
import { mainModule } from 'process';

async function main (){
	try {
		// `who-to-greet` input defined in action metadata file
		const url = getInput('full-uri');
		console.log(`Hello ${url}!`);
		setOutput("notify", url);

		const data = JSON.stringify({
			'text': 'Hello from a Node script!',
		});
	
		await fetch(url, {
		method: 'post',
		body: data,
		headers: {'Content-Type': 'application/json'}
	});
	
		// Get the JSON webhook payload for the event that triggered the workflow
		const payload = JSON.stringify(context.payload, undefined, 2)
		console.log(`The event payload: ${payload}`);
	} catch (error: any) {
		setFailed(error.message);
	}
}

main()