import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {Observable, of, tap} from 'rxjs';
import {AbstractControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Wine} from '../shared/models/wine.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {WineService} from '../shared/services/wine.service';
import {WineCategory} from '../shared/models/wine-category.model';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {MatButton, MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatListItem, MatNavList} from '@angular/material/list';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {ImageCapturingComponent} from '../image-capturing/image-capturing.component';
import {WebcamImage} from 'ngx-webcam';

@Component({
  imports: [
    MatToolbar,
    MatIcon,
    RouterLink,
    MatFormField,
    MatSelect,
    AsyncPipe,
    MatTooltip,
    MatIconButton,
    ReactiveFormsModule,
    MatInput,
    MatMiniFabButton,
    MatMenuTrigger,
    NgIf,
    MatListItem,
    MatMenuItem,
    NgxTrimDirectiveModule,
    MatOption,
    MatMenu,
    MatButton,
    NgForOf,
    MatNavList,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatError,
    MatLabel
  ],
  selector: 'app-wine-details',
  styleUrl: './wine-details.component.scss',
  templateUrl: './wine-details.component.html',
})
export class WineDetailsComponent implements OnInit {
  public wineId: string;
  public wineFormGroup: UntypedFormGroup;
  public categories$: Observable<string[]>;
  public wine$: Observable<Wine>;
  public currentImage: string | null = null;
  public producers$: Observable<string[]>;
  public countries$: Observable<string[]>;
  public regions$: Observable<string[]>;
  public dummyImage = 'assets/no-wine-photo.png';

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: UntypedFormBuilder,
              private wineService: WineService, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) {
    this.wineId = this.activatedRoute.snapshot.params['wineId'];
    this.categories$ = this.wineService.getWineCategories();

    this.wineFormGroup = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      producer: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required],
    });

    if (this.wineId) {
      this.wine$ = wineService.getWine(this.wineId).pipe(tap((wine: Wine) => {
        console.log(`Loading wine with id '${this.wineId}'.`);
        this.currentImage = wine.image;
        return this.wineFormGroup.patchValue(wine);
      }));
    } else {
      this.wine$ = this.createWine().pipe(tap((wine: Wine) =>
        this.wineFormGroup.patchValue(wine)));

    }

    this.producers$ = this.wineService.getAllProducers();
    this.countries$ = this.wineService.getAllCountries();
    this.regions$ = this.wineService.getAllRegions();
  }

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
        this.wineId = createdWine.id;
        console.log(`Wine with id '${this.wineId}' has been created.`);
      });
    }

    this.snackBar.open($localize`Changes have been saved.`, undefined, {duration: 2000});
  }

  public onDelete(): void {
    this.wineService.deleteWine(this.wineId).subscribe(() => {
      this.snackBar.open($localize`Wine has been deleted.`, undefined, {duration: 2000});
      this.router.navigate(['/wines/wine-list']);
    });
  }

  public onCaptureImage(): void {
    const dialogRef = this.dialog.open(ImageCapturingComponent);

    dialogRef.afterClosed().subscribe((result: WebcamImage) => {
      if (result) {
        this.currentImage = result.imageAsDataUrl;
      }
    });
  }

  private createWine(): Observable<Wine> {
    return of({
      id: '',
      name: '',
      category: WineCategory.RedWine,
      country: '',
      region: '',
      producer: '',
      image: null,
      vintageInfos: [],
      bottleCount: 0,
    });
  }
}
