"use strict";
require("./config")
const container = require("./src/Infrastructures/container")
const {createServer} = require("./src/Infrastructures/http/createServer")
createServer(container).start()
