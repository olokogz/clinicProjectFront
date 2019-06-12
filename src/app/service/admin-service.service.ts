import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {tap} from "rxjs/operators";
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http:HttpClient) { }



  baseUrl: string = "http://localhost:8080/admin";

  getUsers():Observable<User[]>
  {
    return this.http.get<User[]>(this.baseUrl+"/findAll").pipe(tap(data => console.log('fetched users')));
  }

}
