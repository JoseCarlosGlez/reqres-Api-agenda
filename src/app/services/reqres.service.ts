import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { responseData } from '../interfaces/reqres.interfaces';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ReqresService {

  constructor(private http: HttpClient) { }

  public UrlGeneral: string = "https://reqres.in/api/"


  public PostLogin(user: { email: string, password: string }) {

    let url = `${this.UrlGeneral}login`

    return this.http.post(url, user)

  }



  public GetUsers() {
    let url = `${this.UrlGeneral}users`

    let params = new HttpParams()
      .set('per_page', '12')



    return this.http.get<responseData>(url,{params}).pipe(
      map((response)=>response.data)
    )
  }




  public createUser(NewUser){
    let url=`${this.UrlGeneral}users`


    return this.http.post(url,NewUser)

  }




  public updateUser(id,userUpdate){
    let url=`${this.UrlGeneral}users/${id}`
    
    return this.http.put(url,userUpdate)
    
  }
  
  
  
  public deleteUser(id){
    let url=`${this.UrlGeneral}users/${id}`
    return this.http.delete(url)
    
  }







}
