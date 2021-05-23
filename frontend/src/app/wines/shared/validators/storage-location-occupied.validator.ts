import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidatorFn, FormArray, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageLocation } from '../models/storage-location.model';
import { WineService } from '../services/wine.service';

@Injectable({
    providedIn: 'root'
})
export class StorageLocationOccupiedValidator {
    constructor(private wineService: WineService) { }

    public storageLocationOccupiedValidator(excludedWineId: string, excludedVintage: number): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const vintageFormGroup = control as FormGroup;
            const storageLocationsFormArray: FormArray = vintageFormGroup.get('storageLocations') as FormArray;

            if (!storageLocationsFormArray) {
                return of(null);
            }

            const storageLocations: StorageLocation[] = storageLocationsFormArray.controls
                .map((formGroup: AbstractControl) => ({ row: formGroup.get('row')?.value, shelf: formGroup.get('shelf')?.value }));

            if (!storageLocations) {
                return of(null);
            }

            return this.wineService.storageLocationsExist(excludedWineId, excludedVintage, storageLocations)
                .pipe(map((exists: boolean) => exists ? { storageLocationOccupied: true } : null));
        };
    }
}
