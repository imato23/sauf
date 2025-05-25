import {Component, Input, OnInit} from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {StorageLocation} from '../shared/models/storage-location.model';
import {VintageInfoService} from '../shared/services/vintage-info.service';
import {duplicateStorageLocationsValidator} from '../shared/validators/duplicate-storage-locations.validator';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-store-bottles',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    MatError,
    MatInput,
    MatLabel,
    MatIconButton,
    MatButton,
    NgIf,
    NgForOf,
  ],
  templateUrl: './store-bottles.component.html',
  styleUrl: './store-bottles.component.scss',
})
export class StoreBottlesComponent implements OnInit {
  public vintageDetailsFormGroup!: UntypedFormGroup;
  public storageLocationsFormArray: UntypedFormArray = new UntypedFormArray([]);
  public storageLocations: StorageLocation[] = [];

  constructor(private formBuilder: UntypedFormBuilder, private vintageInfoService: VintageInfoService) {
  }

  @Input()
  public set parentForm(parent: UntypedFormGroup) {
    this.vintageDetailsFormGroup = parent;
    this.vintageDetailsFormGroup.addControl('storageLocations', this.storageLocationsFormArray);
  }

  @Input()
  public set data(data: StorageLocation[] | undefined) {
    if (data) {
      this.storageLocations = data;
      for (const storageLocation of data) {
        this.storageLocationsFormArray.push(this.buildStorageLocationFormGroup(storageLocation));
      }

      this.storageLocationsFormArray.setValidators(duplicateStorageLocationsValidator);
    }
  }

  ngOnInit(): void {
  }

  public onAddStorageLocation(): void {
    this.vintageInfoService.getNextAvailableStorageLocation(this.storageLocations).subscribe((storageLocation: StorageLocation) => {
      this.storageLocations.push(storageLocation);
      this.storageLocationsFormArray.push(this.buildStorageLocationFormGroup(storageLocation));
    });
  }

  public onRemoveStorageLocation(index: number): void {
    this.storageLocations.splice(index, 1);
    this.storageLocationsFormArray.removeAt(index);
  }

  public getStorageLocationErrors(index: number): ValidationErrors | null {
    const storageLocationFormGroup: UntypedFormGroup = this.storageLocationsFormArray.controls[index] as UntypedFormGroup;
    return storageLocationFormGroup.errors;
  }

  private buildStorageLocationFormGroup(storageLocation: StorageLocation): UntypedFormGroup {
    const formGroup: UntypedFormGroup = this.formBuilder.group({
      row: [storageLocation.row, [Validators.required, Validators.min(1)]],
      shelf: [storageLocation.shelf, [Validators.required, Validators.min(1)]],
    });

    return formGroup;
  }
}
