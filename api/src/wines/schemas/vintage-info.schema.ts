import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StorageLocation } from './storage-location.schema';
import { BottleHistoryEntry } from './bottle-history.schema';

export type VintageInfoDocument = HydratedDocument<VintageInfo>;

@Schema()
export class VintageInfo {
  @Prop({ required: true, type: Number })
  vintage: number;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  alcoholicStrength: number;

  @Prop({ type: Number })
  residualSugar: number;

  @Prop({ type: Number })
  tartaricAcid: number;

  @Prop({ type: [StorageLocation] })
  storageLocations: StorageLocation[];

  @Prop({ type: [BottleHistoryEntry] })
  history: BottleHistoryEntry[];
}

export const VintageInfoSchema = SchemaFactory.createForClass(VintageInfo);
