import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-bottle-dialog',
  templateUrl: './remove-bottle-dialog.component.html',
  styleUrls: ['./remove-bottle-dialog.component.scss']
})
export class RemoveBottleDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { row: number; shelf: number }) { }

  ngOnInit(): void {
  }
}
