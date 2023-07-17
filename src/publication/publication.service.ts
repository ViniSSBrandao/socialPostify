import { BadRequestException, Injectable } from '@nestjs/common';
import { PublicationDto } from './dto';
import { publicationRepositorie } from './publicartion.repositories';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepositorie: publicationRepositorie,
  ) {}

  async postPublication(dto: PublicationDto, user) {
    try {
      const posts = await this.publicationRepositorie.addPublications(
        dto,
        user.sub,
      );

      return posts;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async getPublications(user) {
    const posts = await this.publicationRepositorie.findPublications(user.sub);
    return posts;
  }
}
