import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmDialogData } from 'src/app/interfaces/i-confirm-dialog-data';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
// data variable has been used in html file
constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData) { }
}
