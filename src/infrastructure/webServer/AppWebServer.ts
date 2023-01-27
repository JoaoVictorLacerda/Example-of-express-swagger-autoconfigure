import  { Express,  } from "express";
import cors from "cors";

import AccountController from "../../interface/controller/AccountController";
import HealthCheckController from "../../interface/controller/HealthCheckController";
import {
    BasePath,
    BearerTokenJWT,
    Description,
    Expressinitializer,
    SwaggerInitializer,
    Title,
    Version
} from "express-swagger-autoconfigure";


@SwaggerInitializer
@BasePath("/documentation")
@Description("Essa api é responsável pela estrutura backend do projeto RunBuddy")
@Title("RunBuddy")
@Version("1.0.0")
@BearerTokenJWT(true)
export default class App {

    @Expressinitializer
    private app: Express;

    constructor () {
        this.configApp();
        this.initControllers();
    }

    private configApp():void {
        this.app.use( cors() );
    }

    private initControllers(){
        new AccountController();
        new HealthCheckController();
    }
    public getApp(): Express {
        return this.app;
    }
}