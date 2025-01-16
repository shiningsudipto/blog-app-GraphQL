import { PrismaClient } from "@prisma/client";
import { TSignup } from "../types";
import bcrypt from "bcrypt";
import { jwtUtils } from "../utils/jwt.utils";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    signup: async (parent: any, args: TSignup, context: any) => {
      const hashedPassword = await bcrypt.hash(args?.password, 12);
      const payload = {
        ...args,
        password: hashedPassword,
      };
      const newUser = await prisma.user.create({
        data: payload,
      });
      const token = jwtUtils.generateToken(newUser?.email, newUser?.id);
      return { token };
    },
  },
};
