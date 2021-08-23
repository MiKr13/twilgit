exports.root = async (request, reply) => {
	return {
		message: `Welcome to Twilgit`,
		step1: `Create a .env file and add your Twilio & GitHub Credentials there`,
		step2: `Make sure you have APP_TWILIO_ACCOUNT_SID (Twilio SID), APP_TWILIO_ACCOUNT_AUTH_TOKEN (Twilio Auth Token), APP_TWILIO_PHONE_NUMBER (Twilio Phone Number), APP_TWILIO_PERSONAL_NUMBER (Personal Mobile Number), APP_GITHUB_PERSONAL_TOKEN (Github Personal Token)`,
		step3: `Run the server again`,
		step4: `Host it on a IP/URL or ngrok`,
		step5: `Have fun!`,
	};
};
