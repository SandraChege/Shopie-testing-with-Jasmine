import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../service/user/register.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css'],
})
export class AdminprofileComponent {
  ProfileForm: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private registerservice: RegisterService
  ) {
    this.ProfileForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phone_no: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getUserProfile();
    this.ProfileForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phone_no: ['', Validators.required],
    });
  }
  getUserProfile() {
    this.registerservice.getuser().subscribe((response) => {
      this.user = response;
      //console.log(this.user.user);

      this.ProfileForm.patchValue({
        userName: this.user.user.userName,
        email: this.user.user.email,
        phone_no: this.user.user.phone_no,
      });
    });
  }

  updateProfile() {
    if (this.ProfileForm.valid) {
      const userDetails = this.ProfileForm.value;
      userDetails.userID = this.user.user.userID;

      //console.log(userDetails);

      this.registerservice
        .updateUserProfile(userDetails)
        .subscribe((response) => {
          console.log(response);
          this.getUserProfile();
        });
    }
  }
}
