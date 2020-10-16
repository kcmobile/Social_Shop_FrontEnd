import { Component, OnInit } from '@angular/core';
import { HttpcommonService } from 'src/app/services/httpcommon.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  facebookUser: number = 0;
  twitterUser: number = 0;
  appleUser: number = 0;
  totalUsers: number = 0;
  activeUsers: number=0;
  emailUser: number= 0;
  gmailUser: number = 0;
  data:any;
  constructor(private commonService: HttpcommonService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const url = "dashboard";
    this.commonService.getCall(url).subscribe(data => {
      if (data.status == 200) {
        this.data = data.data;
        this.facebookUser= this.data.facebookUser;
        this.twitterUser= this.data.twitterUser;
        this.appleUser= this.data.appleUser;
        this.totalUsers= this.data.totalUsers;
        this.activeUsers= this.data.activeUsers;
        this.gmailUser= this.data.gmailUser;
        this.emailUser = this.data.emailUser
      }
    }, error => {
     this.commonService.errorShow(error);
    })
  }

}
