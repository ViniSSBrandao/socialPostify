import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { publicationRepositorie } from './publication.repositories';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService, publicationRepositorie],
})
export class PublicationModule {}
