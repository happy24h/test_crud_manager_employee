import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Employee>;
// ID/Name/Date of Bird/Gender/Email/Address

@Schema({ timestamps: true })
export class Employee {
  @Prop()
  name: string;

  @Prop()
  date_of_bird: string;

  @Prop()
  gender: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  address: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deleteAt: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
