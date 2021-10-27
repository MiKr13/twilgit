// @ts-nocheck
"use strict";

const { githubHook } = require("../controllers/github");

module.exports = async function (fastify, opts) {
  fastify.post("/", githubHook);
};

module.exports.autoPrefix = "/github";
