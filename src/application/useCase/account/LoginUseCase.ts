import LoggerComponent from "../../../infrastructure/components/LoggerComponent";
import Login from "../../../domain/account/Login";
import AccountError from "../../exception/AccountError";
import AccountUseCase from "./AccountUseCase";

export default class LoginUseCase {
    private logger: LoggerComponent;
    private accountUseCase: AccountUseCase;

    constructor(){
        this.logger= new LoggerComponent();
        this.accountUseCase = new AccountUseCase();
    }

    public async login(email: string, password: string):Promise<Login>{
        try{
            this.logger.debug("Making login to advisor");
            return {} as Login
        }catch (error: any) {
            this.logger.error("Login to advisor with error", error);
            throw new AccountError("Login not found")
        }
    }

}