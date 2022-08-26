import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { City } from '../models/city.model';
import { Message } from '../models/message.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private URL: string = 'http://localhost:8080';

  cities = new BehaviorSubject<City[]>([]);

  fetchedCities : City[] = [];

  activeCity = new EventEmitter<City>();

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getCities() {
    console.log("Fetch called ");
    return this.http
      .get<City[]>(this.URL + '/city')
      .pipe(catchError(this.errorService.handleError),tap(response => {
        this.fetchedCities = response;
        console.log(response);
        localStorage.setItem("activeCity",JSON.stringify(this.fetchedCities[0]));
        this.activeCity.emit(this.fetchedCities[0]);
        this.cities.next(this.fetchedCities);
      })).subscribe();
  }

  addCity(cityName : string){

    let city = new City();
    city.name = cityName;

    return this.http.post<City>(this.URL + '/city',city)
    .pipe(catchError(this.errorService.handleError));
  }

  updateCity(city : City){

    return this.http.put<City>(this.URL + '/city',city)
    .pipe(catchError(this.errorService.handleError)).subscribe(response => {
      console.log(response);
    })
  }

  deleteCity(city : City){

    return this.http.delete<Message>(this.URL + `/city/${city.id}`)
    .pipe(catchError(this.errorService.handleError),
    tap(res => {
      this.fetchedCities.splice(this.fetchedCities.indexOf(city),1);
      this.cities.next(this.fetchedCities)}));
    
  }
}
