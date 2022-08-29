import { IsString } from "class-validator";

export class CreateBrandDto {
  @IsString({message: "Должно быть строковым"})
  readonly name: string;
}