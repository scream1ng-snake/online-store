import { IsString } from "class-validator";

export class UpdateBrandDto {
  @IsString({message: "Должно быть строковым"})
  readonly name: string;
}