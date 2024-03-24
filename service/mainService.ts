import { PrismaClient } from "@prisma/client";
import { ResponseError } from "../error/responseError";
import { validate } from "../validator/validate";
import { userValidator } from "../validator/userValidator";
import { Users, authUser } from "../types/user.types";

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  static getAllUsers = async () => {
    return await prisma.user.findMany();
  };

  static findUserId = async (id: number) => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  };

  static findUserEmail = async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  };

  static createUsers = async (req: Users): Promise<Users> => {
    const dataReq = validate.validate(userValidator.userSchema, req);

    const userEmailExist = await UserService.findUserEmail(dataReq.email);

    if (userEmailExist) {
      throw new ResponseError(409, "User Email Exist");
    }

    const hashedPass = await bcrypt.hash(dataReq.password, 10);

    if (hashedPass === null || undefined) {
      throw new ResponseError(500, "Internal Server Error");
    }

    return await prisma.user.create({
      data: {
        username: dataReq.username,
        email: dataReq.email,
        password: hashedPass,
      },
    });
  };

  static deleteUsers = async (id: number) => {
    const idUser = await UserService.findUserId(id);

    if (!idUser) {
      throw new ResponseError(404, `User Dengan ID ${id} Tidak Ditemukan`);
    }

    return await prisma.user.deleteMany({
      where: {
        id: id,
      },
    });
  };

  static authUser = async (req: authUser) => {
    const dataReq = validate.validate(userValidator.userAuth, req);

    const usersValidate = await prisma.user.findUnique({
      where: {
        email: dataReq.email,
      },
    });

    if (usersValidate?.email !== req.email) {
      throw new ResponseError(401, "Email Or Password Incorrect");
    }

    const decryptPass = await bcrypt.compare(
      req.password,
      usersValidate.password
    );

    if (!decryptPass) {
      throw new ResponseError(401, "Email Or Password Incorrect");
    }

    const defaultExp = 2 * 24 * 60 * 60;
    const currentTime = new Date()
    const responseExpDate = new Date(currentTime.getTime() + (defaultExp * 1000))

    const generateAccessToken = jwt.sign({ userId: usersValidate.id }, process.env.TOKEN_SECRET, { expiresIn: defaultExp });
    const response = {
      username: usersValidate.username,
      email: usersValidate.email,
      token: generateAccessToken,
      exp: responseExpDate.toLocaleString()
    };

    return response;
  };
}

export default UserService;
