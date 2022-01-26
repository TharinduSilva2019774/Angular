import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthGuard} from './user/auth.guard';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SelectiveStrategy } from './selective-strategy.service';
import { AboutUsComponent } from './about-us/about-us.component'

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path:'products',canLoad:[AuthGuard],data:{preload:true},loadChildren:()=> import('./products/product.module').then(n=>n.ProductModule)},
      { path: 'aboutUs', component: AboutUsComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ],{preloadingStrategy:SelectiveStrategy})
  ] ,
  exports: [RouterModule]
})
export class AppRoutingModule { }
