export class UpdateWineDto {
  readonly name: string;
  //readonly category: WineCategoryDto;
  readonly country: string;
  readonly region: string;
  readonly producer: string;
  //readonly vintageInfos: VintageInfoDto[];

  //@ApiProperty({ type: () => Buffer })
  readonly image: Buffer;
  readonly bottleCount: number;
}
