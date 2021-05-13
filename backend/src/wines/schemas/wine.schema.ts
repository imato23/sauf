import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { VintageInfo } from "./vintage-info.schema";

@Schema()
export class Wine extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, enum: ['whiteWine', 'redWine', 'roseWine', 'sparklingWine'] })
    category: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    region: string;

    @Prop({ required: true })
    producer: string;

    @Prop()
    vintageInfos: VintageInfo[]

    @Prop()
    image: Buffer;

    @Prop({ required: true })
    createdOn: Date;

    @Prop({ required: true })
    updatedOn: Date;
}

export const WineSchema = SchemaFactory.createForClass(Wine);