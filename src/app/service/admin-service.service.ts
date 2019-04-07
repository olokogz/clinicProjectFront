import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";

import {ApiResponse} from "../model/api.response"
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http:HttpClient) { }



  baseUrl: string = "http://localhost:8080/admin";

  getUsers():Observable<ApiResponse>
  {
    console.log(this.http.get<ApiResponse>(this.baseUrl+"/findAll"))
    return this.http.get<ApiResponse>(this.baseUrl+"/findAll");
  }


}
