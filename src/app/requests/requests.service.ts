import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  _url_user = "/users/rest/user/?format=json";
  _url__post_metricas_guardar = "/users/rest/metricas/";
  _url_post_fingerprint = '/users/rest/fingerprint/?format=json';
  constructor(private http:HttpClient) { }

  getUsers(url:any = undefined){
    let header = new HttpHeaders()
      .set('Type-content','aplication/json')
      .set('Access-Control-Allow-Origin' ,'*')
      //.set('Access-Control-Allow-Headers', '*');
    if(url===undefined)
      return this.http.get(this._url_user,{headers:header});
    else
    return this.http.get(url,{headers:header});
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
  posMetricas(id: string, image_file:File){
    let header = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'multipart/form-data')
      .set('Access-Control-Allow-Origin' ,'*');
    let formData: FormData = new FormData();
    console.log(image_file);
    formData.append('user', id);
    formData.append('imagen', image_file, image_file.name);
    return this.http.post(this._url__post_metricas_guardar, formData);
  }
}
