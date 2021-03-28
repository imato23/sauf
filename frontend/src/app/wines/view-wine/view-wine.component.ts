import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-wine',
  templateUrl: './view-wine.component.html',
  styleUrls: ['./view-wine.component.scss']
})
export class ViewWineComponent implements OnInit {
  public wineId: number;

  constructor(private activatedRoute: ActivatedRoute) {
    this.wineId = this.activatedRoute.snapshot.params.wineId;
  }

  ngOnInit(): void {
  }
}
