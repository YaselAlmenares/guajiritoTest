import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable()
export class TokenErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private notificationServices:NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //console.log(request);
    return next.handle(request).pipe(
      catchError(error=>{
        this.HandleGlobalError(error);
        throw error;
      })
    );
  }

  private HandleGlobalError(error:HttpErrorResponse):void{

    switch(error.status){
      case 0:
        this.notificationServices.mostrarNotificacion("Error desconocido",true,10000);
      break;
      //Adicionar errores segun BE
    }
  }

}
