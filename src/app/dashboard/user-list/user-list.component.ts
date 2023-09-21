import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LIST_USER } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() users: LIST_USER[] = [
    { firstName: 'John', lastName: 'Doe' },
    { firstName: 'Alice', lastName: 'Smith' },
    { firstName: 'Bob', lastName: 'Johnson' },
    // Add more user objects as needed
  ];
  @Output() editUser = new EventEmitter();
  @Output() deleteUser = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  edit(user: LIST_USER) {
    this.editUser.emit(user);
  }

  remove(user: LIST_USER) {
    this.deleteUser.emit(user);
  }
}
