import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'comprogramming-root',
  templateUrl: './comprogramming.component.html',
  styleUrls: ['./comprogramming.component.css']
})
export class ComprogrammingComponent {
  users:any;
  videos:any;
  webster:any;
  notSubscribed:boolean;
  user:any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    public sanitizer: DomSanitizer
  ){}

  ngOnInit(){
    this.users;
    this.findVideos();
    this.videos = [];
    this.sanitizer;
    this.webster;
    this.webster = {url:"",title:"", username:"", user_id:""}
    this.findUser();
  }
  findUser(){
    this._httpService.findUser(this.user) 
      .subscribe(data =>{
        if(data['errors']){
          console.log(data['errors'])
          this._router.navigate(['']);
        }
        else{
          this.user = data['user'];
          console.log(this.user, 'user')
        }
      })
  }
  getSanitizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  findVideos(){
    this._httpService.findVideos()
      .subscribe(data=>{
        this.users = data['users'];
        for(var i = 0; i < this.users.length; i++){
          for(var key of this.users[i].videos){
            if(key.category == "programming"){
              this.webster = {url: key.url, title: key.title, username: this.users[i].username, user_id: this.users[i]._id}
              this.videos.push(this.webster);
              this.webster = {url:"",title:"",username:"", user_id:""}
            }
            else{
            }
          }
        }
        console.log('videoss',this.videos)
      })
  }
  subscribeVid(vid){
    console.log('vid',vid)
    this._httpService.subscribeVid(vid)
      .subscribe(data=>{
        console.log('data',data['user'])
        
      })
  }
  logout(){
    this._httpService.logout()
    .subscribe(data=>{
      this._router.navigate(['']);
    })
  }
}
