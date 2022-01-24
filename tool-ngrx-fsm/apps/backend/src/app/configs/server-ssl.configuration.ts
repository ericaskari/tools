import fs from 'fs';
import https from 'https';
import { Service } from 'typedi';

interface SslConfig {
  prod: boolean;
  enable: boolean;
  keyPath: string;
  certPath: string;
  httpModeOnFail: boolean;
}
@Service()
export class ServerSslConfigurationService {
  private sslConfiguration: SslConfig = {
    prod: process.env.PRODUCTION === 'true',
    enable: process.env.SSL === 'true',
    keyPath: process.env.KEY || '',
    certPath: process.env.CERT || '',
    httpModeOnFail: true
  };

  get getServerOptions(): https.ServerOptions {
    if (!this.sslConfiguration.enable) {
      return {};
    }
    const keyPath = this.sslConfiguration.keyPath;
    const certPath = this.sslConfiguration.certPath;

    const keyExist = fs.existsSync(keyPath);
    const certExist = fs.existsSync(certPath);
    if (!keyExist && this.sslConfiguration.enable) {
      console.error(`Key  not found: ${keyPath}`);
    }
    if (!certExist && this.sslConfiguration.enable) {
      console.error(`Cert not found: ${certPath}`);
    }
    if ((!keyExist || !certExist) && !this.sslConfiguration.httpModeOnFail) {
      console.log({ certPath, keyPath });
      console.log('We Can not find certificate/key');
      process.exit(1);
    }
    try {
      const loadedKey = fs.readFileSync(keyPath);
      const loadedCert = fs.readFileSync(certPath);
      console.log('SSL         ACTIVE 👮‍️');
      return {
        key: loadedKey,
        cert: loadedCert
      };
    } catch (e) {
      if (keyExist && certExist) {
        console.error('Error while loading existing certificate/key');
      }
      console.log(Object.keys(e));
      console.log(Object.values(e));
      process.exit(1);
    }
  }
}
