import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PublicationDto } from './dto';

@Injectable()
export class publicationRepositorie {
  constructor(private readonly prisma: PrismaService) {}

  async addPublications(
    {
      published,
      image,
      text,
      title,
      dateToPublish,
      socialMedia,
    }: PublicationDto,
    userId: number,
  ) {
    const posts = await this.prisma.publication.create({
      data: {
        published,
        image,
        text,
        title,
        dateToPublish: new Date(dateToPublish),
        socialMedia,
        userId,
      },
    });

    return posts;
  }

  async findPublications(userId) {
    const posts = await this.prisma.publication.findMany({
      where: { userId },
    });
    return posts;
  }
}
