import { BottleActionDto } from './bottle-action.dto';

export class BottleHistoryEntryDto {
    date: Date;
    action: BottleActionDto;
    bottleCount: number;
}