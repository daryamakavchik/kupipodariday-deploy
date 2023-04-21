import { IsInt, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateOfferDto {
  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @IsBoolean()
  hidden: boolean;
}
