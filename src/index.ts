import core from "@actions/core";
import fetch from 'node-fetch';

main();

async function main() {
	try {
		const fullUri = core.getInput("full-uri");
		const body = JSON.stringify({
			text: "Hello Group!",
		});

		await fetch(fullUri, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
			body,
		});

	} catch (error) {
		//core.setFailed(error.message);
	}
}
