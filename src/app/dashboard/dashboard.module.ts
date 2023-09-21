import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [DashboardContainerComponent, AddUserComponent, UserListComponent, HeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: DashboardContainerComponent },
    ]),
  ],
})
export class DashboardModule {}
