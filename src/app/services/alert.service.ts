import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) { }

  stayTime = {
    timeOut: 3000
  };

  success(message: string) {
    this.toastr.success(message, 'Success!', this.stayTime);
  }

  error(message: string) {
    this.toastr.error(message, 'Error!', this.stayTime);
  }

  info(message: string) {
    this.toastr.info(message, 'Info!', this.stayTime);
  }

  warning(message: string) {
    this.toastr.warning(message, 'Warning!', this.stayTime);
  }
}
