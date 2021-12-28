import { Injectable } from '@angular/core';
import {map, Observable, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";

export function gql(stringPieces: TemplateStringsArray): string {
  return stringPieces.join("");
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url='https://countries.trevorblades.com/'
  constructor(private http: HttpClient) { }
  public query<T>(
    query: string,
    variables?: { [key: string]: any }
  ): Observable<T> {
    return this.http
      .post<{ data: T }>(this.url, {
        query: query,
        variables: variables
      })
      .pipe(map(d => d.data));
  }

}
export     const countriesQuery=gql`
   query{

  countries{

    name

    emoji

    code

    capital

    currency

    phone

    languages {

      name

      native

      code

    }

    continent {

      code

      name

    }

    states{

      name

      code

    }

  }

}
    `
