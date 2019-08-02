import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { EdiStudentComponent } from './editor/edit-student.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CreateStudentComponent } from './editor/create-student.component';
import { GuidValidator } from './editor/guid.validator';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    EdiStudentComponent,
    ErrorPageComponent,
    CreateStudentComponent,
    GuidValidator
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, children: [] },
      { path: 'edit/:id', component: EdiStudentComponent },
      { path: 'create', component: CreateStudentComponent },
      { path: 'errorpage', component: ErrorPageComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
