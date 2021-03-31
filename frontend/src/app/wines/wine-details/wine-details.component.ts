import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WineService } from '../shared/services/wine.service';
import { Observable, of } from 'rxjs';
import { Wine } from '../shared/models/wine.model';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WineCategory } from '../shared/models/wine-category.model';

@Component({
  selector: 'app-view-wine',
  templateUrl: './wine-details.component.html',
  styleUrls: ['./wine-details.component.scss']
})
export class WineDetailsComponent implements OnInit {
  public wineId: string;
  public wineFormGroup!: FormGroup;
  public categories$: Observable<string[]>;
  public wine$: Observable<Wine>;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private wineService: WineService, private snackBar: MatSnackBar) {
    this.wineId = this.activatedRoute.snapshot.params.wineId;
    this.categories$ = this.wineService.getWineCategories();

    this.wineFormGroup = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      producer: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required]
    });

    if (this.wineId) {
      this.wine$ = wineService.getWine(this.wineId).pipe(tap((wine: Wine) => {
        console.log(`Loading wine with id ${this.wineId}.`);
        return this.wineFormGroup.patchValue(wine);
      }));
    } else {
      this.wine$ = this.createWine().pipe(tap((wine: Wine) => {
        console.log(`Creating new wine.`);
        return this.wineFormGroup.patchValue(wine);
      }));;
    }
  }

  ngOnInit(): void {
  }

  public onSave() {
    if (this.wineId) {
      this.wineService.updateWine(this.wineId, this.wineFormGroup.value).subscribe();
    } else {
      this.wineService.addWine(this.wineFormGroup.value).subscribe();
    }

    this.snackBar.open($localize`:@@ChangesHaveBeenSaved:Changes have been saved.`, undefined, { duration: 2000 });
  }

  private createWine(): Observable<Wine> {
    return of({
      _id: '',
      name: '',
      category: WineCategory.redWine,
      country: '',
      region: '',
      producer: '',
      image: null,
      vintageInfos: []
    });
  }
}
