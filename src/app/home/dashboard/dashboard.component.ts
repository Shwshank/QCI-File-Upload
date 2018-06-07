import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/ProjectService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formData : any = new FormData();
  files : any;
  fileHistory : any = [];

  constructor(private projectService : ProjectService) {
    this.projectService.emitFileHistory.subscribe(res=>{
      this.fileHistory = res;
      console.log(res);
    })
  }

  ngOnInit() {
    this.projectService.fileHistoryFun();
  }

  openURL(url) {
    window.open(url,'_blank');
  }

  uploadFile($event){
      this.formData.delete('file');
      this.files = $event.target.files || $event.srcElement.files;
      let file = this.files[0];
      this.formData = new FormData();
      this.formData.append('file', file);
      this.projectService.uploadFile(this.formData);
  }

}
