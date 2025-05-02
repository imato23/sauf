import { WineCategoryDto } from './wine-category.dto';
import { VintageInfoDto } from './vintage-Info.dto';

export class UpdateWineDto {
  readonly name: string;
  readonly category: WineCategoryDto;
  readonly country: string;
  readonly region: string;
  readonly producer: string;
  readonly vintageInfos: VintageInfoDto[];
  readonly image: Buffer;
}
