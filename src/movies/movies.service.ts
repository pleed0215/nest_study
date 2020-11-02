import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movies.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    // return this.movies.find(movie => movie.id === parseInt(id, 10));
    const movie = this.movies.find(movie => movie.id === id);
    if (!movie) throw new NotFoundException('Invalid movie id');
    return movie;
  }

  deleteOne(id: number): boolean {
    this.getOne(id);
    this.movies = [...this.movies.filter(movie => movie.id !== id)];
    return true;
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updatedData: UpdateMovieDto) {
    const movieIndex = this.movies.findIndex(movie => movie.id === id);
    if (movieIndex > -1) {
      this.movies[movieIndex] = {
        ...this.movies[movieIndex],
        ...updatedData,
      };
    } else {
      throw new NotFoundException("Wrong id, movie doesn't exist.");
    }
    return {
      success: true,
      id,
      updated: this.movies[movieIndex],
    };
  }
}
