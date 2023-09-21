import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LIST_USER } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  isPopupOpen: boolean = false;
  user!: LIST_USER | undefined;

  @Input() mode: 'CREATE' | 'EDIT' = 'CREATE';
  @Input('user') set setUser(el: LIST_USER | undefined) {
    this.user = el;
    if (el) {
      this.populateUser(el);
    }
  }

  @Output() close = new EventEmitter();
  @Output() addUser = new EventEmitter();
  @Output() updateUser = new EventEmitter();

  constructor(private fromBuilder: FormBuilder) {
    this.userForm = this.fromBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit() {}

  closePopup() {
    this.close.emit();
  }

  saveUser() {
    if (this.userForm.valid) {
      this.mode === 'EDIT' ? this.updateUserData() : this.addUserData();
    }
    this.closePopup();
  }

  updateUserData() {
    this.updateUser.emit(this.userForm.value);
  }

  addUserData() {
    this.addUser.emit(this.userForm.value);
  }

  populateUser(user: LIST_USER) {
    this.userForm.patchValue(user);
  }
}
