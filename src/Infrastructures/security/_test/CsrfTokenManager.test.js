require("../../../../config")
const jwt = require("jsonwebtoken")
const CsrfTokenManager = require("../CsrfTokenManager")
const ClientError = require("../../../Commons/exceptions/ClientError")
describe("a csrf token manager",()=>{
    it("should be error",async ()=>{

        const csrfTokenManager = new CsrfTokenManager(jwt)
        const errorMessage ="expected throw an error but not"
        try{
       
        await csrfTokenManager.verify("salah.salah.salah")
        throw new Error(errorMessage)
        }catch(e){
            expect(e.message).not.toBe(errorMessage)
            expect(e instanceof ClientError).toBe(true)
        }
    })

    it("should not error",async ()=>{
        const csrfTokenManager = new CsrfTokenManager(jwt)
        const token = await csrfTokenManager.token()
        await csrfTokenManager.verify(token)
       
    })

    it("should be error if token 10x veified",async ()=>{
        const csrfTokenManager = new CsrfTokenManager(jwt)
        const token = await csrfTokenManager.token()
        const error = 'expected error but not'
        try{
            for(let i=0; i<=10; i++){
                await csrfTokenManager.verify(token)
            }
            throw new Error(error)
        }catch(e){
            expect(e.message).not.toBe(error)
            expect(e instanceof ClientError).toBe(true)
        }
        
    })
})