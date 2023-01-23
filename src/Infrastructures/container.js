const {createContainer} = require("instances-container")
const HTMLToPDF = require("./renderer/HTMLToPDF")
const StudentUseCase = require("../Applications/use_case/StudentUseCase")
const StudentRepositoryMysql = require("./repository/StudentRepositoryMysql")
const CsrfTokenManager = require("./security/CsrfTokenManager")
const jwt = require("jsonwebtoken")
const pool = require("./database/mysql/pool")
const ViewEngine = require("./renderer/ViewEngine")
const htmlPdfNode = require("html-pdf-node")
const ejs = require("ejs")
const {nanoid} = require("nanoid")
const JwtTokenManager = require("./security/JwtTokenManager")
const bot = require("./external/robot/wrapper")

const container = createContainer()

container.register([
    {
        Class:HTMLToPDF,
        parameter:{
            dependencies:[
                {
                    concrete:htmlPdfNode
                }
            ]
        }
    },
    {
        Class:ViewEngine,
        parameter:{
            dependencies:[
                {
                    concrete:ejs
                },{
                    concrete:process.env.VIEW_PATH
                }
            ]
        }
    },
    {
        Class:StudentRepositoryMysql,
        parameter:{
            dependencies:[
                {
                    concrete:pool
                },{
                    concrete:nanoid
                }
            ]
        }
    },{
        Class:CsrfTokenManager,
        parameter:{
            dependencies:[
                {
                    concrete:jwt
                }
            ]
        }
    },{
        Class:JwtTokenManager,
        parameter:{
            dependencies:[
                {
                    concrete:jwt
                }
            ]
        }
    },
    {
        Class:StudentUseCase,
        parameter:{
            injectType:"destructuring",
            dependencies:[
                {
                    name:"viewEngine",
                    internal:ViewEngine.name
                    
                },
                {
                    name:"htmlToPdf",
                    internal:HTMLToPDF.name
                },{
                    name:"studentRepository",
                    internal:StudentRepositoryMysql.name
                },{
                    name:"csrfTokenManager",
                    internal:CsrfTokenManager.name
                },{
                    name:"bot",
                    concrete:bot
                },{
                    name:"jwtTokenManager",
                    internal:JwtTokenManager.name
                }
            ]
        }
    }

])

module.exports=container