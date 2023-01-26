const HTTPResponse = require("../translator/HTTPResponse")
const ClientError= require("../../Commons/exceptions/ClientError")
const AdminLogin = require("../../Domains/admins/entities/AdminLogin")
const AdminUpdate = require("../../Domains/admins/entities/AdminUpdate")
const NewAdmin = require("../../Domains/admins/entities/NewAdmin")
class AdminUseCase {
    constructor({jwtTokenManager,csrfTokenManager,adminRepository,tokenRepository,bot}){
        this._jwtTokenManager = jwtTokenManager
        this._csrfTokenManager = csrfTokenManager
        this._adminRepository = adminRepository
        this._tokenRepository=tokenRepository
        this._bot =bot
    }

    async auth(credential,csrfToken){
        await this._csrfTokenManager.verify(csrfToken)
        credential = new AdminLogin(credential)
        const tokenPayload = await this._adminRepository.auth(credential)
        if(!tokenPayload){
            throw ClientError.notFound("username atau password salah")
        }
        const accessToken = await this._jwtTokenManager.createAccessToken(tokenPayload)
        const refreshToken = await this._jwtTokenManager.createRefreshToken(tokenPayload)
        await this._tokenRepository.addToken(refreshToken)
        const http = new HTTPResponse()
        http.body({status:"success",data:{accessToken,refreshToken}})
        return http.response()

    }
    async getAccessToken(refreshToken){

        const payload = await this._jwtTokenManager.verifyRefreshToken(refreshToken)
        if(!(await this._tokenRepository.exists(refreshToken))){
            throw ClientError.notFound()
        }
        const accessToken = await this._jwtTokenManager.createAccessToken(payload)

        const http = new HTTPResponse()
        http.body({status:"success",data:{accessToken}})
        return http.response()


    }

    async logout(refreshToken){
        if(!(await this._tokenRepository.exists(refreshToken))){
            throw ClientError.notFound()
        }
        await this._tokenRepository.removeToken(refreshToken)
        const http =new HTTPResponse()
        http.body({status:"success",message:"berhasil logout"})
        return http.response()

    }

    async addAdmin(accessToken,newAdmin,csrfToken){
        await this._csrfTokenManager.verify(csrfToken)
        try{
            await this._jwtTokenManager.verifyAccessToken(accessToken)
        }catch(e){
            throw ClientError.unauthorized()
        }
        
        newAdmin = new NewAdmin(newAdmin)
        await this._adminRepository.addNewAdmin(newAdmin)
        csrfToken = await this._csrfTokenManager.token()
        const http = new HTTPResponse()
        http.body({status:"success",data:{csrfToken},message:"berhasil menambahkan admin"}).statusCode(201)
        return http.response()
    }
    async update({accessToken,admin,csrfToken}){
        await this._csrfTokenManager.verify(csrfToken)
        try{
            await this._jwtTokenManager.verifyAccessToken(accessToken)
        }catch(e){
            throw ClientError.unauthorized()
        }
        admin= new AdminUpdate(admin)
        await this._adminRepository.update(admin)
        csrfToken = await this._csrfTokenManager.token()
        const http = new HTTPResponse()
        http.body({status:"success",data:{csrfToken},message:"berhasil mengubah"})
        return http.response()
    }

    async getBotQrAndStatus(accessToken){
        try{
            await this._jwtTokenManager.verifyAccessToken(accessToken)
        }catch(e){
            throw ClientError.unauthorized()
        }

        const qr = await this._bot.getQR()
        const active = this._bot.isReady()
        const http = new HTTPResponse()
        http.body({status:"success",data:{qr,active}})
        return http.response()
    }
}

module.exports=AdminUseCase