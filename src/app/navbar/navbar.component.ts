/* eslint-disable no-useless-constructor */
import { Component, Input } from '@angular/core'
import { ServicesAuthService } from '../shared/services-auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor (
    public auth: ServicesAuthService,
    public router: Router
  ) { }

  @Input('logged') logged!: boolean;

  async logOut () {
    await this.auth.signOut()
    await this.listings()
  }

  async register () {
    await this.router.navigate(['/register'])
  }

  async login () {
    await this.router.navigate(['/login'])
  }

  async listings () {
    await this.router.navigate(['/listings'])
  }
}
