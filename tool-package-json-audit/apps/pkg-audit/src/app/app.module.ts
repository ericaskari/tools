import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { RootDependencyComponent } from './root-dependency/root-dependency.component';
import { RootDependencyVersionComponent } from './root-dependency-version/root-dependency-version.component';
import {
  RootDependencyVersionPeerComponent
} from './root-dependency-version-peer/root-dependency-version-peer.component';
import { DependencyDetailsFetchPipe } from './dependency-details-fetch.pipe';
import { PeersToListPipe } from './peers-to-list.pipe';

@NgModule({
  declarations: [ AppComponent, RootDependencyComponent, RootDependencyVersionComponent, RootDependencyVersionPeerComponent, DependencyDetailsFetchPipe, PeersToListPipe ],
  imports: [ BrowserModule, HttpClientModule ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {

}
