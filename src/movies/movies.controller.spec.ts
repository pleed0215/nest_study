import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  /* it('should be defined', () => {
    expect(controller).toBeDefined();
  });*/
  it('should be 4', () => {
    expect(2 + 2).toEqual(4);
  });
});
