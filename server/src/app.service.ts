import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  apiKey = this.configService.get<string>('API_KEY');

  async getMovieInfoByTitle(title: string): Promise<any> {
    const apiKey = this.apiKey;
    const movieData: AxiosResponse = await firstValueFrom(
      this.httpService.get(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`,
      ),
    );
    return movieData.data;
  }
}
