import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {tap} from "rxjs/operators";
import { User } from '../model/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})



export class AdminServiceService {

  constructor(private http:HttpClient) { }
  private headers = new Headers({'Content-Type': 'application/json'});



  baseUrl: string = "http://localhost:8080/admin";



  getUsers():Observable<User[]>
  {
    return this.http.get<User[]>(this.baseUrl+"/findAll").pipe(tap(data => console.log('fetched users')));
  }

  public deleteUser(user){
    return this.http.delete<User>(this.baseUrl+"/delete/"+user.id, httpOptions);
  }

}
