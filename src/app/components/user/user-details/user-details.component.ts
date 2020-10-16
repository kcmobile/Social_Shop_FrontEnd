import { Component, OnInit } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { HttpcommonService } from 'src/app/services/httpcommon.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  data: any = {};
  searchText: any;
  p: number = 1;
  disableSwitching: boolean;
  userId: string;
  activeTab: number = 0;
  tableData: Array<any> = [];
  users: Array<any> = [];
  indexValue: any;
  baseUrl: string

  //@ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  
  constructor(private commonService: HttpcommonService, private route: ActivatedRoute, private modalService: NgbModal, private toastr: ToastrService) { }

  tab(id) {
    this.data = [];
    this.activeTab = id;
    var url;
    if (this.activeTab == 0) {
      url = `user/orders/${this.userId}`;
    } if (this.activeTab == 1) {
      url = `user/addressBook/${this.userId}`;
    }
    this.getData(url);
  }

  beforeChange($e) {
    alert($e)
  }

  ngOnInit(): void {
    this.baseUrl = this.commonService.bucketUrl;
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      var url = `user/details/${this.userId}`;
      this.getData(url);
    }
  }

  getData(url) {
    this.commonService.getCall(url).subscribe(data => {
      if (data.status == 200) {
        this.data = data.data;
        this.tableData = this.activeTab == 1 ? this.data.addressBook :  this.data.orders;
      } else {
        this.data = [];
      }
    })
  }

  userStatus(id, index, status) {
    const url = `user/changeStatus/${id}`;
    this.commonService.getCall(url).subscribe(res => {
      if (res.status == 200) {
        this.users[index].active_status = !status
        this.toastr.success(res.message);
      }
      else {
        setTimeout(() => {
          this.changeData(index);
        }, 500);
        this.toastr.error(res.message);
      }
    }, error => {
      if (typeof error == 'string') {
        this.toastr.error(error);
      } else {
        setTimeout(() => {
          this.changeData(index);
        }, 500);
        this.toastr.error(error.error.message);
      }
    })
  }
  changeData(index) {
    this.users[index].active_status = status;
  }

  openUserDelete(content, index, data) {
    this.userId = data.id;
    this.indexValue = index;
    this.modalService.open(content, { centered: true });
  }

  delete() {
    const url = `user/delete`;
    this.commonService.deleteCall(url, this.userId).subscribe(data => {
      if (data.status == 200) {
        if (this.users[this.indexValue].id == this.userId) {
          this.users.splice(this.indexValue, 1);
        } else {
          this.users = this.commonService.findByIdAndDelete(this.users, this.userId);
        }
        this.toastr.success(data.message);
      } else {
        this.toastr.error(data.message);
      }
      this.modalService.dismissAll();
    }, error => {
      this.toastr.error(error);
      this.modalService.dismissAll();
    })

  }

}
