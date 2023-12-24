import { IsEmail, IsNotEmpty } from 'class-validator';
// ID/Name/Date of Bird/Gender/Email/Address
export class CreateEmployeeDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  date_of_bird: string;

  @IsNotEmpty({ message: 'Giới tính không đươc để trống' })
  gender: string;

  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: string;
}
