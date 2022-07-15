import { ValidatorFn, AbstractControl, ValidationErrors, UntypedFormArray, FormGroup } from '@angular/forms';
import { StorageLocation } from '../models/storage-location.model';
/**
 * Checks that no storage location is duplicated in the passed StorageLocation form array.
 *
 * @param The Form Array of storage locations to validate.
 * @returns The object {duplicateStorageLocations :true} or null.
 */
export const duplicateStorageLocationsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const storageLocationsFormArray: UntypedFormArray = control as UntypedFormArray;

  const storageLocations: StorageLocation[] = storageLocationsFormArray.controls
    .map((formGroup: AbstractControl) => ({ row: formGroup.get('row')?.value, shelf: formGroup.get('shelf')?.value }));

  const validatedStorageLocations: StorageLocation[] = [];

  for (const storageLocation of storageLocations) {
    if (validatedStorageLocations.some(validStorageLocations =>
      validStorageLocations.row === storageLocation.row && validStorageLocations.shelf === storageLocation.shelf)) {
      return { duplicateStorageLocations: true };
    }

    validatedStorageLocations.push(storageLocation);
  }

  return null;
};
