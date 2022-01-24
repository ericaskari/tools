import { InjectionToken } from '@angular/core';
import { Environment } from '../../models/environment.model';

export interface CrudStoreModuleConfig {
    environment: Environment;
}
export const crudStoreModuleConfigInjectionToken = new InjectionToken<CrudStoreModuleConfig>('CrudStoreModuleConfig');
