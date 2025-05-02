import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { VintageInfo } from '../shared/models/vintage-info.model';
import {
  AbstractControl,
  AbstractControlOptions,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VintageInfoService } from '../shared/services/vintage-info.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageLocationOccupiedValidator } from '../shared/validators/storage-location-occupied.validator';
import { AsyncPipe, Location, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { StoreBottlesComponent } from '../store-bottles/store-bottles.component';

@Component({
  selector: 'app-vintage-details',
  imports: [
    MatIcon,
    MatMenuTrigger,
    MatFormField,
    MatMenu,
    RouterLink,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    MatMenuItem,
    MatInput,
    MatIconButton,
    MatLabel,
    MatError,
    MatToolbar,
    StoreBottlesComponent,
  ],
  templateUrl: './vintage-details.component.html',
  styleUrl: './vintage-details.component.scss',
})
export class VintageDetailsComponent implements OnInit, AfterContentChecked {
  public wineId: string;
  public vintage: number;
  public vintageInfo$!: Observable<VintageInfo>;
  public vintageFormGroup: UntypedFormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private vintageInfoService: VintageInfoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private storageLocationOccupiedValidator: StorageLocationOccupiedValidator,
    private cdref: ChangeDetectorRef) {
    this.wineId = this.activatedRoute.snapshot.params['wineId'];
    this.vintage = this.activatedRoute.snapshot.params['vintage'];

    const currentYear = new Date().getFullYear();

    const controlOptions: AbstractControlOptions = {
      asyncValidators: this.storageLocationOccupiedValidator.storageLocationOccupiedValidator(this.wineId, this.vintage),
      updateOn: 'change',
    };

    this.vintageFormGroup = this.formBuilder.group({
      vintage: ['', [Validators.required, Validators.min(currentYear - 20), Validators.max(currentYear)]],
      price: [''],
      alcoholicStrength: [''],
      residualSugar: [''],
      tartaricAcid: [''],
    }, controlOptions);

    if (this.vintage) {
      this.vintageInfo$ = vintageInfoService.getVintageInfo(this.wineId, this.vintage).pipe(tap((vintageInfo: VintageInfo) => {
        console.log(`Loading vintage info for vintage '${this.vintage}'.`);
        return this.vintageFormGroup.patchValue(vintageInfo);
      }));
    } else {
      this.vintageInfo$ = this.createVintageInfo().pipe(tap((vintageInfo: VintageInfo) => this.vintageFormGroup.patchValue(vintageInfo)));

    }
  }

  get vintageFormItem(): AbstractControl | null {
    return this.vintageFormGroup.get('vintage');
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  public onSave(): void {
    if (this.vintage) {
      this.vintageInfoService.updateVintageInfo(this.wineId, this.vintage, this.vintageFormGroup.value).subscribe(
        (() => console.log(`Vintage info '${this.vintage}' has been updated.`)));
    } else {
      this.vintageInfoService.addVintageInfo(this.wineId, this.vintageFormGroup.value).subscribe((createdVintageInfo: VintageInfo) => {
        this.vintage = createdVintageInfo.vintage ? createdVintageInfo.vintage : 0;
        console.log(`Vintage info '${this.vintage}' has been created.`);
      });
    }

    this.snackBar.open($localize`Changes have been saved.`, undefined, { duration: 2000 });
  }

  public onDelete(): void {
    if (!this.vintage) {
      throw new Error('Vintage is null');
    }

    this.vintageInfoService.removeVintageInfo(this.wineId, this.vintage).subscribe(() => {
      this.snackBar.open($localize`Vintage info has been deleted.`, undefined, { duration: 2000 });
      this.location.back();
    });
  }

  private createVintageInfo(): Observable<VintageInfo> {
    return of({
      vintage: undefined,
      price: undefined,
      alcoholicStrength: undefined,
      residualSugar: undefined,
      tartaricAcid: undefined,
      bottleCount: 0,
      storageLocations: [],
    });
  }
}
