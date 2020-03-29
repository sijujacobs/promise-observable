import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Country } from "./models/country";
import { ICountry } from "./models/icountry";
import { CountryPromiseService } from "./services/promiseCountryService";
import { CountryObservableService } from "./services/observableCountryService";
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormsModule
} from "@angular/forms";

import {
  tap,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  loading: boolean = false;
  promiseResults: any;
  observableResults$: Observable<Country[]>;
  private searchTerms = new Subject<string>();
  constructor(
    public observableService: CountryObservableService,
    public promiseService: CountryPromiseService
  ) {}

  ngOnInit(): void {
    this.observableResults$ = this.searchTerms.pipe(
      tap(_ => (this.loading = true)),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.observableService.observableSearch(term)
      ),
      tap(_ => (this.loading = false))
    );
  }

  doObservableSearch(term: string) {
    this.searchTerms.next(term);
    // this.observableResults = this.observableService.observableSearch(term);
    // ------------ OR ---------------
    // this.observableService
    //   .observableSearch(term)
    //   .subscribe((data: Country[]) => {
    //     console.log("doObservableSearch :: data : ", data);
    //     this.countries = data;
    //   });
    // this.searchTerms.next(term);
  }

  doPromiseSearch(term: string) {
    this.loading = true;
    setTimeout(() => {
      this.promiseService.promiseSearch("amer").then(
        data => {
          this.promiseResults = data;
          this.loading = false;
          // console.log("2. search :: promiseResults : ", this.promiseResults);
        },
        error => {
          console.log("cpService : error", error);
        }
      );
    }, 2000);
  }
}
