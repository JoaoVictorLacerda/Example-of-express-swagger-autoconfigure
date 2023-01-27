import { Express } from "express";
import os from "os";
import LoggerComponent from "../components/LoggerComponent";
import App from "./AppWebServer";

class Server {

    private server: Express;

    constructor (){
        const app = new App();
        this.server = app.getApp();
    }
    public async startServer():Promise<void> {
        this.server.listen(5000, Server.showTheSystemInformation);
    }

    private static showTheSystemInformation():void {
        const arch = os.arch();
        const plataform = os.platform();
        const type = os.type();
        const mem = os.totalmem();
        const cpus = os.cpus();
        const logger = new LoggerComponent();

        logger.info(`SERVICE RUNNING ON PORT: 5000`);
        logger.info(`SO: ${type} ${plataform} ${arch}`);
        logger.info(`RAM: ${Math.floor(mem * (10 ** -9))} GB`);
        logger.info(`CORES: ${cpus.length}`);
        logger.info(`CPU: ${cpus[0].model}`);
    }
}

new Server().startServer();