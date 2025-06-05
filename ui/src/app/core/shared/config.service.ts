import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private httpClient: HttpClient) {
  }

  public async load(): Promise<any> {
    // if (!environment.production) {
    //   return;
    // }
    //
    // const config = await firstValueFrom(this.httpClient.get('/de/assets/config.json'));
    // Object.assign(environment, config);
  }
}
