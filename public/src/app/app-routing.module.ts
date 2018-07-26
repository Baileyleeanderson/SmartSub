import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ComprogrammingComponent } from './comprogramming/comprogramming.component';
import { MypageComponent } from './mypage/mypage.component';
import { MusicComponent } from './music/music.component';
import { FilmComponent } from './film/film.component';
import { DesignComponent } from './design/design.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'categories', component: CategoryComponent},
  { path: 'computer_programming', component: ComprogrammingComponent},
  { path: 'music', component: MusicComponent},
  { path: 'film', component: FilmComponent},
  { path: 'design', component: DesignComponent},
  { path: 'user/:id', component: MypageComponent },
  // { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '**', component:  PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
