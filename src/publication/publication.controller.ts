import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PublicationDto } from './dto';
import { PublicationService } from './publication.service';
import { Request } from 'express';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class PublicationController {
  constructor(private publicationService: PublicationService) {}
  @Get('publications')
  findPublications(@Req() req: Request) {
    const { user } = req;
    return this.publicationService.getPublications(user);
  }

  @Post('publication')
  addPublications(@Body() dto: PublicationDto, @Req() req: Request) {
    const { user } = req;
    return this.publicationService.postPublication(dto, user);
  }
}
