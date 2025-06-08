export class BottleHistoryEntryDto {
  readonly producer: string;
  readonly wineName: string;
  readonly category: string;
  readonly date: Date;
  readonly action: string;
  readonly bottleCount: number;
}
