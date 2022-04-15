
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBar {

    constructor(private snackBar: MatSnackBar) { }


    public openSnackBar(message: string, level: string): void {

        this.snackBar.open(message,
            '✖',
            {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: [level]
            });
    }
}



