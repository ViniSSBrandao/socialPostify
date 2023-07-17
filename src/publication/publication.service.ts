import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PublicationDto } from './dto';
import { userDto } from 'src/auth/dto';

@Injectable()
export class PublicationService {
  constructor(private prisma: PrismaService) {}
  async postPublication(
    {
      published,
      image,
      text,
      title,
      dateToPublish,
      socialMedia,
    }: PublicationDto,
    user,
  ) {
    try {
      const posts = await this.prisma.publication.create({
        data: {
          published,
          image,
          text,
          title,
          dateToPublish: new Date(dateToPublish),
          socialMedia,
          userId: user.sub,
        },
      });
      return posts;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
  async getPublications() {
    return 0;
  }
}
