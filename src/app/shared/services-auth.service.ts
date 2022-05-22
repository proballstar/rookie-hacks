import { Injectable, NgZone } from '@angular/core'
import { User } from './services-user'
import * as auth from 'firebase/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ServicesAuthService {
  userData: any;

  constructor (
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user
        localStorage.setItem('user', JSON.stringify(this.userData))
      } else {
        localStorage.setItem('user', 'null')
      }
    })
  }

  signIn (email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(['listings'])
        })
        this.setUserData(result.user)
      })
      .catch(err => window.alert(err.message))
  }

  register (email: string, password: string, name: string) {
    console.table({
      email,
      password
    })
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result)
        this.setUserData({ ...result.user!, name })
        this.sendVerification()
      })
      .catch(err => {
        console.log(err.message)
        window.alert(err.message)
      })
  }

  sendVerification () {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => this.router.navigate(['verify']))
  }

  get isLoggedIn (): boolean {
    const user = JSON.parse(localStorage.getItem('user')!)
    return !!(((user !== null) && (user.emailVerified !== false)))
  }

  async googleAuth () {
    return this.authLogin(new auth.GoogleAuthProvider())
      .then(async (res: any) => {
        if (res) {
          const user = await this.afAuth.currentUser
          this.setUserData({ ...user })
          this.router.navigate(['dashboard'])
        }
      })
  }

  authLogin (provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard'])
        })
        this.setUserData(res.user)
      })
      .catch(window.alert)
  }

  setUserData (user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    )
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  signOut () {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user')
      this.router.navigate(['sign-in'])
    })
  }
}
