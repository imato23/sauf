import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWineDto } from './dto/create-wine.dto';
import { Wine } from './schemas/wine.schema';

@Injectable()
export class WineService {
    constructor(@InjectModel('Wine') private readonly wineModel: Model<Wine>) { }

    async getAllWines(): Promise<Wine[]> {
        const wines = await this.wineModel.find().exec();
        return wines;
    }

    async getWineById(wineId: string): Promise<Wine> {
        const wine = await this.wineModel.findById(wineId).exec();
        return wine;
    }

    async addWine(createWineDto: CreateWineDto): Promise<Wine> {
        const newWine = new this.wineModel(createWineDto);
        return newWine.save();
    }

    async updateWine(wineId: string, createWineDto: CreateWineDto): Promise<Wine> {
        const updatedWine = await this.wineModel.findByIdAndUpdate(wineId, createWineDto, { new: true });
        return updatedWine;
    }

    async deleteWine(wineId: string): Promise<Wine> {
        const deletedWine = await this.wineModel.findByIdAndRemove(wineId);
        return deletedWine;
    }
}
