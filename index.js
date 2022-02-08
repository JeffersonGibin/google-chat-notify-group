const core = require("@actions/core");
const github = require("@actions/github");

main();

async function main() {
	try {
		const fullUri = core.getInput("full-uri");
		const time = new Date().toTimeString();
		const output = `[${time}] A notify was sent to group!`;

		core.setOutput("notify", output);
		const payload = JSON.stringify(github.context.payload, undefined, 2);

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

		console.log(`The event payload: ${payload}`);
	} catch (error) {
		core.setFailed(error.message);
	}
}
