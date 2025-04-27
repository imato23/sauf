import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AutoMap } from '@automapper/classes';

export type StorageLocationDocument = HydratedDocument<StorageLocation>;

@Schema()
export class StorageLocation {
  @Prop({ required: true, type: Number })
  @AutoMap()
  row: number;

  @Prop({ required: true, type: Number })
  @AutoMap()
  shelf: number;
}

export const StorageLocationSchema =
  SchemaFactory.createForClass(StorageLocation);
