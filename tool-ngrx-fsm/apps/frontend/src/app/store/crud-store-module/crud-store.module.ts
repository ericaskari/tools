import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FeatureStoreNamesEnum } from '../../enums/store-names.enum';

import { CrudStoreModuleConfig, crudStoreModuleConfigInjectionToken } from './crud-store.module.config';
import { CrudStoreModuleEffects } from './crud-store.module.effect';
import { CrudReducer } from './src/crud.reducer';
import { CrudService } from './src/crud.service';

@NgModule({
  imports: [StoreModule.forFeature(FeatureStoreNamesEnum.CRUDS, CrudReducer), EffectsModule.forFeature(CrudStoreModuleEffects)]
})
export class CrudStoreModule {
  static forRoot(config: CrudStoreModuleConfig): ModuleWithProviders<CrudStoreModule> {
    return {
      ngModule: CrudStoreModule,
      providers: [
        CrudService,
        {
          provide: crudStoreModuleConfigInjectionToken,
          useValue: config
        }
      ]
    };
  }
}
