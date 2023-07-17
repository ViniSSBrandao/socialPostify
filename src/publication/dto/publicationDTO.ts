import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
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

  @IsDateString({ strict: true })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: `Date must be on the format 'YYYY-MM-DD'`,
  })
  dateToPublish: string;

  @IsNotEmpty()
  @IsString()
  socialMedia: string;

  @IsBoolean()
  @IsNotEmpty()
  published: boolean;
}
