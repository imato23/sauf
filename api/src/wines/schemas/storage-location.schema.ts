import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { AutoMap } from '@automapper/classes';

export type StorageLocationDocument = HydratedDocument<StorageLocation>;

@Schema()
export class StorageLocation extends Document {
  @Prop({ required: true, type: Number })
  @AutoMap()
  row: number;

  @Prop({ required: true, type: Number })
  @AutoMap()
  shelf: number;
}

export const StorageLocationSchema =
  SchemaFactory.createForClass(StorageLocation);
