import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StorageLocationDocument = HydratedDocument<StorageLocation>;

@Schema()
export class StorageLocation {
  @Prop({ required: true, type: Number })
  row: number;

  @Prop({ required: true, type: Number })
  shelf: number;
}

export const StorageLocationSchema =
  SchemaFactory.createForClass(StorageLocation);
