import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { CityHomeComponent } from './admin/city-home/city-home.component';
import { GenreHomeComponent } from './admin/genre-home/genre-home.component';
import { LanguageHomeComponent } from './admin/language-home/language-home.component';
import { MovieHomeComponent } from './admin/movie-home/movie-home.component';
import { ScheduleHomeComponent } from './admin/schedule-home/schedule-home.component';
import { TheaterHomeComponent } from './admin/theater-home/theater-home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SignupSuccessComponent } from './user/signup-success/signup-success.component';
import { UserHomeComponent } from './user/user-home/user-home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent, pathMatch: 'full'  },
  {
    path: 'admin',
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
        canActivate: [AuthGuardService],
      },
      { path: 'city', component: CityHomeComponent },
      { path: 'theater', component: TheaterHomeComponent },
      { path: 'genre', component: GenreHomeComponent },
      { path: 'language', component: LanguageHomeComponent },
      { path: 'movie', component: MovieHomeComponent },
      { path: 'schedule', component: ScheduleHomeComponent },
    ],
  },
  {
    path: 'user/home',
    component: UserHomeComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'signup-success', component: SignupSuccessComponent },
  // { path: '/about', component: AboutComponent, pathMatch: 'full'  },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
