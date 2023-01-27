import  { Express,  } from "express";
import cors from "cors";

import AccountController from "../../interface/controller/AccountController";
import HealthCheckController from "../../interface/controller/HealthCheckController";
import {
    BasePath,
    BearerTokenJWT,
    Description,
    ExpressInitializer,
    SwaggerInitializer,
    Title,
    Version
} from "express-swagger-autoconfigure";


@SwaggerInitializer
@BasePath("/documentation")
@Description("Essa api é responsável pelo exemplo de utilização do express-swagger-autoconfigure")
@Title("Example-of-express-swagger-autoconfigure")
@Version("1.0.0")
@BearerTokenJWT(true)
export default class App {

    @ExpressInitializer
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