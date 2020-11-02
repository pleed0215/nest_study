import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll() {
    return this.moviesService.getAll();
  }
  @Get('/search')
  search(@Query() query) {
    return query;
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    console.log(id);
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData) {
    console.log(movieData);
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.moviesService.deleteOne(id);
  }

  @Patch('/:id')
  path(@Param('id') id: string, @Body() updateData) {
    return { updatedMovie: id, ...updateData };
  }
}
