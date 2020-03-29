import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICountry } from "../models/icountry";
import { Country } from "../models/country";
import { of, Observable, throwError } from "rxjs";
import { filter, map, catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CountryObservableService {
  baseURL: string = "https://restcountries.eu/rest/v2/name/";

  constructor(private http: HttpClient) {}

  observableSearch(term: string): Observable<Country[]> {
    return this.http.get(`${this.baseURL}${term}`).pipe(
      map((data: Country[]) => {
        return data;
      }),
      catchError(error => {
        return throwError("Error in Observable");
      })
    );
  }
}
