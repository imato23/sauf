import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { VintageInfo } from './vintage-info.schema';
import { WineCategoryDto } from '../dtos/wine-category.dto';

export type WineDocument = HydratedDocument<Wine>;

@Schema()
export class Wine {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({
    required: true,
    enum: ['WhiteWine', 'RedWine', 'RoseWine', 'SparklingWine'],
    type: String,
  })
  category: string;

  @Prop({ required: true, type: String })
  country: string;

  @Prop({ required: true, type: String })
  region: string;

  @Prop({ required: true, type: String })
  producer: string;

  @Prop({ type: [VintageInfo] })
  vintageInfos: VintageInfo[];

  @Prop({ type: Buffer })
  image: Buffer;

  @Prop({ required: true, type: Date })
  createdOn: Date;

  @Prop({ required: true, type: Date })
  updatedOn: Date;
}

export const WineSchema = SchemaFactory.createForClass(Wine);
