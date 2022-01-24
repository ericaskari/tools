import dotenv from 'dotenv';
import { Service } from 'typedi';

@Service()
export class EnvironmentConfiguration {
    constructor() {
        if (this.isLocalDevelopment()) {
            dotenv.config();
        }
    }

    private get environment(): { [key: string]: string | undefined } {
        return process.env || {};
    }

    public isLocalDevelopment(): boolean {
        return this.environment.NODE_ENV === 'local';
    }

    public get APP_VERSION(): number {
        if (!this.environment.APP_VERSION) {
            throw new Error('Please set APP_VERSION');
        }

        return parseInt(this.environment.APP_VERSION);
    }

    public get AWS_BUCKET_NAME(): string {
        return this.environment.AWS_BUCKET_NAME || 'weare-hpk';
    }

    public get SERVER_ADDRESS(): string {
        return this.environment.SERVER_ADDRESS || 'localhost';
    }

    public get SSL(): boolean {
        return this.environment.SSL === 'true';
    }

    public get PORT(): string {
        return this.environment.PORT || this.SSL ? '443' : '80';
    }

    public get DB_ADDRESS(): string {
        return this.environment.DB_URL || '';
    }


}
