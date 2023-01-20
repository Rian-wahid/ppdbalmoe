"use strict";
require("../config")
const {request} =require("supertest")
const CsrfTokenManager = require("../src/Infrastructures/security/CsrfTokenManager")
const container = require("../src/Infrastructures/container")
const {createServer} = require("../src/Infrastructures/http/createServer")

describe("a students api",()=>{
    const {httpServer} = createServer(container)
    const csrfTokenManager=container.getInstance(CsrfTokenManager.name)
    it("should be error (without csrf_token)",async ()=>{
        request(httpServer).post()
    })
})