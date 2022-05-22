import { ServicesAuthService } from './../shared/services-auth.service'
import { Component } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public authService: ServicesAuthService,
    public router: Router
  ) {}

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl('')
  })

  async formSubmit () {
    // console.table({
    //   email: this.profileForm.get('email')?.value,
    //   password: this.profileForm.get('password')?.value,
    //   name: this.profileForm.get('name')?.value
    // })
    console.log('Sign Up Page')
    this.authService.register(
      this.profileForm.get('email')?.value,
      this.profileForm.get('password')?.value,
      this.profileForm.get('name')?.value
    )
      .then(res => {
        this.router.navigate(['/listings'])
      })
  }

  async google () {
    await this.authService.googleAuth()
      .then(res => {
        this.router.navigate(['/listings'])
      })
  }
}
