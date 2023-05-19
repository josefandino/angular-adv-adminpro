import { Component, OnInit, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  private _auth = inject(AuthService);

  constructor(
    private _sidebarService: SidebarService
  ) {
    this.menuItems = _sidebarService.menu;
    // console.log(this.menuItems)
  }

  ngOnInit(): void { }

  logout(): void {
    return this._auth.logout();
  }

}
