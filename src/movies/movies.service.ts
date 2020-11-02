import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movies.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    // return this.movies.find(movie => movie.id === parseInt(id, 10));
    const movie = this.movies.find(movie => movie.id === +id);
    if (!movie) throw new NotFoundException('Invalid movie id');
    return movie;
  }

  deleteOne(id: string): boolean {
    this.getOne(id);
    this.movies.filter(movie => movie.id !== +id);
    return true;
  }

  create(movieData) {
    this.movies.push({
      id: +this.movies.length + 1,
      ...movieData,
    });
  }
}
