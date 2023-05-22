import { Component, NgZone, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AuthService } from 'src/app/auth/auth.service';
import { SidebarService } from '../../services/sidebar.service';

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
    private _ngZone: NgZone,
    private _router: Router,
    private _sidebarService: SidebarService
  ) {
    this.menuItems = _sidebarService.menu;
    // console.log(this.menuItems)
  }

  ngOnInit(): any { }

  logout(): any {
    return this._auth.logout().subscribe((resp) => {

      localStorage.removeItem('nextRotationAttemptTs');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('isValid');
      this._ngZone.run(() => {
        this._router.navigateByUrl('/login');
      });
      window.location.reload();
    });
  }

}
