import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent {
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl('')
  })

  formSubmit () {
    console.log({
      email: this.profileForm.get('email')?.value,
      password: this.profileForm.get('password')?.value,
      name: this.profileForm.get('name')?.value
    })
  }
}
