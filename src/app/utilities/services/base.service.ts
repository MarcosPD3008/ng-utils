/**
 * Base service class for CRUD operations.
 * @template T - The type of the model.
 * 
 * @param controller - The controller name for the API.
 * 
 * Note: BaseUrl should be set in environment.ts file or any variables sources.
 */
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends BaseModel> {
  public baseUrl:string = "";

  constructor(@Inject("controller") controller:string,
              private http:HttpClient) {
    this.baseUrl = `${this.baseUrl}/${controller}`;
  }

  get(pageNumber:number = 1, pageSize:number = 10):Observable<T[]>{
    let params = new HttpParams().set('pageNumber', pageNumber.toString())
                                 .set('pageSize', pageSize.toString());

    return this.http.get<T[]>(`${this.baseUrl}/GetAll`, { params: params });
  }

  getById(id:string):Observable<T>{
    return this.http.get<T>(`${this.baseUrl}/${id}`)
  }

  post(model:T):Observable<T>{
    return this.http.post<T>(`${this.baseUrl}`, model);
  }

  put(model:T){
    return this.http.put<T>(`${this.baseUrl}/${model.id}`, model);
  }

  delete(id:string){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

/*
  * Base model interface for all models.
  * This shoud be in models folder.
*/
export interface BaseModel {
  id:string | number;
}