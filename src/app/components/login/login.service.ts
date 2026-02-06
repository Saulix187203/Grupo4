import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from 'src/app/interfaces/loginDto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  doLogin (input: Login): Observable<Boolean> {
    return of(true);
  }

}
