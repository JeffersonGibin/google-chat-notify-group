import { setFailed, getInput, setOutput, getBooleanInput } from '@actions/core';
import { context } from '@actions/github';
import axios from 'axios';

function getFullUri(): string{
	const key_param: string = getInput('key');
	const space_param: string = getInput('space');
	const token_param: string = getInput('token');

	const googleChatPath: string = `https://chat.googleapis.com/v1/spaces/${space_param}/messages?key=${key_param}&token=${token_param}`;

	return googleChatPath;
}

const getNotationGroup = (): string => {
	const notifyAllGroup = getBooleanInput('notify-all-group');
	return notifyAllGroup ? '<users/all>' : '';
}

const createGoogleChatCard = () => {
	// create header card
	// create section card
	// create image url card
}

const templateDefault = () => {

	return {
		text: "<users/all> 🔥 *Build Fail* 🔥,",
		cards: [
			{
				header: {
					title: context.repo?.repo ?? "Repostório",
					subtitle: context.payload?.head_commit?.timestamp ?? 'subtitulo',
					imageUrl: context.payload?.repository?.owner?.avatar_url ?? "https://user-images.githubusercontent.com/32027253/50383712-64890900-06f4-11e9-975c-66dbe4c26fb4.PNG"
				},
				sections: [
					{
						widgets: [
							{
								keyValue: {
									icon: "PERSON",
									topLabel: "Autor",
									content: context.actor ?? 'Autor teste'
								}
							},
							{
								keyValue: {
									icon: "BOOKMARK",
									topLabel: "Mensagem do commit",
									content: context.payload?.head_commit?.message ?? "Mensagem de test"
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
	}
};

async function doRequest() {
	const url: string = getFullUri();

	await axios({
		method: 'post',
		url,
		data: templateDefault()
	});
}

async function main (){
	try {

		await doRequest();

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