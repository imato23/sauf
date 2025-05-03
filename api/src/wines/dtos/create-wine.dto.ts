import { WineCategoryDto } from './wine-category.dto';

export class CreateWineDto {
  readonly name: string;
  readonly category: WineCategoryDto;
  readonly country: string;
  readonly region: string;
  readonly producer: string;
  //readonly vintageInfos: VintageInfoDto[];
  readonly image: Buffer;
  readonly bottleCount: number;
}
