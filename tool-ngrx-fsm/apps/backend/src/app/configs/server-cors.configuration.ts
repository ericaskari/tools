import cors from 'cors';
import { Express } from 'express';
import { Service } from 'typedi';

interface CorsConfigurationInterface {
  hosts: string[];
  apply(app: Express): void;
}

@Service()
export class ServerCorsConfigurationService implements CorsConfigurationInterface {
  hosts = [process.env.FRONTEND_ADDRESS || ''];

  corsOptions = {
    origin: true,
    // origin: this.hosts,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200
  };

  apply(app: Express): void {
    app.use(cors(this.corsOptions));
  }
}
