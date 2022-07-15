import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators, AbstractControl, AbstractControlOptions } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VintageInfo } from '../shared/models/vintage-info.model';
import { Observable, of } from 'rxjs';
import { VintageInfoService } from '../shared/services/vintage-info.service';
import { tap } from 'rxjs/operators';
import { StorageLocationOccupiedValidator } from '../shared/validators/storage-location-occupied.validator';

@Component({
  selector: 'app-vintage-details',
  templateUrl: './vintage-details.component.html',
  styleUrls: ['./vintage-details.component.scss']
})
export class VintageDetailsComponent implements OnInit, AfterContentChecked {
  public wineId: string;
  public vintage: number;
  public vintageInfo$!: Observable<VintageInfo>;
  public vintageFormGroup: UntypedFormGroup;

  get vintageFormItem(): AbstractControl | null {
    return this.vintageFormGroup.get('vintage');
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private vintageInfoService: VintageInfoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private storageLocationOccupiedValidator: StorageLocationOccupiedValidator,
    private cdref: ChangeDetectorRef) {
    this.wineId = this.activatedRoute.snapshot.params.wineId;
    this.vintage = this.activatedRoute.snapshot.params.vintage;

    const currentYear = new Date().getFullYear();

    const controlOptions: AbstractControlOptions = {
      asyncValidators: this.storageLocationOccupiedValidator.storageLocationOccupiedValidator(this.wineId, this.vintage),
      updateOn: 'change'
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
      this.vintageInfo$ = this.createVintageInfo().pipe(tap((vintageInfo: VintageInfo) => this.vintageFormGroup.patchValue(vintageInfo)));;
    }
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
      storageLocations: []
    });
  }
}
