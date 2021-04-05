import { WineCategoryDto } from "./wine-category.dto";
import { VintageInfoDto } from './vintage-info.dto';

export class WineDto {
    _id: string;
    name: string;
    category: WineCategoryDto;
    country: string;
    region: string;
    producer: string;
    vintageInfos: VintageInfoDto[];
    image: Buffer;
    bottleCount: number;
}