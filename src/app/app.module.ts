import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { CourseComponent } from './course/course.component'
import { DisplayComponent } from './display/display.component'
import { ListingsComponent } from './listings/listings.component'
import { AuthenticatorComponent } from './authenticator/authenticator.component'
import { RouterModule } from '@angular/router'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { environment } from '../environments/environment'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { provideStorage, getStorage } from '@angular/fire/storage'
import { SignInComponent } from './sign-in/sign-in.component'
import { SignUpComponent } from './sign-up/sign-up.component'
import { VerifyComponent } from './verify/verify.component'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { ServicesAuthService } from './shared/services-auth.service'
import { AngularFireModule } from '@angular/fire/compat'
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './safe.pipe'

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    DisplayComponent,
    ListingsComponent,
    AuthenticatorComponent,
    SignInComponent,
    SignUpComponent,
    VerifyComponent,
    NavbarComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'register', pathMatch: 'full' },
      { path: 'login', component: SignInComponent },
      { path: 'register', component: SignUpComponent },
      { path: 'listings', component: ListingsComponent, canActivate: [AuthGuard] },
      { path: 'listing/:id', component: DisplayComponent, canActivate: [AuthGuard] },
      { path: 'verify', component: VerifyComponent }
    ]),
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [ServicesAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
