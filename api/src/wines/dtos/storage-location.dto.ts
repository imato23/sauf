import { AutoMap } from '@automapper/classes';

export class StorageLocationDto {
  @AutoMap()
  readonly row: number;

  @AutoMap()
  readonly shelf: number;
}
