import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { RegisterI as RegisterForm } from '../interfaces/register.interface';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _grabarUsuario: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private base_url: string = environment.base_url;

  constructor(
    private _http: HttpClient,
  ) { }

  get grabarUsuario$(): Observable<any> { return this._grabarUsuario.asObservable() }

  grabarUsuario(usuario: RegisterForm): Observable<RegisterForm> {
    return this._http.post<RegisterForm>(`${this.base_url}usuarios`, usuario)
      .pipe(tap((usuario: any) => this._grabarUsuario.next(usuario)),
        // catchError((error: any) => {
        //   console.log(error);
        //   let errorMsg: string;
        //   switch (error.status) {
        //     case 0: { errorMsg = `Hable con el Equipo de Soporte: ${error.message}`; break; }
        //     case 400: { errorMsg = `Bad Reques: ${error.message}`; break; }
        //     case 401: { errorMsg = `Access Denied: ${error.message}`; break; }
        //     case 403: { errorMsg = `Access Denied: ${error.message}`; break; }
        //     case 404: { errorMsg = `Not Found: ${error.message}`; break; }
        //     case 500: { errorMsg = `Internal Server Error: ${error.message}`; break; }
        //     default: { errorMsg = `Unknown Server Error: ${error.message}`; break; }
        //   }
        //   return throwError(errorMsg);
        // }
        // )
      );

  }

  listaUsuarios(): Observable<RegisterForm[]> {
    return this._http.get<RegisterForm[]>(`${this.base_url}usuarios`);
  }
}
