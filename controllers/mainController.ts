import { NextFunction, Request, Response } from "express";
import UserService from "../service/mainService";
import { Users, authUser } from "../types/user.types";

class UserController {

  static async authLoginUser(req: Request, res: Response, next: NextFunction){
    try {
      const data: authUser = req.body

      const executeAuth = await UserService.authUser(data)

      res.status(200).json({message: "Login Berhasil !", data: executeAuth})
    } catch (e) {
      next(e)
    }
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ message: "Request Berhasil !", data: users });
    } catch (e) {
      next(e);
    }
  }

  static async createUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const data: Users = req.body;

      const newUser = await UserService.createUsers(data);

      res.status(201).json({ message: "Berhasil Meregistrasi User"});
    } catch (e) {
      next(e);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const executeDelete = await UserService.deleteUsers(parseInt(id));

      res
        .status(200)
        .json({ message: "berhasil menghapus data user dengan id " + id });
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
