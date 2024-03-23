import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogOptions } from '../dialog-options';

export interface DialogErrorData {
  type: string;
  message: string;
}

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss'
})
export class ErrorModalComponent {
  title: string;

  constructor(
    public dialogRef: MatDialogRef<ErrorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogErrorData,
  ) {
    this.title = data.message;
  }

  onRetryClick() {
    this.dialogRef.close(this.data.type);
    console.log('Retry clicked');
  }
}
