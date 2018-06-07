import { EventEmitter, Injectable, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from './APIService';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {

  fileHistory : any = [];

  emitProjectData = new EventEmitter<any>();
  emitUserLogin = new EventEmitter<any>();
  emitFileUploadMsg = new EventEmitter<any>();
  emitFileHistory = new EventEmitter<any>();

  constructor(private router: Router, private apiService: APIService ) {
    this.fileHistory = [
      {url:'https://s3.ap-south-1.amazonaws.com/qci-collect/responses/dbd5f473d1334369ab2f284df0920f6e/15282839648402214/15282880974691436/1528-15282839648403188.pdf', time: '5:33 PM, 7th April, 2018'},
      {url:'https://s3.ap-south-1.amazonaws.com/qci-collect/responses/dbd5f473d1334369ab2f284df0920f6e/15282839648402214/15282880974691436/1528-15282839648403188.pdf', time: '1:20 PM, 4th April, 2018'},
    ]
  }

  cid() {
    let d = new Date();
    let cid = d.getTime() +""+ Math.floor(1000 + Math.random() * 8999);
    return cid;
  }

  cdate() {
    let d = new Date();
    let cdate = d.getDate()+"/"+ (d.getMonth()+1)+ "/"+d.getFullYear()+" "+d.getHours();
    let min  = d.getMinutes();
    let min2 = "";
    if(min<10) {
      min2 = "0"+min;
    } else{
      min2 = ""+min;
    }
    cdate += ":"+min2;
    return cdate;
  }

  login(email, password) {

    if(email === 'test@test.com' && password === '1234' ) {
        localStorage.setItem('token','true');
        this.emitUserLogin.emit({success: 'true'});
      } else {
        window.location.reload(true);
        alert('Invaild login!');
      }
  }

  checkLogin() {
    if(localStorage.getItem('token')) {
      this.router.navigate(['./']);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['./login']);
    window.location.reload(true);
  }

  uploadFile(data) {
    this.apiService.UploadFile(data).subscribe(res=>{
      if(res.success) {

        alert(res.msg);
        window.location.reload();

      } else { alert(res.msg); }
    }, err=>{
      alert('Error!');
    })
  }

  fileHistoryFun() {
    this.emitFileHistory.emit(this.fileHistory);
  }

}
