import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./BaseRoute";
import {AuthenticationController} from "../Controllers/AuthenticationController";



export class AuthenticationRoute extends BaseRoute {

    constructor() {
        super();
    }

    public static create(router: Router) {
        router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
            await AuthenticationController.login(req);

            return res.send({success: true});

        });


        router.get("/forgot-password", (req: Request, res: Response, next: NextFunction) => {

        });


        router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
            if (req.session.user && req.cookies['bublegum-session-cookieId']) {
                res.clearCookie('bublegum-session-cookieId');
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        });


    }





}
