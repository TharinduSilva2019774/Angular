import { Component } from '@angular/core';
import { Router,Event,NavigationStart,NavigationEnd,NavigationError,NavigationCancel, RouterEvent } from '@angular/router';
import {slideInAnimation} from './app.animation'
import { AuthService } from './user/auth.service';
import {MessageService} from './messages/message.service'

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management'
  loading=false;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMassageDisplayed():boolean{
    return this.massageService.isDisplayed;
  }

  constructor(private authService: AuthService,
    private massageService:MessageService,
    private router: Router) {
router.events.subscribe((routerEvent: Event) => {
this.checkRouterEvent(routerEvent);
});
}

checkRouterEvent(routerEvent: Event): void {
if (routerEvent instanceof NavigationStart) {
this.loading = true;
}

if (routerEvent instanceof NavigationEnd ||
routerEvent instanceof NavigationCancel ||
routerEvent instanceof NavigationError) {
this.loading = false;
}
}
displayMassages():void{
  this.router.navigate([{outlets:{popup :['massages']}}]);
  this.massageService.isDisplayed=true;
}

hideMassage():void{
  this.router.navigate([{outlets:{popup:null}}]);
  this.massageService.isDisplayed=false;
}
  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl("/welcome")
  }
}
