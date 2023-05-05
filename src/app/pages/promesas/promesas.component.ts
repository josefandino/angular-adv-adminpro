import { Component } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
})
export class PromesasComponent {

  constructor() { }

  ngOnInit(): void {
    
    // const promesa = new Promise((resolve, reject) => {
    //   if (true) {
    //     resolve('Hola mundo');
    //   } else {
    //     reject('Algo salio mal');
    //   }
    // });

    // promesa.then((mensaje) => {
    //   console.log(mensaje);
    // }).catch((error) => {
    //   console.log('Algo salio mal en la Promesa', error);
    // });
    this.getUsuarios().then((usuarios) => {
      console.log(usuarios);
    });

  }
  // https://reqres.in/api/users

  // getUsuarios(): void {
  //   fetch('https://reqres.in/api/users')
  //     .then((resp) => resp.json())
  //     .then(({ data }) => {
  //       console.log(data);
  //     }).catch((error) => {
  //       console.log('Algo salio mal en la Promesa', error);
  //     });
  // }

  getUsuarios() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    });
  }
}
