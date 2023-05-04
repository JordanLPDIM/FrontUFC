import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';





@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }
  
 get() : Observable<Category[]>{
   return this.http.get<Category[]>(environment.iutApiBaseUrl+"/categories");
 }

}