import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenErrorHandlerInterceptor } from './shared/token-error-handler.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationComponent } from './shared/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:TokenErrorHandlerInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
