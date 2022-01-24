import { Express } from 'express';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import { Service } from 'typedi';

import { AppService } from './app';
import { DatabaseConfiguration } from './configs/database.configuration';
import { EnvironmentConfiguration } from './configs/environment.configuration';
import { ServerSslConfigurationService } from './configs/server-ssl.configuration';
import { InitData } from './initial-data/init-data';

@Service()
export class Server {
    PORT = process.env.PORT || 8000;

    constructor(
        private appService: AppService,
        private databaseConfiguration: DatabaseConfiguration,
        private initDate: InitData,
        private serverSslConfigurationService: ServerSslConfigurationService,
        private environment: EnvironmentConfiguration
    ) {}

    async start(): Promise<void> {
        await this.preScript();

        const app = await this.appService.init();

        await this.listen(app);

        await this.postScript();
    }

    private async listen(app: Express): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                console.log('Running     Server ✅');

                const options = this.serverSslConfigurationService.getServerOptions;

                const createServer = this.environment.SSL ? createHttpsServer : createHttpServer;

                createServer(options, app).listen(this.PORT, () => {
                    console.log(`Address     ${this.environment.SSL ? 'https://' : 'http://'}${this.environment.SERVER_ADDRESS}:${this.PORT}`);

                    console.log(`Environment ${this.environment.isLocalDevelopment() ? 'Development' : 'Production'}`);

                    resolve();
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    private async preScript() {
        console.log('Running     Pre Scripts');

        this.databaseConfiguration.init();

        // await this.awsS3Service.init();

        await this.initDate.init();
    }

    private async postScript() {
        console.log('Running     Post Scripts');
    }
}
