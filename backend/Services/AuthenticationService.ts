'use strict';


import {Session} from "express";

const bcrypt = require('bcrypt');

import {IUser} from "../Models/User";

const Database = require('../Models/Database');


export class AuthenticationService {

    public static checkParams (body: {name: string, password: string}): void {
        if(!body || !body.name || !body.password){
            throw new Error ('login params empty');
        }
    }

    public static async authenticateUser(body: {name: string, password: string}): Promise<void>{
        const user:IUser = await AuthenticationService.getUserByEmail(body.name);
        if(!user){
            throw new Error ('user not found');
        }
        return await this.validatePassword(user, body.password);
    }

    public static createSession (session: Session, body: {name: string, password: string}){
        body['authenticated'] = true;
        session.user = body;
        return session;
    }




    private static async getUserByEmail (name: string): Promise<IUser> {
        return await Database.User.findOne({
            where: {
                name: name
            }
        });
    }

    private static async validatePassword (user:IUser, password: string): Promise<void> {
        const isPassword = await new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, hash) => {
                if(err)
                    reject(err);
                else
                    resolve(hash);
            })
        });
        if(!isPassword){
            throw new Error ('password not equal')
        }
    }





}
