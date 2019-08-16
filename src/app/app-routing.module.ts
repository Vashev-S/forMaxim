import {RouterModule, Routes} from '@angular/router';
import {CreateEventComponent} from './create-event/create-event.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  { path: '', component: CreateEventComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
