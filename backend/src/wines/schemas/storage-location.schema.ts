import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class StorageLocation extends Document {
    @Prop({ required: true })
    row: number;

    @Prop({ required: true })
    shelf: number;
}

export const StorageLocationSchema = SchemaFactory.createForClass(StorageLocation);