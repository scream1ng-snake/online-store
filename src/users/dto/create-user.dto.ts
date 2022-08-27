import { Blob } from "buffer";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString({message: "E-mail должен быть строкой"})
  @IsEmail({}, {message: "Некоректный почтовый адрес"})
  readonly email: string;

  @IsString({message: "Пароль должен быть строкой"})
  @Length(4, 10, {message: "Пароль должен быть от 4 до 10 символов"})
  readonly password: string;

  @IsString({message: "Никнейм должен быть строкой"})
  @Length(4, 20, {message: "Никнейм пользоввателя должен быть от 4 до 20 символов"})
  readonly username: string;

  readonly image?: Blob;
  
  readonly activationLink?: string;
}