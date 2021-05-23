import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ValidationErrors, FormControl } from '@angular/forms';
import { StorageLocation } from '../shared/models/storage-location.model';
import { duplicateStorageLocationsValidator } from '../shared/validators/duplicate-storage-locations.validator';

@Component({
  selector: 'app-store-bottles',
  templateUrl: './store-bottles.component.html',
  styleUrls: ['./store-bottles.component.scss']
})
export class StoreBottlesComponent implements OnInit {
  public vintageDetailsFormGroup!: FormGroup;
  public storageLocationsFormArray: FormArray = new FormArray([]);
  public storageLocations: StorageLocation[] = [];

  @Input()
  public set parentForm(parent: FormGroup) {
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

  constructor(private formBuilder: FormBuilder) {
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
    const storageLocationFormGroup: FormGroup = this.storageLocationsFormArray.controls[index] as FormGroup;
    return storageLocationFormGroup.errors;
  }

  private buildStorageLocationFormGroup(storageLocation: StorageLocation): FormGroup {
    const formGroup: FormGroup = this.formBuilder.group({
      row: [storageLocation.row, [Validators.required, Validators.min(1)]],
      shelf: [storageLocation.shelf, [Validators.required, Validators.min(1)]],
    });

    return formGroup;
  }
}
