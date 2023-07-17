import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PublicationDto } from './dto';
import { publicationRepositorie } from './publication.repositories';

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
      if (
        error.message.includes(
          'Unique constraint failed on the fields: (`title`)',
        )
      ) {
        throw new ConflictException('choose a differente title');
      }
      throw new BadRequestException();
    }
  }
  async getPublications(user) {
    const posts = await this.publicationRepositorie.findPublications(user.sub);
    return posts;
  }
}
