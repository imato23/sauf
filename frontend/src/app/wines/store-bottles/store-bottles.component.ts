import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray, ValidationErrors, FormControl } from '@angular/forms';
import { StorageLocation } from '../shared/models/storage-location.model';
import { duplicateStorageLocationsValidator } from '../shared/validators/duplicate-storage-locations.validator';

@Component({
  selector: 'app-store-bottles',
  templateUrl: './store-bottles.component.html',
  styleUrls: ['./store-bottles.component.scss']
})
export class StoreBottlesComponent implements OnInit {
  public vintageDetailsFormGroup!: UntypedFormGroup;
  public storageLocationsFormArray: UntypedFormArray = new UntypedFormArray([]);
  public storageLocations: StorageLocation[] = [];

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

  constructor(private formBuilder: UntypedFormBuilder) {
  }

  ngOnInit(): void {
  }

  public onAddStorageLocation(): void {
    const storageLocation: StorageLocation = { row: undefined, shelf: undefined };
    this.storageLocations.push(storageLocation);
    this.storageLocationsFormArray.push(this.buildStorageLocationFormGroup(storageLocation));
  }

  public onRemoveStorageLocation(index: number): void {
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
