import { Document, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StorageLocation } from './storage-location.schema';
import { BottleHistoryEntry } from './bottle-history.schema';
import { AutoMap } from '@automapper/classes';

export type VintageInfoDocument = HydratedDocument<VintageInfo>;

@Schema()
export class VintageInfo extends Document {
  @Prop({ required: true, type: Number })
  @AutoMap()
  vintage: number;

  @Prop({ type: Number })
  @AutoMap()
  price: number;

  @Prop({ type: Number })
  @AutoMap()
  alcoholicStrength: number;

  @Prop({ type: Number })
  @AutoMap()
  residualSugar: number;

  @Prop({ type: Number })
  @AutoMap()
  tartaricAcid: number;

  @Prop({ type: [StorageLocation] })
  @AutoMap(() => StorageLocation)
  storageLocations: StorageLocation[];

  @Prop({ type: [BottleHistoryEntry] })
  @AutoMap(() => BottleHistoryEntry)
  history: BottleHistoryEntry[];
}

export const VintageInfoSchema = SchemaFactory.createForClass(VintageInfo);
