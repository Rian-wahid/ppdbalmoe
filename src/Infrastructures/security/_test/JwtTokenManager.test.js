require("../../../../config")
const jwt = require("jsonwebtoken")
const JwtTokenManager = require("../JwtTokenManager")

describe("a jwt token manager",()=>{
    it("should be error",async ()=>{
        const jwtTokenManager = new JwtTokenManager(jwt)
        const accessToken = await jwtTokenManager.createAccessToken({data:"test"})
        const refreshToken = await jwtTokenManager.createRefreshToken({data:"test"})
        const errorMessage = "expected error but not"
        try{
            await jwtTokenManager.verifyAccessToken(refreshToken)
            throw new Error(errorMessage)
        }catch(e){
            expect(e).not.toEqual(new Error(errorMessage))
        }
        try{
            await jwtTokenManager.verifyRefreshToken(accessToken)
            throw new Error(errorMessage)
        }catch(e){
            expect(e).not.toEqual(new Error(errorMessage))
        }

    })

    it("should not error",async ()=>{
        const jwtTokenManager = new JwtTokenManager(jwt)
        const accessToken = await jwtTokenManager.createAccessToken({data:"access"})
        const refreshToken = await jwtTokenManager.createRefreshToken({data:"refresh"})
        const accessPayload = await jwtTokenManager.verifyAccessToken(accessToken)
        const refreshPayload = await jwtTokenManager.verifyRefreshToken(refreshToken)
        expect(accessPayload.data).toBe("access")
        expect(refreshPayload.data).toBe("refresh")
    })
})