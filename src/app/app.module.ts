import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { DisplayComponent } from './display/display.component';
import { ListingsComponent } from './listings/listings.component';
import { AuthenticatorComponent } from './authenticator/authenticator.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    DisplayComponent,
    ListingsComponent,
    AuthenticatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
