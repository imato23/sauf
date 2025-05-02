import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { CdkTrapFocus } from '@angular/cdk/a11y';

@Component({
  selector: 'app-remove-bottle-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatDialogTitle,
    CdkTrapFocus,
  ],
  templateUrl: './remove-bottle-dialog.component.html',
  styleUrl: './remove-bottle-dialog.component.scss',
})
export class RemoveBottleDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { row: number; shelf: number }) {
  }

  ngOnInit(): void {
  }
}
