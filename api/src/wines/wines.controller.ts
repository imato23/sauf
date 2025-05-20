import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateWineDto } from './dtos/create-wine.dto';
import { UpdateWineDto } from './dtos/update-wine.dto';
import { WinesService } from './wines.service';
import { WineDto } from './dtos/wine.dto';
import { WineListFilterDto } from './dtos/wine-list-filter.dto';

@Controller('wines')
export class WinesController {
  constructor(private readonly winesService: WinesService) {}

  @Get()
  async getAllWines(
    @Query('wineName') wineName: string,
    @Query('producer') producer: string,
    @Query('category') category: string,
  ): Promise<WineDto[]> {
    const filter: WineListFilterDto = {
      wineName: wineName,
      producer: producer,
      category: category,
    };

    return await this.winesService.getAllWines(filter);
  }

  @Get('producers')
  async getAllProducers(): Promise<string[]> {
    return await this.winesService.getAllProducers();
  }

  @Get('countries')
  async getAllCountries(): Promise<string[]> {
    return await this.winesService.getAllCountries();
  }

  @Get('regions')
  async getAllRegions(): Promise<string[]> {
    return await this.winesService.getAllRegions();
  }

  @Get(':id')
  async getWineById(@Param('id') id: string): Promise<WineDto> {
    const wineDto: WineDto = await this.winesService.getWineById(id);

    if (!wineDto) {
      throw new NotFoundException(`The wine with id '${id}' does not exist.`);
    }

    return wineDto;
  }

  @Post()
  async addWine(@Body() createWineDto: CreateWineDto): Promise<WineDto> {
    return await this.winesService.addWine(createWineDto);
  }

  @Put(':id')
  async updateWine(
    @Param('id') id: string,
    @Body() updateWineDto: UpdateWineDto,
  ): Promise<WineDto> {
    return await this.winesService.updateWine(id, updateWineDto);
  }

  @Delete(':id')
  async deleteWine(@Param('id') id: string): Promise<WineDto> {
    return await this.winesService.deleteWine(id);
  }
}
