import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HtmlParser } from '@angular/compiler';
import { HttpService } from './http.service';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ComprogrammingComponent } from './comprogramming/comprogramming.component';
import { MypageComponent } from './mypage/mypage.component';
import { MusicComponent } from './music/music.component';
import { FilmComponent } from './film/film.component';
import { DesignComponent } from './design/design.component';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    HomeComponent,
    CategoryComponent,
    ComprogrammingComponent,
    MypageComponent,
    MusicComponent,
    FilmComponent,
    DesignComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
