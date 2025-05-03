import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VintageInfosService } from './vintage-infos.service';
import { VintageInfoDto } from './dtos/vintage-Info.dto';
import { WineDto } from './dtos/wine.dto';

@Controller('wines/:wineId/vintage-infos')
export class VintageInfosController {
  constructor(private readonly vintageInfosService: VintageInfosService) {}

  @Get()
  async getAllVintageInfos(
    @Param('wineId') wineId: string,
  ): Promise<VintageInfoDto[]> {
    return await this.vintageInfosService.getAllVintageInfos(wineId);
  }

  @Get(':vintage')
  async getVintageInfoByVintage(
    @Param('wineId') wineId: string,
    @Param('vintage') vintage: number,
  ): Promise<VintageInfoDto> {
    return await this.vintageInfosService.getVintageInfoByVintage(
      wineId,
      vintage,
    );
  }

  @Post()
  async addVintageInfo(
    @Param('wineId') wineId: string,
    @Body() vintageInfo: VintageInfoDto,
  ): Promise<VintageInfoDto> {
    return await this.vintageInfosService.addVintageInfo(wineId, vintageInfo);
  }

  @Put(':vintage')
  async updateVintageInfo(
    @Param('wineId') wineId: string,
    @Param('vintage') vintage: number,
    @Body() vintageInfo: VintageInfoDto,
  ): Promise<WineDto> {
    return await this.vintageInfosService.updateVintageInfo(
      wineId,
      vintage,
      vintageInfo,
    );
  }

  @Delete(':vintage')
  async removeVintageInfo(
    @Param('wineId') wineId: string,
    @Param('vintage') vintage: number,
  ): Promise<WineDto> {
    return await this.vintageInfosService.removeVintageInfo(wineId, vintage);
  }
}
