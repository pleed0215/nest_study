import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movies.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // unit test
  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
  describe('getOne', () => {
    it('should return movie instance', () => {
      service.create({ title: 'Test Movie', genres: ['test'], year: 2000 });
      const result = service.getOne(1);

      expect(result).toBeDefined();
    });
    it('should not found error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should delete a movie', () => {
      service.create({ title: 'Test Movie', genres: ['test'], year: 2000 });
      const result = service.deleteOne(1);
      expect(result).toBeTruthy();
    });
    it('should not found error', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      service.create({ title: 'Test Movie', genres: ['test'], year: 2000 });
      const result = service.getAll().length;

      expect(result).toBeGreaterThanOrEqual(1);
    });
  });

  describe('update', () => {
    it('should update movie information.', () => {
      service.create({ title: 'Test Movie', genres: ['test'], year: 2000 });
      const beforeUpdated = service.getOne(1)['title'];
      service.update(1, { title: 'Updated' });
      const afterUpdated = service.getOne(1)['title'];

      expect(afterUpdated).toEqual('Updated');
    });

    it('should not found error', () => {
      try {
        service.update(999, { title: 'Updated' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
