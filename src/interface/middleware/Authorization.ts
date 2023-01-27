import { NextFunction, Request, Response } from "express";

export default class Authorization {

    public static middleware(request: Request, response:Response, next: NextFunction){
        next()
    }

}