import { IsEmail } from "class-validator";

export class LoginUserDto {
  @IsEmail({}, {message: "Некоректный почтовый адрес"})
  readonly email: string;
  
  readonly password: string;

}