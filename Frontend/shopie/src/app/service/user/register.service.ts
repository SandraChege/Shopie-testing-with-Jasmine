import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { loginUserDetails } from 'src/app/interface/loginUserDetails';
import { UserDetails, getallusers } from 'src/app/interface/register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  //REGISTER USER
  async registerNewUser(userdetail: UserDetails) {
    let response = await fetch('http://localhost:4500/user/register', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userdetail),
    });

    const data = await response.json();

    console.log(data);

    return data;
  }
  //LOGIN USER
  async loginregistereduser(logindata: loginUserDetails) {
    // let body = {email, password}
    let res = await fetch('http://localhost:4500/user/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(logindata),
    });

    let data = await res.json();

    console.log(data);
    return data;
  }
  //CHECK USER DEATAILS
  async checkuserdetails() {
    let token = localStorage.getItem('token');

    let res = await fetch('http://localhost:4500/user/checkuserdetails', {
      headers: {
        'Content-Type': 'application/json',
        token: `${token}`,
      },
      method: 'GET',
    });

    let data = await res.json();

    console.log(data);
    return data;
  }

  //FETCH ALL USERS
  fetchAllUsers() {
    const token = localStorage.getItem('token');
    //console.log(token);

    if (token) {
      let response = this.http.get<{ users: getallusers[] }>(
        'http://localhost:4500/user/getallusers',
        {
          headers: new HttpHeaders({
            'Content-type': 'application/json',
            token: token,
          }),
        }
      );
      return response;
    } else {
      return null;
    }
  }

  //DELETE USERS
  deleteuser(userID: string) {
    const token = localStorage.getItem('token');
    //console.log(token);

    if (!token) {
      return throwError('User not authenticated');
    }

    const options = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token: token,
      }),
    };

    return this.http.delete(
      `http://localhost:4500/user/deleteuser/${userID}`,
      options
    );
  }

  //GET USER
  getuser() {
    const email = localStorage.getItem('email');
    if (!email) {
      return throwError('User not found');
    }
    return this.http.post(`http://localhost:4500/user/getoneuser`, { email });
  }

  updateUserProfile(userData: any) {    
     const updateUrl = `http://localhost:4500/user/updateuser`;
     return this.http.put(updateUrl, userData);
  }

  //FORGOT PASSWORD
  forgotPassword(email: any) {
    console.log(email);
    return this.http.post(`http://localhost:4500/user/forgot`,  email );
  }
}
