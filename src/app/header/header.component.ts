import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription = new Subscription();
  private userDataSub: Subscription = new Subscription();
  isAuthenticated = false;
  onLogin = true;
  isUserAvailable = false;
  user: User;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe({
      next: (user) => {
        this.isAuthenticated = !!user;
        if(user){
          this.isAdmin = user.roles === "[ROLE_ADMIN]" ? true : false;
        }
        
      },
    });

    this.userDataSub = this.userService.fetchedUser.subscribe({
      next : (user) => {
        if(user){
          this.user = user;
        console.log(this.user);
        this.isUserAvailable = true;
        }
        
      },
    });
  }
  

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.userDataSub.unsubscribe();
  }

  onSignup() {
    this.onLogin = !this.onLogin;
  }

  onlogin() {
    this.onLogin = !this.onLogin;
  }

  onLogout() {
    this.authService.logout();
  }
}
