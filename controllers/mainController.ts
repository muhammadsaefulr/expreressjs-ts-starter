import { Request, Response } from "express";
import ErrorHandle from "../error/errorHandle";
import UserService from "../service/mainService";
import { userSchema } from "../validator/mainValidator";

class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ message: "Request Berhasil !", users });
    } catch (err: any) {
      ErrorHandle.handle(err, res);
    }
  }

  static async createUsers(req: Request, res: Response) {
    try {
        const { username, email } = req.body;
        
        const { error } = userSchema.validate({ username, email });
        if (error) {
          return res.status(400).json({ message: error.message });
        }
        
        const newUser = await UserService.createUsers(username, email);
  
        res.status(200).json({ message: "Berhasil request !", data: newUser });
    } catch (err: any){
        ErrorHandle.handle(err, res)
    }
  }
}

export default UserController;
