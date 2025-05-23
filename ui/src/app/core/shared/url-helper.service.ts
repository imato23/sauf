import {Injectable} from '@angular/core';

/**
 * The UrlHelperService provides utility methods for URL manipulation,
 * such as appending query parameters to a URL.
 */
@Injectable({
  providedIn: 'root'
})
export class UrlHelperService {
  /**
   * Appends an array of parameters to a given URL.
   * Each value in the paramValues array is added to the URL with the specified parameter name.
   * If the URL does not already contain a query string, the method starts it with a '?'.
   * Later parameters are appended with '&'.
   *
   * @param {string} url - The base URL to which the parameters will be appended.
   *                        This cannot be an empty string.
   * @param {string} paramName - The name of the parameter to be appended.
   *                              This cannot be an empty string.
   * @param {string[]} paramValues - An array of parameter values to be added to the URL.
   *                                  This array cannot be empty.
   * @return {string} The updated URL with the appended query parameters.
   * @throws {Error} If the URL, paramName, or paramValues are empty or invalid.
   */
  public appendParamsArrayToUrl(url: string, paramName: string, paramValues: string[]): string {
    if (!url) {
      throw new Error('URL should not be empty');
    }

    if (!paramName) {
      throw new Error('ParamName should not be empty');
    }

    if (!paramValues || paramValues.length === 0) {
      throw new Error('ParamValues should not be empty');
    }

    for (let paramValue of paramValues) {
      const prefix = url.indexOf('?') === -1 ? '?' : '&'
      url += `${prefix}${paramName}=${paramValue}`;
    }

    return url;
  }
}
