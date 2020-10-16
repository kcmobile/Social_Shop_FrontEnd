import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommService } from 'src/app/services/comm.service';
import { HttpcommonService } from 'src/app/services/httpcommon.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  changepassForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private router: Router, private httpCommonService: HttpcommonService, private commService: CommService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.changepassForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required
      ])
    ],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.changepassForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.changepassForm.invalid) {
      return;
    }
    let req = this.changepassForm.value;
    const url = ""
    this.httpCommonService.postCall(url, req).subscribe(res => {
      this.toastr.success(res.message);
      this.router.navigate(['login']);
    },
      error => {
        var message = '';
        if (typeof error == 'string') {
          message = error;
        } else if (error.error != undefined && error.error.message != undefined) {
          message = error.error.message;
        }
        this.toastr.error(message);

      }
    )
  }  
}
