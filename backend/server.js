'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const express = require('express'), expressSanitizer = require("express-sanitizer"), expressSession = require('express-session'), helmet = require('helmet'), morgan = require('morgan'), Database = require('./Models/Database'), fileStore = require('session-file-store')(expressSession); //could be removed
const Authentication_1 = require("./Middelware/Authentication");
const IndexRoute_1 = require("./Routes/IndexRoute");
const AuthenticationRoute_1 = require("./Routes/AuthenticationRoute");
const AdminRoute_1 = require("./Routes/AdminRoute");
const ServerConfig = require('./Config/ServerConfig');
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.timeLog();
        this.initConfig();
        this.initRoutes();
        this.initConnexions();
    }
    timeLog() {
        this.app.use(function timeLog(req, res, next) {
            // console.log('Time: ', Date.now());
            next();
        });
    }
    initRoutes() {
        const routerAuth = express.Router();
        const routerNoAuth = express.Router();
        routerAuth.all('*', Authentication_1.isAuthenticated);
        IndexRoute_1.IndexRoute.create(routerNoAuth);
        AuthenticationRoute_1.AuthenticationRoute.create(routerNoAuth);
        AdminRoute_1.AdminRoute.create(routerAuth);
        this.app.use(routerNoAuth);
        this.app.use(routerAuth);
    }
    initConfig() {
        this.app.use(express.static(path.join("frontend")));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(expressSanitizer()); // after bodyParser(always)
        this.app.use(cookieParser());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use((req, res, next) => {
            res.header('Content-Type', 'application/json');
            next();
        });
        this.app.use(expressSession(ServerConfig.session));
    }
    initConnexions() {
        this.initPools();
    }
    initPools() {
        Database.User.sync({});
    }
}
exports.Server = Server;
