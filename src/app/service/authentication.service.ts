import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class User {
  constructor(
    public status: string,
  ) { }

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  authenticate(username, password) {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.httpClient.get('http://localhost:8080/validateUser/'+username+'/'+password, { headers: headers, responseType: 'text' }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('password', password);
          sessionStorage.setItem('token', 'Bearer ' + userData);
          console.log(username)
          console.log(userData)
          return userData;
        }
      )

    );
  }

  authenticateAdmin(username, password) {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.httpClient.get('http://localhost:8080/validateAdmin/'+username+'/'+password, { headers: headers, responseType: 'text' }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('password', password);
          sessionStorage.setItem('token', 'Bearer ' + userData);
          console.log(username)
          //console.log(password)
          console.log(userData)
          return userData;  
        }
      )

    );
  }


  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('password')
    sessionStorage.removeItem('token')
  }
}