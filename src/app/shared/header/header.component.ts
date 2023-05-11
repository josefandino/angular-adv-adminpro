import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

declare const google: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void { }
  
  public logout(): void {
    this._authService.logout();
  }

}
