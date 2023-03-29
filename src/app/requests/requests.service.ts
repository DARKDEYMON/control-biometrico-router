import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  _url_user = "/users/rest/user/?format=json";
  _url_post_fingerprint = '/users/rest/fingerprint/?format=json';
  constructor(private http:HttpClient) { }

  getUsers(){
    let header = new HttpHeaders()
      .set('Type-content','aplication/json')
      .set('Access-Control-Allow-Origin' ,'*')
      //.set('Access-Control-Allow-Headers', '*');

    return this.http.get(this._url_user,{headers:header});
  }
  posFingerPrint(image_file:File){
    let header = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'multipart/form-data')
      .set('Access-Control-Allow-Origin' ,'*');
    let formData: FormData = new FormData();
    console.log(image_file);
    formData.append('image', image_file, image_file.name);
    return this.http.post(this._url_post_fingerprint,formData);
  }
}
