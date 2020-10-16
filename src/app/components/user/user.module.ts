import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserRoutingModule } from './user-routing.module';
import { CommModule } from '../common/comm.module';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [UserListComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    UserRoutingModule, 
    CommModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    TabsModule.forRoot()
  ]
})
export class UserModule { }
