import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BottleHistoryEntryDocument = HydratedDocument<BottleHistoryEntry>;

@Schema()
export class BottleHistoryEntry {
  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({
    required: true,
    enum: ['bottlesRemoved', 'bottlesAdded'],
    type: String,
  })
  action: string;

  @Prop({ required: true, type: Number })
  bottleCount: number;
}

export const BottleHistoryEntrySchema =
  SchemaFactory.createForClass(BottleHistoryEntry);
