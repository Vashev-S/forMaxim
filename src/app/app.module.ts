import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {APP_BASE_HREF, DecimalPipe} from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SnowInterceptor } from './services/snow.interceptor';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateEventComponent } from './create-event/create-event.component';
import {AppRoutingModule} from './app-routing.module';
import {SpinnerService} from './services/spinner.service';
import {CreateEventService} from './create-event/create-event.service';
import { RecipientsDialogComponent } from './create-event/recipients-dialog/recipients-dialog.component';
import { ServiceOutagesComponent } from './create-event/service-outages/service-outages.component';
import {AppService} from './app.service';
import { ResultDialogComponent } from './create-event/result-dialog/result-dialog.component';
import { MessageDialogComponent } from './create-event/message-dialog/message-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    CreateEventComponent,
    RecipientsDialogComponent,
    ServiceOutagesComponent,
    ResultDialogComponent,
    MessageDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SnowInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue: '/' },
    SpinnerService,
    CreateEventService,
    DecimalPipe,
    AppService
  ],
  bootstrap: [AppComponent],
  entryComponents: [RecipientsDialogComponent, ResultDialogComponent, MessageDialogComponent]
})
export class AppModule { }
