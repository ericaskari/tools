import { Service } from 'typedi';
import Ajv, { JTDSchemaType } from 'ajv/dist/jtd';


@Service()
export class ValidationConfiguration {
    ajv = new Ajv();
}
