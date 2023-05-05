import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent {

  constructor() {

    const obs$ = new Observable(observer => {
      let i = -1;
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });

    obs$.subscribe({
      next: value => console.log('Subs: ', value),
      error: error => console.error('Error: ', error),
      complete: () => console.info('Completado')
    });
  }
}
