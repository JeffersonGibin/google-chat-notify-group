import { setFailed, getInput, setOutput } from '@actions/core';
import {context} from '@actions/github';
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
	
		const payload = JSON.stringify(context.payload, undefined, 2)
		console.log(`The event payload: ${payload}`);
	} catch (error: any) {
		setFailed(error.message);
	}
}

main()