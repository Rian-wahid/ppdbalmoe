"use strict";
const dotenv = require("dotenv")
const path = require("path")
dotenv.config()
process.env.VIEW_PATH=path.join(__dirname,process.env.VIEW_PATH)
process.env.PUBLIC_PATH=path.join(__dirname,process.env.PUBLIC_PATH)
const container = require("./src/Infrastructures/container")
const {createServer} = require("./src/Infrastructures/http/createServer")
createServer(container).start()
