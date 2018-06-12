import { Http, Response, Headers, RequestOptions,BaseRequestOptions, RequestMethod} from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class APIService {

  projectURL: string = 'http://192.168.15.187:8000';
  // projectURL: string = 'https://qcitech.org:8081';

  constructor( private http: Http, ) {}

  UploadFile(data) {
    return this.http.post(this.projectURL+'/uploadExcel', data).map(res=>res.json());
  }

  GetUploadHistory(data) {
    return this.http.get(this.projectURL+'/getUploadHistory').map(res=>res.json());
  }

}
