import { BottleActionDto } from './bottle-action.dto';
import { AutoMap } from '@automapper/classes';

export class BottleHistoryEntryDto {
  @AutoMap()
  readonly date: Date;

  @AutoMap()
  readonly action: BottleActionDto;

  @AutoMap()
  readonly bottleCount: number;
}
