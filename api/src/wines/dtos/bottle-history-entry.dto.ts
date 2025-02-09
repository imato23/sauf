import { BottleActionDto } from './bottle-action.dto';

export class BottleHistoryEntryDto {
  readonly date: Date;
  readonly action: BottleActionDto;
  readonly bottleCount: number;
}
