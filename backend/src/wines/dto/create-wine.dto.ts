import { VintageInfo } from "../schemas/vintage-info.schema";
import { WineCategoryDto } from "./wine-category.dto";

export class CreateWineDto {
    name: string;
    category: WineCategoryDto;
    country: string;
    region: string;
    producer: string;
    vintageInfos: VintageInfo[];
    image: Buffer;
}