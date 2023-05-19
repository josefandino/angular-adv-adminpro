import { Component, HostListener } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  /*
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    // const scrollValue = window.scrollY;
    const scrollValue = Math.round(window.scrollY);
    console.log('Valor del scroll:', scrollValue);
  }
*/
  
  public labels1: string[] = ['Pan', 'Refresco', 'Tacos'];
  public data1 = [
    [10, 15, 40],
  ];

  total: number = 0;

}
