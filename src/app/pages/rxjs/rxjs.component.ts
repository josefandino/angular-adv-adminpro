import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { map, retry, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() {

    // this.retornObservable().pipe(
    //   retry(2)
    // ).subscribe({
    //   next: value => console.log('Subs: ', value),
    //   error: error => console.error('Error: ', error),
    //   complete: () => console.info('Completado')
    // });
    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(500)
      .pipe(
        take(10),
        map(valor => valor + 1),
        filter(valor => (valor % 2 === 0) ? true : false),
        // map(valor => {
        //   return `Valor: ${valor + 1}`;
        // })
      );
  }

  retornObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>(observer => {

      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          // i = 0;
          console.log('Entro en el error');
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });

    // return obs$;
  }
}
