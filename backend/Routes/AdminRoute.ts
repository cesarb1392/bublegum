'use strict';

import * as path from "path";
import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./BaseRoute";
import {isAuthenticated} from "../Middelware/Authentication";


export class AdminRoute extends BaseRoute {

    constructor() {
        super();
    }

    public static create(router: Router) {
        router.get("/admin", isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {

            console.log(req);
            return res.sendFile(path.resolve('frontend','admin.ejs'));

        });




    }





}
