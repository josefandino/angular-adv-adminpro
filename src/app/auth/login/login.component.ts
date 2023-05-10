import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { AuthService } from '../auth.service';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  public loginForm: FormGroup;
  isrecoverPassword: boolean = false;
  
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  auth2: any;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(): void {
    google.accounts.id.initialize({
      client_id: "",
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );

    // google.accounts.id.prompt(); // also display the One Tap dialog
  }

  private construirFormulario(): void {
    this.loginForm = this._fb.group({
      email: new FormControl( localStorage.getItem('email' || ''), [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      remenber: new FormControl()
    });

  }

  handleCredentialResponse(response: any): void {

    this._authService.loginGoogle(response.credential).subscribe({
      next: (resp: any) => {
        console.log(resp);
        if (resp.codeResp === 200) {
          // window.localStorage.removeItem('token');
          localStorage.setItem('token', resp.token);
        }
        this._router.navigateByUrl('/');
        return Swal.fire('Login', 'Ingreso al sistema correctamente', 'success')
      },
      error: (err) => Swal.fire('Error', err.error.msg, 'error'),
    })
  }

  login() {

    const validar = this.loginForm.valid;
    if (!validar) {
      this.camposRequeridos();
      return;
    }

    this._authService.login(this.loginForm.value).subscribe({
      next: (resp: any) => {

        if (resp.codeResp === 200) {
          console.log(resp);      
          window.localStorage.removeItem('token');
          localStorage.setItem('token', resp.token);
          
          if(this.loginForm.get('remenber').value){
            localStorage.setItem('email', this.loginForm.get('email').value);
          } else {
            window.localStorage.removeItem('email');
          }
        }
        this._router.navigateByUrl('/');
        return Swal.fire('Login', 'Ingreso al sistema correctamente', 'success')
      },
      error: (err) => Swal.fire('Error', err.error.msg, 'error'),
    })
  }

  camposRequeridos(): void {
    Swal.fire('Campos requeridos', 'Todos los campos son requeridos', 'info');
  }

  recoverPassword() {
    this.isrecoverPassword = !this.isrecoverPassword;
  }

}
