import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlHelperService {
  public appendParamsArrayToUrl(url: string, paramName: string, paramValues: string[]): string {
    if (!url){
      throw new Error('URL should not be empty');
    }

    if (!paramName){
      throw new Error('ParamName should not be empty');
    }

    if (!paramValues || paramValues.length === 0){
      throw new Error('ParamValues should not be empty');
    }

    for (let paramValue of paramValues) {
      const prefix = url.indexOf('?') === -1 ? '?' : '&'
      url += `${prefix}${paramName}=${paramValue}`;
    }

    return url;
  }
}
