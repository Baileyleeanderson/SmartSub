import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'category-root',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  comp: boolean;
  music: boolean;
  video: boolean;
  design: boolean;
  user:any;
  compcss: string;
  musiccss: string;
  videocss: string;
  designcss: string;
  c_one: boolean;
  c_two: boolean;
  c_three: boolean;
  m_one: boolean;
  m_two: boolean;
  m_three: boolean;
  v_one: boolean;
  v_two: boolean;
  v_three: boolean;
  d_one: boolean;
  d_two: boolean;
  d_three: boolean;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
    this.comp= true;
    this.music= false;
    this.video = false;
    this.design = false;
    this.user;
    this.findUser();
    this.compcss = "comp";
    this.musiccss = "music";
    this.videocss = "video";
    this.designcss = "design";
    this.c_one = false;
    this.c_two = false;
    this.c_three = false;
    this.m_one = false;
    this.m_two = false;
    this.m_three = false;
    this.v_one = false;
    this.v_two = false;
    this.v_three = false;
    this.d_one = false;
    this.d_two = false;
    this.d_three = false;
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
  compShow(){
    this.comp = true;
    this.music= false;
    this.video = false;
    this.design = false;
    this.compcss = "comp2"
  }
  compLeave(){
    this.compcss = "comp"
  }
  musicShow(){
    this.music = true;
    this.comp= false;
    this.video = false;
    this.design = false;
    this.musiccss = "music2"
  }
  musicLeave(){
    this.musiccss = "music"
  }
  videoShow(){
    this.video = true;
    this.music = false;
    this.comp= false;
    this.design = false;
    this.videocss = "video2";
  }
  videoLeave(){
    this.videocss = "video";
  }
  designShow(){
    this.design = true;
    this.comp= false;
    this.music= false;
    this.video = false;
    this.designcss = "design2";
  }
  designLeave(){
    this.designcss = "design";
  }
  comp_one(){
    this.c_one = true;
  }
  comp_oneLeave(){
    this.c_one = false;
  }
  comp_two(){
    this.c_two = true;
  }
  comp_twoLeave(){
    this.c_two = false;
  }
  comp_three(){
    this.c_three = true;
  }
  comp_threeLeave(){
    this.c_three = false;
  }
  music_one(){
    this.m_one = true;
  }
  music_oneLeave(){
    this.m_one = false;
  }
  music_two(){
    this.m_two = true;
  }
  music_twoLeave(){
    this.m_two = false;
  }
  music_three(){
    this.m_three = true;
  }
  music_threeLeave(){
    this.m_three = false;
  }
  video_one(){
    this.v_one = true;
  }
  video_oneLeave(){
    this.v_one = false;
  }
  video_two(){
    this.v_two = true;
  }
  video_twoLeave(){
    this.v_two = false;
  }
  video_three(){
    this.v_three = true;
  }
  video_threeLeave(){
    this.v_three = false;
  }
  design_one(){
    this.d_one = true;
  }
  design_oneLeave(){
    this.d_one = false;
  }
  design_two(){
    this.d_two = true;
  }
  design_twoLeave(){
    this.d_two = false;
  }
  design_three(){
    this.d_three = true;
  }
  design_threeLeave(){
    this.d_three = false;
  }
  logout(){
    this._httpService.logout()
    .subscribe(data=>{
      this._router.navigate(['']);
    })
  }
}
