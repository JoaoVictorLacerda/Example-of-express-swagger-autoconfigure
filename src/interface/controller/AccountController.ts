import LoggerComponent from "../../infrastructure/components/LoggerComponent";
import { Request, Response } from "express";
import ParamtersValidationComponent from "../../infrastructure/components/ParamtersValidationComponent";
import LoginDTO from "../DTO/LoginDTO";
import AccountDTO from "../DTO/AccountDTO";
import AccountUseCase from "../../application/useCase/account/AccountUseCase";
import LoginUseCase from "../../application/useCase/account/LoginUseCase";
import Account from "../../domain/account/Account";
import AuthorizationTokenMiddleware from "../middleware/Authorization";
import {Body, Controller, Delete, Get, ParamPath, Post, StatusResponse} from "express-swagger-autoconfigure";
import Authorization from "../middleware/Authorization";


const logger = new LoggerComponent();
const accountUseCase = new AccountUseCase();
const loginUseCase = new LoginUseCase();

@Controller("/account")
export default class AccountController {

    @StatusResponse(202)
    @StatusResponse(400)
    @Body({email:"string", password:"string"})
    @Post("/login")
    public async login( request: Request, response: Response): Promise<Response> {
        try{
            const desirableParameters = ["email","password"];
            ParamtersValidationComponent.allParamtersRequired(request.body, desirableParameters);
            const {email, password} = request.body;
            const login = await loginUseCase.login(email, password);
            logger.info("Login ok");
            return response.status(202).json(new LoginDTO(login));
        }catch (error: any) {
            logger.error("Login not ok", error);
            return response.status(400).json(error.message);
        }
    }

    @StatusResponse(200)
    @StatusResponse(400)
    @Get("/", Authorization.middleware, Authorization.middleware)
    public async read(request: Request, response: Response): Promise<Response> {
        try{

            const result = await accountUseCase.read();
            return response.status(200).json( AccountDTO.converter(result) );
        }catch (error: any) {
            logger.error("Not ok", error);
            return response.status(400).json(error.message);
        }
    }

    @StatusResponse(200)
    @StatusResponse(400)
    @Body({
        name : "string",
        email : "string",
        password: "string",
        cep: "string",
        city: "string",
        state: "string",
        birthDate : "string",
        type : "string"
    })
    @Post()
    public async create(request: Request, response: Response): Promise<Response> {
        try{
            logger.debug("Requested endpoint - POST /account ");
            const accountReceived: Account = request.body;

            const desirableParameters = ["name","email","password", "cep", "city", "state", "birthDate", "type"];
            ParamtersValidationComponent.allParamtersRequired(accountReceived, desirableParameters);

            const result: Account = await accountUseCase.create(accountReceived);
            logger.info("Requested endpoint - POST /account - Successfully");
            return response.status(200).json(new AccountDTO(result));
        }catch (e: any) {
            logger.error("Requested endpoint - POST /account - Unsuccessfully", e);
            return response.status(400).json(e.message);
        }
    }

    @StatusResponse(200)
    @StatusResponse(400)
    @ParamPath({uuid: "string"})
    @Get("/find-by-uuid/{uuid}", Authorization.middleware)
    public async findByUuid(request: Request, response: Response): Promise<Response> {
        try{
            logger.debug("Requested endpoint - GET /account/findByUuid/:uuid ");

            const desirableParameters = ["uuid"];
            ParamtersValidationComponent.allParamtersRequired(request.params, desirableParameters);

            const { uuid } = request.params;
            const result: Account = await accountUseCase.findByUuid(uuid);
            if(!result){
                throw new Error("Not Found")
            }
            logger.info("Requested endpoint - GET /account/findByUuid/:uuid  - Successfully");
            return response.status(200).json(new AccountDTO(result));
        }catch (e: any) {
            logger.error("Requested endpoint - GET /account/findByUuid/:uuid  - Unsuccessfully", e);
            return response.status(400).json(e.message);
        }
    }

    @StatusResponse(200)
    @StatusResponse(400)
    @ParamPath({uuid: "string"})
    @Delete("/{uuid}",Authorization.middleware)
    public async delete(request: Request, response: Response): Promise<Response> {
        try{
            logger.debug("Requested endpoint - DELETE /account/:uuid ");

            const desirableParameters = ["uuid"];
            ParamtersValidationComponent.allParamtersRequired(request.params, desirableParameters);

            const { uuid } = request.params;
            const result: string = await accountUseCase.delete(uuid);
            logger.info("Requested endpoint - DELETE /account/:uuid   - Successfully");

            if(!result){
                throw new Error("Not Found")
            }
            return response.status(200).json(result);
        }catch (e: any) {
            logger.error("Requested endpoint - DELETE /account/:uuid   - Unsuccessfully", e);
            return response.status(400).json(e.message);
        }
    }

    @StatusResponse(200)
    @StatusResponse(400)
    @ParamPath({type: "string"})
    @Get("/find-by-account-type/{type}",Authorization.middleware)
    public async findByAccountType(request: Request, response: Response): Promise<Response> {
        try{
            logger.debug("Requested endpoint - GET /account/:type ");
            const desirableParameters = ["type"];
            ParamtersValidationComponent.allParamtersRequired(request.params, desirableParameters);

            const { type } = request.params;
            const result: Account[] = await accountUseCase.findByAccountType(type);
            return response.status(200).json(AccountDTO.converter(result));
        }catch (e: any) {
            return response.status(400).json(e.message);
        }
    }
}