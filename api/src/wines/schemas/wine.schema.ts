import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { VintageInfo } from './vintage-info.schema';
import { AutoMap } from '@automapper/classes';

export type WineDocument = HydratedDocument<Wine>;

@Schema()
export class Wine {
  @Prop({ required: true, type: String })
  @AutoMap()
  name: string;

  @Prop({
    required: true,
    enum: ['WhiteWine', 'RedWine', 'RoseWine', 'SparklingWine'],
    type: String,
  })
  @AutoMap()
  category: string;

  @Prop({ required: true, type: String })
  @AutoMap()
  country: string;

  @Prop({ required: true, type: String })
  @AutoMap()
  region: string;

  @Prop({ required: true, type: String })
  @AutoMap()
  producer: string;

  @Prop({ type: [VintageInfo] })
  @AutoMap(() => VintageInfo)
  vintageInfos: VintageInfo[];

  @Prop({ type: String })
  @AutoMap()
  image: string;

  @Prop({ required: true, type: Date })
  @AutoMap()
  createdOn: Date;

  @Prop({ required: true, type: Date })
  @AutoMap()
  updatedOn: Date;
}

export const WineSchema = SchemaFactory.createForClass(Wine);
