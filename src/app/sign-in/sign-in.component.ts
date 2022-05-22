import { Component } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { ServicesAuthService } from '../shared/services-auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    public auth: ServicesAuthService,
    public router: Router
  ) {}

  signInInfo = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  formSubmit () {
    this.auth.signIn(this.signInInfo.get('email')?.value, this.signInInfo.get('password')?.value)
    this.router.navigate(['/listings'])
  }
}
