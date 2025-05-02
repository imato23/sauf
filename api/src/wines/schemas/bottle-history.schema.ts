import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type BottleHistoryEntryDocument = HydratedDocument<BottleHistoryEntry>;

@Schema()
export class BottleHistoryEntry extends Document {
  @Prop({ required: true, type: Date })
  @AutoMap()
  date: Date;

  @Prop({
    required: true,
    enum: ['bottlesRemoved', 'bottlesAdded'],
    type: String,
  })
  @AutoMap()
  action: string;

  @Prop({ required: true, type: Number })
  @AutoMap()
  bottleCount: number;
}

export const BottleHistoryEntrySchema =
  SchemaFactory.createForClass(BottleHistoryEntry);
