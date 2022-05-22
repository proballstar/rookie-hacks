/* eslint-disable no-useless-constructor */
import { Component, OnInit } from '@angular/core';
import { ServicesAuthService } from '../shared/services-auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  constructor (
    public auth: ServicesAuthService
  ) { }
}
