import LoggerComponent from "../../../infrastructure/components/LoggerComponent";

import AccountError from "../../exception/AccountError";
import Account from "../../../domain/account/Account";


export default class AccountUseCase {

    private logger: LoggerComponent;


    constructor(){
        this.logger = new LoggerComponent();
    }


    public async read(): Promise<Account[]> {

        try{
            this.logger.debug("Reading accounts");
            return []
        }catch (error: any) {
            this.logger.error("Read with error", error);
            throw new AccountError(error.message)
        }
    }


    public async create(account: Account): Promise<Account> {
        try{
            this.logger.debug("Create Advisor")

            return account
        }catch (e: any){
            this.logger.error("Failure to create account", e);
            throw new AccountError("Failure to create account");
        }
    }

    public async findByUuid(uuid: string): Promise<Account> {
        try{
            this.logger.debug("Find Account by uuid")
            return {} as Account;
        }catch (e: any){
            this.logger.error("Failure to find Account by uuid", e);
            throw new AccountError("Failure to find Account by uuid");
        }
    }

    public async delete(uuid: string): Promise<string> {
        try{
            this.logger.debug("Delete Account by uuid")
            this.logger.info("Success in Delete Account by uuid");
            return uuid;
        }catch (e: any){
            this.logger.error("Failure to Delete Account by uuid", e);
            throw new AccountError("Failure to Delete Account by uuid");
        }
    }

    public async findByEmail(email: string): Promise<Account> {
        try{
            this.logger.debug("Find Account by email")
            this.logger.info("Success in find Account by email" );
            return {} as Account;
        }catch (e: any){
            this.logger.error("Failure to find Account by email", e);
            throw new AccountError("Failure to find Account by email");
        }
    }

    public async findByAccountType(type: string): Promise<Account[]> {

        try{
            return []
        }catch (e) {
            this.logger.error("Failure to find Account by email", e);
            throw new AccountError("Failure to find Accounts by type");
        }
    }

}