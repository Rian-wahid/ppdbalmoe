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
                }
            ]
        }
    }

])

module.exports=container