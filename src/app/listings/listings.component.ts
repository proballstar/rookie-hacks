/* eslint-disable no-useless-constructor */
import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {
  private getURL: string = 'https://rookiecourses.epiccodewizard2.repl.co/get_courses'
  public listings: any[] = []

  constructor (public http: HttpClient, public router: Router) { }

  async getHeroes (): Promise<any[]> {
    const promisedValues = await fetch(this.getURL)
    const json = await promisedValues.json()
    return json
  }

  async setUser (courseId: string) {
    const url = 'https://rookiecourses.epiccodewizard2.repl.co/set_user'
    const headers = new Headers({
      'Content-Type': 'application/json'
    })
    const raw = JSON.stringify({
      wallet_address: '0x9116895d9248E29B8bb400c09d550376f6Bb517a',
      course_id: courseId
    })
    await fetch(url, {
      method: 'POST',
      headers: headers,
      body: raw
    })

    this.router.navigate(['/listing/' + courseId])
  }

  async ngOnInit (): Promise<void> {
    this.listings = await this.getHeroes()
  }

  async navigate (path: string) {
    this.router.navigate([path])
  }
}
