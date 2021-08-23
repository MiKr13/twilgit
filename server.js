// @ts-nocheck
"use strict";

// Read the .env file.
require("dotenv").config();

// Require the framework
const Fastify = require("fastify");

// Require library to exit fastify process, gracefully (if possible)
const closeWithGrace = require("close-with-grace");

// Require fs library to read certificate and key files for https
const { readFileSync } = require("fs");

// Require path to deal with file paths
const { join } = require("path");

// Instantiate Fastify with some config
const app = Fastify({
	http2: true,
	https: {
		allowHTTP1: true, // fallback support for HTTP1
		key: readFileSync(join(__dirname, "https", "server.key")),
		cert: readFileSync(join(__dirname, "https", "server.cert")),
	},
	logger: {
		redact: ["req.headers.authorization", "req.body.password"],
		level: "info",
		prettyPrint: true,
		serializers: {
			req(req) {
				return {
					method: req.method,
					url: req.url,
					headers: req.headers,
					hostname: req.hostname,
					remoteAddress: req.ip,
					remotePort: req.connection.remotePort,
				};
			},
		},
	},
});

// Register your application as a normal plugin.
const appService = require("./src/app");
app.register(appService);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
	{ delay: 500 },
	async ({ signal, err, manual }) => {
		if (err) {
			app.log.error(err);
		}
		await app.close();
	}
);

app.addHook("onClose", async (instance, done) => {
	closeListeners.uninstall();
	done();
});

// Start listening.
app.listen(process.env.PORT || 3000, (err) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
});
