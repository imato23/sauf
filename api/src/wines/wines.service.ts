import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wine } from './schemas/wine.schema';
import { CreateWineDto } from './dtos/create-wine.dto';
import { UpdateWineDto } from './dtos/update-wine.dto';

@Injectable()
export class WinesService {
  constructor(
    @InjectModel(Wine.name) private readonly wineModel: Model<Wine>,
  ) {}

  async getAllWines(): Promise<Wine[]> {
    return await this.wineModel.find().sort({ name: 'asc' }).exec();
  }

  async getWineById(wineId: string): Promise<Wine> {
    const wine: Wine = await this.wineModel.findOne({ _id: wineId }).exec();

    wine.vintageInfos = wine.vintageInfos.sort(
      (first, second) => 0 - (first.vintage < second.vintage ? 1 : -1),
    );
    return wine;
  }

  async addWine(createWineDto: CreateWineDto): Promise<Wine> {
    const createdWine = new this.wineModel(createWineDto);
    createdWine.createdOn = createdWine.updatedOn = new Date();
    await createdWine.save();
    return createdWine;
  }

  async updateWine(
    wineId: string,
    updateWineDto: UpdateWineDto,
  ): Promise<Wine> {
    const wine: Wine = updateWineDto as unknown as Wine;
    wine.updatedOn = new Date();

    return this.wineModel.findByIdAndUpdate(wineId, wine, { new: true }).exec();
  }

  async deleteWine(wineId: string): Promise<Wine> {
    return await this.wineModel.findByIdAndDelete({ _id: wineId }).exec();
  }

  async getAllProducers(): Promise<string[]> {
    const wines: Wine[] = await this.getAllWines();
    return Array.from(new Set(wines.map((wine: Wine) => wine.producer))).sort();
  }

  async getAllCountries(): Promise<string[]> {
    const wines: Wine[] = await this.getAllWines();
    return Array.from(new Set(wines.map((wine: Wine) => wine.country))).sort();
  }

  async getAllRegions(): Promise<string[]> {
    const wines: Wine[] = await this.getAllWines();
    return Array.from(new Set(wines.map((wine: Wine) => wine.region))).sort();
  }
}
