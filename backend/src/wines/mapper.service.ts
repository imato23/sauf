import { Injectable } from '@nestjs/common';
import { Wine } from './schemas/wine.schema';
import { WineDto } from './dto/wine.dto';
import { WineCategoryDto } from './dto/wine-category.dto';
import { VintageInfo } from './schemas/vintage-info.schema';
import { VintageInfoDto } from './dto/vintage-info.dto';
import { StorageLocation } from './schemas/storage-location.schema';
import { StorageLocationDto } from './dto/storage-location.dto';
import { BottleHistoryEntry } from './schemas/bottle-history-entry.schema';
import { BottleHistoryEntryDto } from './dto/bottle-history-entry.dto';
import { BottleActionDto } from './dto/bottle-action.dto';

@Injectable()
export class MapperService {
    public mapToWineDtoArray(source: Wine[]): WineDto[] {
        if (!source) {
            return [];
        }

        return source.map(x => this.mapToWineDto(x));
    }

    public mapToWineDto(source: Wine): WineDto {
        const target: WineDto = {
            _id: source._id,
            category: source.category as WineCategoryDto,
            country: source.country,
            image: source.image,
            name: source.name,
            producer: source.producer,
            region: source.region,
            vintageInfos: this.mapToVintageInfoDtoArray(source.vintageInfos),
            bottleCount: 0
        }

        target.bottleCount = target.vintageInfos.reduce((sum, current) => sum + current.bottleCount, 0);

        return target;
    }

    public mapToVintageInfoDtoArray(source: VintageInfo[]): VintageInfoDto[] {
        if (!source) {
            return [];
        }

        return source.map(x => this.mapToVintageInfoDto(x));
    }

    public mapToVintageInfoDto(source: VintageInfo): VintageInfoDto {
        const target: VintageInfoDto = {
            alcoholicStrength: source.alcoholicStrength,
            price: source.price,
            residualSugar: source.residualSugar,
            tartaricAcid: source.tartaricAcid,
            vintage: source.vintage,
            storageLocations: this.mapToStorageLocationDtoArray(source.storageLocations),
            history: this.mapToHistoryDtoArray(source.history),
            bottleCount: source.storageLocations ? source.storageLocations.length : 0,
        }

        return target;
    }

    public mapToHistoryDtoArray(source: BottleHistoryEntry[]): BottleHistoryEntryDto[] {
        if (!source) {
            return [];
        }

        return source.map(x => this.mapToHistoryDto(x));
    }

    public mapToHistoryDto(source: BottleHistoryEntry): BottleHistoryEntryDto {
        const target: BottleHistoryEntryDto = {
            action: source.action as BottleActionDto,
            bottleCount: source.bottleCount,
            date: source.date
        };

        return target;
    }

    public mapToStorageLocationDtoArray(source: StorageLocation[]): StorageLocationDto[] {
        if (!source) {
            return [];
        }

        return source.map(x => this.mapToStorageLocationDto(x));
    }

    public mapToStorageLocationDto(storageLocation: StorageLocation): StorageLocationDto {
        return {
            row: storageLocation.row,
            shelf: storageLocation.shelf
        }
    }
}
