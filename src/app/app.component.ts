import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CheckInternetService } from './services/check-internet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _internet: CheckInternetService,
    private snackBar: MatSnackBar) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  ngOnInit(): void {
    this._internet.createOnline$().subscribe(isOnline => {
      if (!isOnline) {
        this.snackBar.open('Sin conexión a internet', undefined, {
          verticalPosition: this.verticalPosition,
          horizontalPosition: this.horizontalPosition
        });
      } else {
        this.snackBar.open('Conectado a internet', undefined, {
          verticalPosition: this.verticalPosition,
          horizontalPosition: this.horizontalPosition,
          duration: 2000
        });
      }
    });
  }

}
