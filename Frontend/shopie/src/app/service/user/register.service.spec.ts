import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService; //service tested
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService],
    });
    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', fakeAsync(() => {
    let mockUser = {
      userName: 'Emmanuel Kipsang',
      email: 'Emmanuel.Kipsang@thejitu.com',
      password: '12345678',
      phone_no: '0711000000',
    };
    let response: any;

    service.registerNewUser(mockUser).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne('http://localhost:4500/user/register');
    expect(req.request.method).toBe('POST');

    req.flush({ status: 'success' });

    tick();

    expect(response).toBeDefined();
  }));

  it('should login a registered user', fakeAsync (() => {
    const mockedUser = {
      email: '9superbikes@gmail.com',
      password: '12345678',
    };

    let response: any;
    service.loginregistereduser(mockedUser).then((res) => {
      res = response;
    });

    const req = httpMock.expectOne('http://localhost:4500/user/login');
    expect(req.request.method).toBe('POST');

    req.flush({ status: 'success' });

    tick()

    expect(response).toBeDefined();
  }));

  it('should delete a user', () => {
    const userID = '123';
    const mockToken = 'mockTokenValue';
    localStorage.setItem('token', mockToken);

    service.deleteuser(userID).subscribe();

    const req = httpMock.expectOne(
      `http://localhost:4500/user/deleteuser/${userID}`
    );


    expect(req.request.headers.has('Content-type')).toBeTruthy();
    expect(req.request.headers.get('token')).toEqual(mockToken);

    req.flush({}); 

  });

  it('should check user details', fakeAsync (() => {
    const mockToken = 'mockTokenValue';
    localStorage.setItem('token', mockToken);

    let response:any;
    service.checkuserdetails().then((res) => {
    response = res;
    });

    const req = httpMock.expectOne("http://localhost:4500/user/checkuserdetails");
    expect(req.request.headers.get('token')).toEqual(mockToken);

    req.flush({
      status: 'success',
    });

    tick();

    expect(response).toBeDefined();
  }));

  it('should get single user', () => {
     const mockEmail = 'phillipwaiganjo@gmail.com';
     const mockUserData = {
       userID: '12345-qwertyu-sdfghjk-34567',
       userName: 'Phillip Waiganjo ',
       email: 'phillipwaiganjo@gmail.com',
       phone_no: 725849893,
       password: '$wertyukfnssd',
       role: 'user',
       isDeleted: true,
       Welcomed: true,
       resetPassword: true,
     };

     service.getuser().subscribe((userData) => {
       expect(userData).toEqual(mockUserData);
     });

     const req = httpMock.expectOne('http://localhost:4500/user/getoneuser');
     expect(req.request.method).toBe('POST');
     expect(req.request.body).toEqual({ email: mockEmail });

     req.flush(mockUserData);
  })

  // it('should get users', () => {
  //   const mockUsers = {
  //     users: [
  //       {
  //         userID: 'e7bd51f9-4935-4690-bd04-4c9eeda31673',
  //         userName: 'jane Doe',
  //         email: 'janeDoe@yopmail.com',
  //         phone_no: "737492000",
  //         password:
  //           '$2b$08$rmhdUnqfUju.SydFF.QK3OGbwyKJUnC/tHOKUkgWXqwyq5cckAzmi',
  //         role: 'user',
  //         isDeleted: false,
  //         Welcomed: true,
  //         resetPassword: true,
  //       },
  //       {
  //         userID: 'ebb8cef7-d252-49c9-91f8-56836cce7c35',
  //         userName: 'Robinson Ngechu',
  //         email: 'devngechu@gmail.com',
  //         phone_no: "789236184",
  //         password:
  //           '$2b$08$NjK0/n1JaWd.ZZFKVt.5jOsv0FSccf.v11ZXau7uAp6pqO5MVgnpW',
  //         role: 'user',
  //         isDeleted: false,
  //         Welcomed: true,
  //         resetPassword: false,
  //       },
  //     ],
  //   };

  //   service.fetchAllUsers().subscribe(res => {
  //     expect(res.users).toEqual(mockUsers.users);
  //    })

  //   const req=httpMock.expectOne('/api/users');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(mockUsers);
  // })

});
