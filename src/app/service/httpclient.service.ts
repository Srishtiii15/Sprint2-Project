import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Emp } from '../service/employee';
import { Department } from '../add-employee/Department';
import { Observable } from 'rxjs';
export class Employee {

  private baseUrl = 'http://localhost:8080/employee';  

  constructor(
    public userId: number,
    public name: string,
    public designation: string,
    public department:Department
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  [x: string]: any;
  //[x: string]: any;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  addEmployee(body: Emp) {
    let token = sessionStorage.getItem('token')

    const headers = new HttpHeaders({ Authorization: token, 'Content-Type': 'application/json' });
    return this.httpClient.post('http://localhost:8080/employee/insert', body, { headers: headers, responseType: 'text' }).pipe(
      map(userData => {
        console.log(userData)
        return userData;
      })
    );
  }


  /*deleteEmp(userId:number):Observable<any>{
    console.log("token");
    //return this.http.delete(`${this.baseUrl}/employee/student/${userId}`, { responseType: 'text' }); 
   const headers = new HttpHeaders({ Authorization:token, 'Content-Type': 'application/json' });
    return this.httpClient.delete<void>('http://localhost:8080/employee/delete/{userId}');
  }*/


  public deleteEmployee(userId:number):Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${userId}`, { responseType: 'text' });
  }

  getEmployees()
  {
    console.log("token");
    return this.httpClient.get<Employee[]>('http://localhost:8080/getAllEmployee/all');
  }


  
}
