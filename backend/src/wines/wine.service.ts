import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WineDto } from './dto/wine.dto';
import { Wine } from './schemas/wine.schema';
import { MapperService } from './mapper.service';

@Injectable()
export class WineService {
    constructor(@InjectModel('Wine') private readonly wineModel: Model<Wine>, private mapper: MapperService) { }

    async getAllWines(): Promise<WineDto[]> {
        const wines: Wine[] = (await this.wineModel.find().exec())
        return this.mapper.mapToWineDtoArray(wines);
    }

    async getWineById(wineId: string): Promise<WineDto> {
        const wine: Wine = await this.wineModel.findById(wineId).exec();
        return this.mapper.mapToWineDto(wine);
    }

    async addWine(wine: WineDto): Promise<WineDto> {
        const newWine: Wine = new this.wineModel(wine);
        return newWine.save() as unknown as Promise<WineDto>;
    }

    async updateWine(wineId: string, wine: WineDto): Promise<WineDto> {
        const wine1: Wine = wine as unknown as Wine;
        const updatedWine = await this.wineModel.findByIdAndUpdate(wineId, wine1, { new: true });
        return updatedWine as unknown as WineDto;
    }

    async deleteWine(wineId: string): Promise<WineDto> {
        const deletedWine = await this.wineModel.findByIdAndRemove(wineId);
        return deletedWine as unknown as WineDto;
    }
}
