import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WineService } from '../shared/services/wine.service';
import { Observable } from 'rxjs';
import { Wine } from '../shared/models/wine.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-view-wine',
  templateUrl: './view-wine.component.html',
  styleUrls: ['./view-wine.component.scss']
})
export class ViewWineComponent implements OnInit {
  public wineId: string;
  public commonDataFormGroup!: FormGroup;
  public categories$: Observable<string[]>;
  public wine$: Observable<Wine>;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private wineService: WineService) {
    this.wineId = this.activatedRoute.snapshot.params.wineId;
    this.categories$ = this.wineService.getWineCategories();

    this.commonDataFormGroup = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      producer: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required]
    });

    this.wine$ = wineService.getWine(this.wineId).pipe(tap((wine: Wine) => this.commonDataFormGroup.patchValue(wine)));
  }

  ngOnInit(): void {
  }
}
