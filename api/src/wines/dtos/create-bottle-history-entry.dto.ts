import { BottleActionDto } from './bottle-action.dto';
import { AutoMap } from '@automapper/classes';

export class CreateBottleHistoryEntryDto {
  @AutoMap()
  readonly date: Date;

  @AutoMap()
  readonly action: BottleActionDto;

  @AutoMap()
  readonly bottleCount: number;
}
