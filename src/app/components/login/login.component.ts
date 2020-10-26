import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CommService } from 'src/app/services/comm.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(private fromBuilder: FormBuilder,private router: Router, private authService: LoginService, private toast: ToastrService, private commService: CommService) { }

  ngOnInit(): void {
    var data = this.commService.get();
    if (data) {
      this.redirectLogin(data);
    }
    this.loginForm = this.fromBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }
    let req = this.loginForm.value;
    this.authService.login(req).subscribe(res => {
      if (res.status == 200) {
        this.redirectLogin(res.data)
      } else {
        this.toast.success(res.message);
      }
    },
    error => {
      this.toast.error(error.error.message);
    }
    )
  }

  redirectLogin(data) {
    this.router.navigate(['/dashboard']);
  }

  forgotPassword() {
    this.router.navigate(['forget-password']);
  }

}
