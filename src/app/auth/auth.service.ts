import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { loginForm } from '../interfaces/login.interface';
import { RegisterForm as RegisterForm } from '../interfaces/register.interface';

import { environment } from 'src/environments/environment';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userGoogle: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _grabarUsuario: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _loginUsuario: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _loginGoogle: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _xToken: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private base_url: string = environment.base_url;

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) { }

  public setUserGoogle(val: any): void { this._userGoogle.next(val); }
  public getUserGoogle(): Observable<any> { return this._userGoogle.asObservable(); }

  get grabarUsuario$(): Observable<any> { return this._grabarUsuario.asObservable() }
  get loginUsuario$(): Observable<any> { return this._loginUsuario.asObservable() }
  get loginGoogle$(): Observable<any> { return this._loginGoogle.asObservable() }
  get xToken$(): Observable<any> { return this._xToken.asObservable() }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this._http.get(`${this.base_url}login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        this._xToken.next(resp.token);
      }),
      // map((resp: any) => resp.ok),
      map((resp: any) => true),
      catchError(() => of(false)));
  }


  grabarUsuario(usuario: RegisterForm): Observable<RegisterForm> {
    return this._http.post<RegisterForm>(`${this.base_url}usuarios`, usuario)
      .pipe(tap((usuario: any) => this._grabarUsuario.next(usuario)),
      );

  }

  listaUsuarios(): Observable<RegisterForm[]> {
    return this._http.get<RegisterForm[]>(`${this.base_url}usuarios`);
  }

  login(usuario: loginForm): Observable<loginForm> {
    return this._http.post<loginForm>(`${this.base_url}login`, usuario)
      .pipe(tap((usuario: any) => this._loginUsuario.next(usuario)));
  }

  loginGoogle(token: string): Observable<any> {
    return this._http.post<any>(`${this.base_url}login/google`, { token })
      .pipe(tap((token: any) => this._loginGoogle.next(token)));
  }

  logout() {

    const correo = localStorage.getItem('email');
    const isValid = localStorage.getItem('isValid');

    if (isValid === 'true') {
      google.accounts.id.revoke(correo, () => {
        google.accounts.id.disableAutoSelect();
        localStorage.removeItem('email');
      });      
    }

    localStorage.removeItem('token');
    localStorage.removeItem('isValid');
    this._router.navigateByUrl('/login');

  }
}
