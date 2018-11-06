'use strict';

import { Request, Session } from "express";
import {AuthenticationService} from "../Services/AuthenticationService";


export class AuthenticationController {

    public static async login(req:{body: Request.body, session: Session}){

        AuthenticationService.checkParams(req.body);
        await AuthenticationService.authenticateUser(req.body);

        req.session = AuthenticationService.createSession(req.session, req.body);

    }

}
