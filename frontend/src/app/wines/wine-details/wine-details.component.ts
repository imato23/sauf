import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { WineService } from '../shared/services/wine.service';
import { Observable, of } from 'rxjs';
import { Wine } from '../shared/models/wine.model';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WineCategory } from '../shared/models/wine-category.model';
import { WebcamImage } from 'ngx-webcam';
import { MatDialog } from '@angular/material/dialog';
import { ImageCapturingComponent } from '../image-capturing/image-capturing.component';

@Component({
  selector: 'app-view-wine',
  templateUrl: './wine-details.component.html',
  styleUrls: ['./wine-details.component.scss']
})
export class WineDetailsComponent implements OnInit {
  public wineId: string;
  public wineFormGroup: FormGroup;
  public categories$: Observable<string[]>;
  public wine$: Observable<Wine>;
  public currentImage: string | null = null;

  get nameField(): AbstractControl | null {
    return this.wineFormGroup.get('name');
  }

  get producerField(): AbstractControl | null {
    return this.wineFormGroup.get('producer');
  }

  get countryField(): AbstractControl | null {
    return this.wineFormGroup.get('country');
  }

  get regionField(): AbstractControl | null {
    return this.wineFormGroup.get('region');
  }

  get categoryField(): AbstractControl | null {
    return this.wineFormGroup.get('category');
  }

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private wineService: WineService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {
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
        console.log(`Loading wine with id '${this.wineId}'.`);
        this.currentImage = wine.image;
        return this.wineFormGroup.patchValue(wine);
      }));
    } else {
      this.wine$ = this.createWine().pipe(tap((wine: Wine) =>
        this.wineFormGroup.patchValue(wine)));;
    }
  }

  ngOnInit(): void {
  }

  public onSave(): void {
    const wine: Wine = this.wineFormGroup.value;
    wine.image = this.currentImage;

    if (this.wineId) {
      this.wineService.updateWine(this.wineId, wine).subscribe((updatedWine: Wine) =>
        console.log(`Wine with id '${this.wineId}' has been updated.`));
    } else {
      this.wineService.addWine(wine).subscribe((createdWine: Wine) => {
        // eslint-disable-next-line no-underscore-dangle
        this.wineId = createdWine._id;
        console.log(`Wine with id '${this.wineId}' has been created.`);
      });
    }

    this.snackBar.open($localize`:@@WineHasBeenSaved: Changes have been saved.`, undefined, { duration: 2000 });
  }

  public onDelete(): void {
    this.wineService.deleteWine(this.wineId).subscribe(() => {
      this.snackBar.open($localize`: @@WineHasBeenDeleted: Wine has been deleted.`, undefined, { duration: 2000 });
      this.router.navigate(['/wines/wine-list']);
    });
  }

  public onCaptureImage(): void {
    const dialogRef = this.dialog.open(ImageCapturingComponent, {
      // height: '600px',
      // width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: WebcamImage) => {
      if (result) {
        this.currentImage = result.imageAsDataUrl;
      }
    });
  }

  private createWine(): Observable<Wine> {
    return of({
      _id: '',
      name: '',
      category: WineCategory.RedWine,
      country: '',
      region: '',
      producer: '',
      image: null,
      vintageInfos: [],
      bottleCount: 0
    });
  }
}
