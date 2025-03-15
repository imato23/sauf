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
import { VintageInfo } from './schemas/vintage-info.schema';
import { Wine } from './schemas/wine.schema';
import { CreateVintageInfoDto } from './dtos/create-vintage-info.dto';
import { UpdateVintageInfoDto } from './dtos/update-vintage-info.dto';

@Controller('vintage-infos')
export class VintageInfosController {
  constructor(private readonly vintageInfosService: VintageInfosService) {}

  @Get()
  async getAllVintageInfos(
    @Param('wineId') wineId: string,
  ): Promise<VintageInfo[]> {
    return await this.vintageInfosService.getAllVintageInfos(wineId);
  }

  @Get(':wineId/:vintage')
  async getVintageInfoByVintage(
    @Param('wineId') wineId: string,
    @Param('vintage') vintage: number,
  ): Promise<VintageInfo> {
    return await this.vintageInfosService.getVintageInfoByVintage(
      wineId,
      vintage,
    );
  }

  @Post()
  async addVintageInfo(
    @Param('wineId') wineId: string,
    @Body() createVintageInfoDto: CreateVintageInfoDto,
  ): Promise<VintageInfo> {
    return await this.vintageInfosService.addVintageInfo(
      wineId,
      createVintageInfoDto,
    );
  }

  @Put(':wineId/:vintage')
  async updateVintageInfo(
    @Param('wineId') wineId: string,
    @Param('vintage') vintage: number,
    @Body() updateVintageInfoDto: UpdateVintageInfoDto,
  ): Promise<Wine> {
    return await this.vintageInfosService.updateVintageInfo(
      wineId,
      vintage,
      updateVintageInfoDto,
    );
  }

  @Delete(':wineId/:vintage')
  async removeVintageInfo(
    @Param('wineId') wineId: string,
    @Param('vintage') vintage: number,
  ): Promise<Wine> {
    return await this.vintageInfosService.removeVintageInfo(wineId, vintage);
  }
}
