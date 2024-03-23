import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserService {
  static getAllUsers = async () => {
    return await prisma.user.findMany();
  };

  static createUsers = async (username: string, email: string) => {
    return await prisma.user.create({
      data: {
        username,
        email,
      },
    });
  };
}

export default UserService;
