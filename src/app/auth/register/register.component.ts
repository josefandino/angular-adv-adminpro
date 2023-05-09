import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public contrasenasCoinciden = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
  }

  private construirFormulario(): void {
    this.registerForm = this._fb.group({
      nombre: new FormControl('Yolanda', [Validators.required, Validators.minLength(3)]),
      apellidos: new FormControl('Rivera Gonzales', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('yoli@yahoo.com', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      password2: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
      terminos: new FormControl(true, [Validators.requiredTrue])
    });

    this.registerForm.get('password').valueChanges.subscribe(() => {
      this.validarContrasena();
    });
    this.registerForm.get('password2').valueChanges.subscribe(() => {
      this.validarContrasena();
    });

  }

  validarContrasena(): boolean {
    const password = this.registerForm.get('password').value;
    const password2 = this.registerForm.get('password2').value;

    if (password === password2) {
      this.contrasenasCoinciden = false;
      this.registerForm.get('password2').setErrors(null);
      return true;
    } else {
      this.contrasenasCoinciden = true;
      this.registerForm.get('password2').setErrors({ noEsIgual: true });
      return false;
    }
  }


  validarCamporFormulario(): void {
    this.validarContrasena();
    this.registerForm.markAllAsTouched();
    this.camposRequeridos();

    if (this.registerForm.valid) {
      // Realizar acción si el formulario es válido
    }
  }

  grabarUsuario(): void {

    const validar = this.registerForm.valid;
    if (!validar) {
      this.camposRequeridos();
      return;
    }

    this._authService.grabarUsuario(this.registerForm.value).subscribe({
      next: (resp: any) => {

        console.log(resp);
        if (resp.codeResp === 201) {
          Swal.fire('Usuario creado', resp.msg, 'success');
          window.localStorage.removeItem('token');
          localStorage.setItem('token', resp.token);
        } else {
          Swal.fire('Error al crear el usuario, intente más tarde', resp.message, 'error');
          console.warn('Error al crear el usuario');
        }
      },
      error: (err: any) => {
        const errorEmail = err.error.msg;
        Swal.fire('Error', errorEmail, 'error');
      }
    })
  }

  camposRequeridos(): void {
    Swal.fire('Campos requeridos', 'Todos los campos son requeridos', 'info');
  }

  listaUsuarios(): void {
    this._authService.listaUsuarios().subscribe({
      next: (resp: any) => {
        console.log(resp);
        if (resp.codeResp === 200) {
          // swal.fire('Usuarios', resp.message, 'success');
          console.log('Usuarios');
        } else {
          // swal.fire('Usuarios', resp.message, 'success');
          console.warn('Error al listar los usuarios');
        }

      },
      error: (err: any) => {
        console.log(err);
        // swal.fire('Error', err.error.message, 'error');
      }
    })
  }


}
