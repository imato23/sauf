import { WineCategory } from './wine-category.model';
import { VintageInfo } from './vintage-info.model';

export interface Wine {
    _id: string | null;
    name: string;
    country: string;
    region: string;
    producer: string;
    category: WineCategory;
    vintageInfos: VintageInfo[];
    image: string | null;
}
