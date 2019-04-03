import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <a routerLink='' ><h1>PokeRouter</h1></a>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'pokelist';
}
