import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class PublicationDto {
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsDateString()
  dateToPublish: string;

  @IsNotEmpty()
  @IsString()
  socialMedia: string;

  @IsBoolean()
  @IsNotEmpty()
  published: boolean;
}
