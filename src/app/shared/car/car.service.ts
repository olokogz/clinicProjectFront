import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CarService {

  public API = '//localhost:8080';
  public CAR_API = this.API + '/cars';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    const url = 'http://localhost:8080/cool-cars';
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa('test:test123')});
    return this.http.get(url, {headers});
  }

  get(id: string){
    return this.http.get(this.CAR_API+'/'+id);
  }

  save(car: any): Observable<any>{
    let result: Observable<Object>;
    if(car['href']){
      result = this.http.put(car.href, car);
    }else{
      result = this.http.post(this.CAR_API,car);
    }
    return result;
  }

  remove(href: string){
    return this.http.delete(href);
  }
}