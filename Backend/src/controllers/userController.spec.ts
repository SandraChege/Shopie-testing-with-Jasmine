import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { execute, query } from "../helpers/dbHelper";

import {
  registerUser,
  loginUser,
  getAllUsers,
  getOneUser,
  checkUserDetails,
  updateUserDetails,
  deleteUser,
  forgotPassword,
  resetPassword,
} from "./usercontroller";

jest.mock("../helpers/dbHelper", () => ({
  execute: jest.fn(),
  query: jest.fn(),
}));

describe("user controller", () => {
  //REGISTER A USER
  it("should register a user", async () => {
    // Arrange
    const req: any = {
      body: {
        userName: "Sandra Chege",
        email: "sandrachege@gmail.com",
        phone_no: "0700111333",
        password: "@12345678S",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    // Mock the hashPass function to return a mock password
    jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValueOnce("HashedPass@word123" as never);

    // Mock the execute function to simulate a successful registration
    (execute as jest.Mock).mockResolvedValue({});

    // Act
    await registerUser(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "user registered successfully",
    });
  });

    it("should handle registration failure - email already exists", async () => {
      // Arrange
      const reqRegister: any = {
        body: {
          userName: "Sandra Chege",
          email: "sandrachege@gmail.com",
          phone_no: "0700111333",
          password: "@12345678S",
        },
      };

      const resRegister: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock the hashPass function to return a mock password
      jest
        .spyOn(bcrypt, "hash")
        .mockResolvedValueOnce("HashedPass@word123" as never);

      // Mock the execute function to simulate an existing user with the same email
      (execute as jest.Mock).mockResolvedValue({
        recordset: [
          { id: "123", email: "sandrachege@example.com", password: "hashedPassword" },
        ],
      });

      // Act
      await registerUser(reqRegister, resRegister);

      // Assert
      expect(resRegister.status).toHaveBeenCalledWith(404);
      expect(resRegister.json).toHaveBeenCalledWith({
        error: "Account exists with the given email",
      });
    });
});
