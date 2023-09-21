import { Component, OnInit } from '@angular/core';
import { LIST_USER } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],
})
export class DashboardContainerComponent implements OnInit {
  isUserDialog: boolean = false;
  usersList!: LIST_USER[] | any;
  mode: 'CREATE' | 'EDIT' = 'CREATE';

  selectedUser!: LIST_USER | undefined;
  constructor(private auth: AuthService) {
    this.getUsersList();
  }

  ngOnInit(): void {}

  closeDialog() {
    this.isUserDialog = false;
    this.mode = 'CREATE';
    this.selectedUser = undefined;
  }

  addNewUser(event: LIST_USER) {
    event.id = this.auth.generateString(15);
    this.usersList.unshift(event);
    this.setUsersList();
  }

  updateUser(user: LIST_USER) {
    const index = this.usersList.findIndex(
      (el: LIST_USER) => el?.id === user?.id
    );
    if (index !== -1) {
      this.usersList[index] = user;
      this.setUsersList();
    }
  }

  deleteUser(user: LIST_USER) {
    this.usersList = this.usersList.filter(
      (el: LIST_USER) =>
        !(el?.firstName === user?.firstName && el?.lastName === user?.lastName)
    );
    this.setUsersList();
  }

  editUser(user: LIST_USER) {
    this.mode = 'EDIT';
    this.selectedUser = user;
    this.isUserDialog = true;
  }

  getUsersList() {
    this.usersList = JSON.parse(localStorage.getItem('users') ?? '[]');
  }

  setUsersList() {
    localStorage.setItem('users', JSON.stringify(this.usersList));
  }
}
