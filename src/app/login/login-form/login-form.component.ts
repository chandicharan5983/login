import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { USER_DETAILS } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  myForm!: FormGroup;
  loggedInUser!: USER_DETAILS | undefined;
  isInvalidUser: boolean = false;

  constructor(private fromBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.myForm = this.fromBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(event: Event) {
    event?.preventDefault();
    if (this.myForm.invalid) {
      return;
    }

    if (this.myForm.valid) {
      this.loggedInUser = this.auth.isUserExist(this.myForm.value);
    } else {
      this.isInvalidUser = true;
    }

    if (this.loggedInUser) {
      this.auth.setUserToken();
    } else {
      this.isInvalidUser = true;
    }
  }
}
