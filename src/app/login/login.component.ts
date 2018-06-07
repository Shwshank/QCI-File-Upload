import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/ProjectService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email : any;
  password : any;

  constructor( private projectservice : ProjectService, private router: Router) {
    this.projectservice.emitUserLogin.subscribe((res)=>{
      this.router.navigate(['/']);
    })
  }

  ngOnInit() {
    this.projectservice.checkLogin();
  }

  login() {
    this.projectservice.login(this.email, this.password);
  }

}
