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
import { WineListFilterDto } from './dtos/wine-list-filter.dto';

@Injectable()
export class WinesService {
  constructor(
    @InjectModel(Wine.name) private readonly wineModel: Model<Wine>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getAllWines(filter: WineListFilterDto = null): Promise<WineDto[]> {
    let query = this.wineModel.find();

    if (filter && filter.wineName) {
      query = query.where('name').regex(new RegExp(filter.wineName, 'i'));
    }

    if (filter && filter.producer) {
      query = query.where('producer').equals(filter.producer);
    }

    if (filter && filter.category) {
      query = query.where('category').equals(filter.category);
    }

    if (filter && filter.onlyAvailableWines) {
      query = query.where('vintageInfos.storageLocations.0').exists(true);
    }

    const wines = await query.sort({ name: 'asc' }).exec();
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
    const wines: WineDto[] = await this.getAllWines();
    return Array.from(
      new Set(wines.map((wine: WineDto) => wine.producer)),
    ).sort();
  }

  async getAllCountries(): Promise<string[]> {
    const wines: WineDto[] = await this.getAllWines();
    return Array.from(
      new Set(wines.map((wine: WineDto) => wine.country)),
    ).sort();
  }

  async getAllRegions(): Promise<string[]> {
    const wines: WineDto[] = await this.getAllWines();
    return Array.from(
      new Set(wines.map((wine: WineDto) => wine.region)),
    ).sort();
  }
}
