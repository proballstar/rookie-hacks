/* eslint-disable no-useless-constructor */
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ServicesAuthService } from '../shared/services-auth.service'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnChanges {
  public courseId!: string;
  public courseURL!: string;

  constructor (
    public route: ActivatedRoute,
    public auth: ServicesAuthService
  ) {}

  async grabCourse (uid: string, cid: string) {
    console.table({ uid, cid })
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const raw = JSON.stringify({
      wallet_address: '0x9116895d9248E29B8bb400c09d550376f6Bb517a',
      course_id: cid
    })

    console.log(raw)
    const ogData = await fetch('https://rookiecourses.epiccodewizard2.repl.co/get_one_course', {
      method: 'POST',
      headers: headers,
      body: raw
    })
    const contents = await ogData.text()
    return contents
  }

  async getCurrentUser (auth: ServicesAuthService): Promise<any> {
    const user = await auth.afAuth.currentUser
    this.courseURL = await this.grabCourse(user?.uid!, this.courseId)
  }

  async continueUser (forward: boolean) {
    const raw = JSON.stringify({
      wallet_address: '0x9116895d9248E29B8bb400c09d550376f6Bb517a',
      course_id: this.courseId,
      forward
    })
    const headers = new Headers({
      'Content-Type': 'application/json'
    })
    await fetch('https://rookiecourses.epiccodewizard2.repl.co/continue_user', {
      body: raw,
      method: 'POST',
      headers
    })
    window.location.reload()
  }

  ngOnInit (): void {
    this.route.params.subscribe(params => {
      // eslint-disable-next-line dot-notation
      this.courseId = params['id']
    })
    this.getCurrentUser(this.auth)
  }

  ngOnChanges (changes: SimpleChanges): void {
    //
  }
}
