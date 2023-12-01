import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../service/user/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css'],
})
export class LoginformComponent {
  loginForm!: FormGroup;
  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(
    private fb: FormBuilder,
    private register: RegisterService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    if (this.loginForm.valid) {

      this.register.loginregistereduser(this.loginForm.value).then((data) => {
        // console.log(data);
        localStorage.setItem('token', data.token);

        this.register.checkuserdetails().then((data) => {
          console.log(data);
          console.log(data.info.role);
          localStorage.setItem('email', data.info.email);

          this.showSuccessMessage = true;

          setTimeout(() => {
            this.showSuccessMessage = false;
            if (data.info.role === 'user') {
              this.router.navigate(['user']);
            } else if (data.info.role === 'admin') {
              this.router.navigate(['adminhome']);
            }
          }, 3000);
        }).catch((error) => {
          console.log(error);
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        });
      });
    }
  }
}
