import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICountry } from "../models/icountry";
import { Country } from "../models/country";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CountryPromiseService {
  baseURL: string = "https://restcountries.eu/rest/v2/name/";
  loading: boolean;
  results: Country[];
  constructor(private http: HttpClient) {
    this.loading = false;
    this.results = [];
  }

  promiseSearch(term: string) {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(`${this.baseURL}${term}`)
        .toPromise()
        .then(
          (res: any) => {
            this.results = res.map((item: any) => {
              return new Country(item.name, item.flag);
            });
            resolve(this.results);
          },
          error => {
            reject("Error in Promise");
          }
        );
    });
    return promise;
  }
}
