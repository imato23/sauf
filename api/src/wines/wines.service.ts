import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wine } from './schemas/wine.schema';
import { CreateWineDto } from './dtos/create-wine.dto';
import { UpdateWineDto } from './dtos/update-wine.dto';
import { WineDto } from './dtos/wine.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { VintageInfo } from './schemas/vintage-info.schema';

@Injectable()
export class WinesService {
  constructor(
    @InjectModel(Wine.name) private readonly wineModel: Model<Wine>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getAllWines(): Promise<WineDto[]> {
    const wines: Wine[] = await this.wineModel
      .find()
      .sort({ name: 'asc' })
      .exec();

    return this.mapper.mapArray(wines, Wine, WineDto);
  }

  async getWineById(wineId: string): Promise<WineDto> {
    const wine: Wine = await this.wineModel.findOne({ _id: wineId }).exec();

    wine.vintageInfos = wine.vintageInfos.sort(
      (first: VintageInfo, second: VintageInfo) =>
        0 - (first.vintage < second.vintage ? 1 : -1),
    );

    return this.mapper.map(wine, Wine, WineDto);
  }

  async addWine(createWineDto: CreateWineDto): Promise<WineDto> {
    const createdWine = new this.wineModel(createWineDto);
    createdWine.createdOn = createdWine.updatedOn = new Date();
    await createdWine.save();

    return this.mapper.map(createdWine, Wine, WineDto);
  }

  async updateWine(
    wineId: string,
    updateWineDto: UpdateWineDto,
  ): Promise<WineDto> {
    const wine: Wine = updateWineDto as unknown as Wine;
    wine.updatedOn = new Date();

    const updatedWine: Wine = await this.wineModel
      .findByIdAndUpdate(wineId, wine, { new: true })
      .exec();

    return this.mapper.map(updatedWine, Wine, WineDto);
  }

  async deleteWine(wineId: string): Promise<WineDto> {
    const wine: Wine = await this.wineModel
      .findByIdAndDelete({ _id: wineId })
      .exec();

    return this.mapper.map(wine, Wine, WineDto);
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
