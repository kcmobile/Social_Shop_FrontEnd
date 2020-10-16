import { Component, OnInit } from '@angular/core';
import { CommService } from 'src/app/services/comm.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  adminType: any;
  logo: any;
  constructor(private router: Router, private commService: CommService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.logo = ""
    var data = this.commService.get();
    if (data != undefined) {
      this.adminType = data.admin_type;
    }
    $(document).ready(function() {
      if (window.matchMedia('(max-width: 767px)').matches) {
        $('.sidebar nav .nav-item a').on('click', function(){
          $('body').removeClass('sidebar-open');
          $('body').addClass('sidebar-collapse');
        });

        $('.bar-icon').on('click', function(){
          $('body').addClass('sidebar-open');
          $('body').removeClass('sidebar-collapse');
        });
    }    
      
    });
  }

  closeDialog() {
    this.modalService.dismissAll();
  }

  conflogout(content) {
    this.modalService.open(content);
  }

  logout() {
    this.commService.logout();
    this.closeDialog();
    this.router.navigate(['/login']);
  }

}
