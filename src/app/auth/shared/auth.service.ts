import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../../admin/signup/singup-request.payload';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { RefreshTokenPayload } from './refresh-token.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload: RefreshTokenPayload;
  checkRole: boolean = false;

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService) {
    this.refreshTokenPayload = {
      username: '',
      refreshToken: ''
    };
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/admin/signup', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
      loginRequestPayload).pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        this.loggedIn.emit(true);
        this.username.emit(data.username);
        return true;
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      this.getRefreshTokenPayload())
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  logout() {
    this.httpClient.post('http://localhost:8080/api/auth/logout', this.getRefreshTokenPayload(),
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      }, () => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('username');
        this.localStorage.clear('refreshToken');
        this.localStorage.clear('expiresAt');
      })
  }

  getRefreshTokenPayload() {
    this.refreshTokenPayload.username = this.getUserName();
    this.refreshTokenPayload.refreshToken = this.getRefreshToken();
    return this.refreshTokenPayload;
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  checkAuthorities(role: string): Observable<boolean> {
    return this.httpClient.get<boolean>('http://localhost:8080/api/auth/role/' + this.getUserName() + '/' + role)
  }
}
