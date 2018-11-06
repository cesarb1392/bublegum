import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./BaseRoute";
import * as path from "path";

export class IndexRoute extends BaseRoute {

    constructor() {
        super();
    }

    public static create(router: Router) {
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            return new IndexRoute().index(req, res, next);
        });
    }

    public index(req: Request, res: Response, next: NextFunction) {
        return res.sendFile(path.join("frontend", 'index.html') );
    }


}
