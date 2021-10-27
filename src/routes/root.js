// @ts-nocheck
"use strict";

const { root } = require("../controllers/root");

module.exports = async function (fastify, opts) {
  fastify.get("/", root);
};
