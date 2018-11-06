import { NextFunction, Request, Response } from "express";

/**
 * Constructor
 *
 * @class BaseRoute
 */
export class BaseRoute {

    protected title: string;

    private readonly scripts: string[];

    constructor() {
        this.title = "BANANA";
        this.scripts = [];
    }

    public addScript(src: string): BaseRoute {
        this.scripts.push(src);
        return this;
    }


    public render(req: Request, res: Response, view: string, options?: Object) {
        //add constants
        res.locals.BASE_URL = "/";

        //add scripts
        res.locals.scripts = this.scripts;

        //add title
        res.locals.title = this.title;

        //render view
        res.render(view, options);
    }
}
