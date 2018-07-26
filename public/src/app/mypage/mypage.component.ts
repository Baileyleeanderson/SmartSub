import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'mypage-root',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css'],
  
})
export class MypageComponent {
  user:any;
  picForm: boolean;
  img:any;
  notBio: boolean;
  bio:any;
  bioTrue: boolean;
  video:any;
  test:string;
  url:string;
  showBio:boolean;
  biotext:boolean;
  biotextEdit:boolean;
  vidUpload:boolean;
  picbttn:boolean;
  notsubbed:boolean;
  notuser:boolean;
  allsubs:any;
  imgcolor:string;
  check_user_subs:any;
  userIsSubscribed:boolean;
  hover:boolean;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    public sanitizer: DomSanitizer
  ){}

  ngOnInit(){
    this.user;
    this.picForm = false;
    this.img = {img:""};
    this.notBio = true;
    this.bio = {bio: ""};
    this.bioTrue = false;
    this.video = {title:"", desc:"", category:"", url:""};
    this.sanitizer;
    this.showBio = false;
    this.biotext = false;
    this.biotextEdit = false;
    this.vidUpload = true;
    this.imgcolor = "subclick";
    this.allsubs = [];
    this.hover = false;
    this._route.params.subscribe(params =>{
      this.user = params;
      this.findUserId()
      console.log('id',this.user.id)
      this.verify();
      this.findBio();
      })
  }

  getSanitizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  verify(){
    this._httpService.verify(this.user.id)
      .subscribe(data=>{
        if(data['user']){
          console.log('not users page')
          this.picForm = false;
          this.picbttn = false;
          this.biotextEdit = false;
          this.showBio = false;
          this.vidUpload = false;
          this.notsubbed = true;
          this.notuser = true;
          this.user = data['user'];
          console.log('verify',this.user = data['user']);
          this.verifySub(this.user._id);
          return;
        }
        else{
          this.biotextEdit = true;
          this.picbttn = true;
          this.notuser = false;
          console.log('success',data['success'])
          return;
        }
      })
  }
  findUserId(){
    console.log('finding user')
    this._httpService.findUserId(this.user.id) 
      .subscribe(data =>{
        if(data['errors']){
          console.log(data['errors'])
          this._router.navigate(['']);
          return
        }
        else{
          this.user = data['user'];
          console.log(this.user, 'user')
          this.findBio();
          this.findSubs();
          this.allsubs = [];
          
        }
    })
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
          this.findBio();
          this.findSubs();
          this.allsubs = [];
          console.log(this.user, 'user')
        }
      })
  }
  findSubs(){
    for(var i in this.user.subscribed_to){
      this._httpService.getSubInfo(this.user.subscribed_to[i].user_id)
        .subscribe(data=>{
          console.log('userdata', data['user'])
              this.allsubs.push(data['user'])
        })
    }
    console.log('allsubs array',this.allsubs)
  }
  showPicForm(){
    this.picForm = true;
    this.picbttn = false;
  }
  changePhoto(){
    console.log('photo')
    this._httpService.changePhoto(this.img)
      .subscribe(data=>{
        this.picForm = false;
        this.picbttn = true;
      })
    this.findUser();
  }
  findBio(){
    if(this.user.bio != ""){
      this.notBio = false;
      this.bioTrue = true;
      this.biotext = true;
      this.biotextEdit = true;
    }
    else{
      this.notBio = true;
      this.bioTrue = false;
      this.biotext = false;
      this.biotextEdit = false;
      
    }
  }
  createBio(){
    this._httpService.createBio(this.bio)
      .subscribe(data=>{
        console.log("made it", data)
        this.showBio = false;
        this.biotext = true;
        this.biotextEdit = true;
      })
      this.findUser();
  }
  uploadVideo(){
    console.log('upload video')
    this._httpService.uploadVideo(this.video)
      .subscribe(data=>{
        console.log('uploaded', data)
        this.video = {title:"", desc:"", category:"", url:""}; 
      })
      this.findUser();
  }
  showEditBio(){
    this.showBio = true;
    this.biotext = false;
    this.biotextEdit = false;
    this.bio = {bio:this.user.bio};
  }
  deleteVid(id){
    console.log('delete', id)
    this._httpService.deleteVid(id)
      .subscribe(data=>{
        console.log('deleted');
        this.user = data['user'];
        this.picbttn = true;
      })
      this.findUser();
  }
  subscribeVid(vid){
    console.log('vid',vid)
    this._httpService.subscribeVid(vid)
      .subscribe(data=>{
        console.log('data',data['user'])
      })
  }
  verifySub(user){
    console.log('verifying sub',user)
    this._httpService.verifySub()
      .subscribe(data=>{
        console.log('made it back', data)
        this.check_user_subs = data['user']
        console.log('check_user',this.check_user_subs.subscribed_to)
        console.log("pageuser id",user)
        for(var i = 0; i < this.check_user_subs.subscribed_to.length; i++){
          if(user == this.check_user_subs.subscribed_to[i].user_id){
            this.notsubbed = false;
            this.userIsSubscribed = true;
            this._router.navigate(['/user', user])
            return;
          }
          else{
            this.notsubbed = true;
            this.userIsSubscribed = false;
          }
        }
      })
  }
  changecolor(){
    this.imgcolor = "subclick2";
    this.hover = true;
  }
  changecolor2(){
    this.imgcolor = "subclick";
    this.hover = false;
  }
  hidePic(){
    this.notsubbed = false;
    this.userIsSubscribed = true;
    this.hover = false;
  }
  logout(){
    this._httpService.logout()
    .subscribe(data=>{
      this._router.navigate(['']);
    })
  }
  unsubscribe(id){
    this._httpService.unsubscribe(id)
      .subscribe(data=>{
        this.findUser();
      })
  }
}
