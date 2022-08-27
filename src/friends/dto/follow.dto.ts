import { IsNumber } from "class-validator";

export class FollowDto {
  @IsNumber()
  readonly sender: number;
  
  @IsNumber()
  readonly recipient: number;
}