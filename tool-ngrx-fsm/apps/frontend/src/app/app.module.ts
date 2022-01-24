import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { ActionInstanceComponent } from './editor/inner-components/ui-elements/action-instance/action-instance.component';
import { EffectInstanceComponent } from './editor/inner-components/ui-elements/effect-instance/effect-instance.component';
import { InterfaceConverterInstanceComponent } from './editor/inner-components/ui-elements/interface-converter-instance/interface-converter-instance.component';
import { UiElementHangerComponent } from './editor/inner-components/ui-elements/ui-element-hanger/ui-element-hanger.component';
import { ActionListItemComponent } from './editor/inner-components/ui-list/action-list-item/action-list-item.component';
import { EffectListItemComponent } from './editor/inner-components/ui-list/effect-list-item/effect-list-item.component';
import { InterfaceConverterListItemComponent } from './editor/inner-components/ui-list/interface-converter-list-item/interface-converter-list-item.component';
import { InterfaceListItemComponent } from './editor/inner-components/ui-list/interface-list-item/interface-list-item.component';
import { ListItemPanelComponent } from './editor/inner-components/ui-list/list-item-panel/list-item-panel.component';
import { LayerDragComponent } from './editor/view-components/layer-drag/layer-drag.component';
import { LayerGridComponent } from './editor/view-components/layer-grid/layer-grid.component';
import { LayerRelationsComponent } from './editor/view-components/layer-relations/layer-relations.component';
import { InterfaceCreatorComponent } from './interface-creator/interface-creator.component';
import { PlaygroundComponent } from './playground/playground.component';
import { appModuleEffects } from './store/app.module.effect';
import { rootActionReducerMap, rootMetaReducers } from './store/app.module.reducer';
import { CrudStoreModule } from './store/crud-store-module';
import { InterfaceService } from './store/interface-store-module/interface.service';
import { CustomRouterStateSerializer } from './store/router-store-module/src/router.serializer';
import { InterfaceKeyComponent } from './interface-key/interface-key.component';

@NgModule({
    declarations: [
        AppComponent,
        EffectInstanceComponent,
        ActionInstanceComponent,
        InterfaceListItemComponent,
        LayerGridComponent,
        EditorComponent,
        LayerDragComponent,
        PlaygroundComponent,
        LayerRelationsComponent,
        UiElementHangerComponent,
        ActionListItemComponent,
        EffectListItemComponent,
        ListItemPanelComponent,
        InterfaceConverterListItemComponent,
        InterfaceConverterInstanceComponent,
        InterfaceCreatorComponent,
        InterfaceKeyComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        HttpClientModule,
        DragDropModule,
        MatToolbarModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        AppRoutingModule,
        RouterModule.forRoot([]),
        CrudStoreModule.forRoot({ environment }),
        EffectsModule.forRoot(appModuleEffects),
        StoreModule.forRoot(rootActionReducerMap, {
            metaReducers: rootMetaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        StoreRouterConnectingModule.forRoot({ serializer: CustomRouterStateSerializer }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, serialize: false }),
        MatTooltipModule,
        HighlightModule
    ],
    providers: [
        InterfaceService,
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                fullLibraryLoader: () => import('highlight.js')
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
