import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorComponent } from './editor/editor.component';
import { PlaygroundComponent } from './playground/playground.component';

const routes: Routes = [
    { path: 'editor', component: EditorComponent },
    { path: 'playground', component: PlaygroundComponent },
    { path: '', redirectTo: 'editor', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {}
