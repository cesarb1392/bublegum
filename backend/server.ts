'use strict';

import * as express from "express";
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as path from 'path' ;

const express = require('express'),
    expressSanitizer = require("express-sanitizer"),
    expressSession = require('express-session'),
    helmet = require('helmet'),
    morgan = require('morgan'),
    Database = require('./Models/Database'),
    fileStore = require('session-file-store')(expressSession); //could be removed


import {isAuthenticated} from "./Middelware/Authentication";
import {IndexRoute} from "./Routes/IndexRoute";
import {AuthenticationRoute} from "./Routes/AuthenticationRoute";
import {AdminRoute} from "./Routes/AdminRoute";

const ServerConfig = require('./Config/ServerConfig');



export class Server {

    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor () {
        this.app = express();

        this.timeLog();
        this.initConfig();
        this.initRoutes();
        this.initConnexions();
    }

    private timeLog(): void {
        this.app.use(function timeLog (req, res, next) {
            // console.log('Time: ', Date.now());
            next()
        });
    }

    private initRoutes(): void {

        const routerAuth = express.Router();
        const routerNoAuth = express.Router();

        routerAuth.all('*', isAuthenticated);

        IndexRoute.create(routerNoAuth);
        AuthenticationRoute.create(routerNoAuth);

        AdminRoute.create(routerAuth);

        this.app.use(routerNoAuth);
        this.app.use(routerAuth);
    }

    private initConfig(): void {
        this.app.use(express.static(path.join("frontend")));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(expressSanitizer());// after bodyParser(always)
        this.app.use(cookieParser());
        this.app.use(helmet());
        this.app.use(morgan('dev'));

        this.app.use((req, res, next) => {
            res.header('Content-Type', 'application/json');
            next();
        });

        this.app.use(expressSession(ServerConfig.session));
    }

    private initConnexions(): void {

        this.initPools();

    }

    private initPools(){
        Database.User.sync({});



    }

/*
*  private initConnexions(): void {
        // Database.User.sync({ force: true }).then(() =>{
        Database.User.sync({}).then(() =>{
            Database.User.create({
                name: 'weeba',
                password: 'asdas',
                created_at: Date.now()
            })
            .then(Users => {
                console.log(Users);
                Database.User.findAll()
                    .then(Users => {
                        if(Users && Users.length && Users[0].dataValues){
                            console.log(Users[0].dataValues);
                        }else{
                            console.log('NOT DATA')
                        }
                    });
            });
        });

        this.initPools();

    }
*/

}





