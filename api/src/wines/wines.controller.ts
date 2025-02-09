import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateWineDto } from './dtos/create-wine.dto';
import { UpdateWineDto } from './dtos/update-wine.dto';
import { Wine } from './schemas/wine.schema';
import { WinesService } from './wines.service';

@Controller('wines')
export class WinesController {
  constructor(private readonly winesService: WinesService) {}

  @Get()
  async findAll(): Promise<Wine[]> {
    return await this.winesService.getAllWines();
  }

  @Get('producers')
  async findAllProducers(): Promise<string[]> {
    return await this.winesService.getAllProducers();
  }

  @Get('countries')
  async findAllCountries(): Promise<string[]> {
    return await this.winesService.getAllCountries();
  }

  @Get('regions')
  async findAllRegions(): Promise<string[]> {
    return await this.winesService.getAllRegions();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Wine> {
    const wine: Wine = await this.winesService.getWineById(id);

    if (!wine) {
      throw new NotFoundException(`The wine with id '${id}' does not exist.`);
    }

    return wine;
  }

  @Post()
  async create(@Body() createWineDto: CreateWineDto): Promise<Wine> {
    return await this.winesService.addWine(createWineDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWineDto: UpdateWineDto,
  ): Promise<Wine> {
    return await this.winesService.updateWine(id, updateWineDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Wine> {
    return await this.winesService.deleteWine(id);
  }
}
