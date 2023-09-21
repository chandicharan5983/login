import { Injectable } from '@angular/core';
import { USER_DETAILS } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userDetails: USER_DETAILS[] = [
    {
      id: 1001,
      name: 'Test',
      email: 'test@gmail.com',
      password: '123456',
      phoneNo: 8909876543,
    },
  ];

  constructor(private router: Router) {}

  generateString(length: number) {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(
      { length },
      () => charset[Math.floor(Math.random() * charset.length)]
    ).join('');
  }

  isUserExist(loggedInUser: any) {
    return this.userDetails.find(
      (user: USER_DETAILS) =>
        user.email === loggedInUser?.email &&
        user.password === loggedInUser?.password
    );
  }

  setUserToken() {
    const token = this.generateString(100);
    localStorage.setItem('currentUser', JSON.stringify({ token }));
    this.router.navigate(['/dashboard']);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
