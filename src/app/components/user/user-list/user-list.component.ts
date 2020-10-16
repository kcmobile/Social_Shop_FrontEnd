import { Component, OnInit } from '@angular/core';
import { CommService } from 'src/app/services/comm.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpcommonService } from 'src/app/services/httpcommon.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userId: any;
  users: Array<any> = [];
  indexValue: any;
  searchText: any;

  constructor(private commonService: HttpcommonService, private modalService: NgbModal, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.userList();
  }

  userList() {
    const url = "user/list";
    this.commonService.getCall(url).subscribe(res => {
      if (res.status == 200) {
        this.users = res.data;
      }
    }, error => { })
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

  details(id) {
    this.router.navigate([`user/detail/${id}`])
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

  p: number = 1;
  collection: any[] = this.users;

}
