import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../service/user/register.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent {
  passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private register: RegisterService,
    private router: Router
  ) {
    this.passwordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  resetPassword() {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value);
      this.register.forgotPassword(this.passwordForm.value).subscribe((response) => {
        console.log(response);
        this.router.navigate(['login'])
        // navigate['/login']
      })
    }
  }
}
