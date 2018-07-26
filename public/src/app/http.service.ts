import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient) { }

  register(user){
    console.log('service', user)
    return this._http.post('/api/user', user);
  }
  login(user){
    console.log('service', user);
    return this._http.post('/api/login', user);
  }
  findUser(user){
    return this._http.get('/api/user',user);
  }
  findUserId(user){
    return this._http.get('/api/userid/'+user,user);
  }
  changePhoto(img){
    return this._http.post('/api/change_photo',img);
  }
  createBio(user){
    return this._http.post('/api/create_bio',user);
  }
  uploadVideo(video){
    return this._http.post('/api/video_upload', video);
  }
  findVideos(){
    return this._http.get('/api/videos/');
  }
  verify(id){
    return this._http.get('/api/verify/'+id);
  }
  deleteVid(id){
    return this._http.delete('/api/delete/'+id,id);
  }
  subscribeVid(vid){
    return this._http.post('/api/subscribe/'+vid, vid);
  }
  getSubInfo(user_id){
    return this._http.get('/api/sub_info/'+user_id);
  }
  verifySub(){
    return this._http.get('/api/sub_verify');
  }
  logout(){
    return this._http.delete('/api/logout');
  }
  unsubscribe(id){
    return this._http.put('/api/unsubscribe/'+id,id)
  }
}
