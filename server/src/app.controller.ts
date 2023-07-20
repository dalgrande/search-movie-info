import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('movies')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':title')
  async getMovieInfoByTitle(@Param('title') title: string) {
    try {
      const movieInfo = await this.appService.getMovieInfoByTitle(title);

      if (!movieInfo.Title)
        return {
          message: 'This movie title was not found in our database.',
        };
        
      //dto
      return {
        title: movieInfo.Title,
        year: movieInfo.Year,
        poster: movieInfo.Poster,
        plot: movieInfo.Plot,
        actors: movieInfo.Actors,
        rating: movieInfo.imdbRating,
      };
    } catch (error) {
      return { message: 'Error: Please, verify your API credentials.' };
    }
  }
}
