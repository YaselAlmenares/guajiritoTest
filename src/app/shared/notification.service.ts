import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar) { }

  mostrarNotificacion( message:string, isError:boolean=false,duration:number = 5000 ) {
    this._snackBar.openFromComponent(NotificationComponent, {
      data: {
        message: message
      } ,
      duration:duration,
      panelClass:isError?'notificacion-error':'notificacion-success',
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
