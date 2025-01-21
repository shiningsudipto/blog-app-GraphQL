import bcrypt from "bcrypt";
import { TSignup } from "../../types";
import { jwtUtils } from "../../utils/jwt.utils";
import { prisma } from "../../utils/prisma";

export const authResolvers = {
  signup: async (parent: any, args: TSignup, context: any) => {
    console.log(args);
    const hashedPassword = await bcrypt.hash(args?.password, 12);
    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });
    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: newUser.id,
        },
      });
    }
    const token = jwtUtils.generateToken(newUser?.email, newUser?.id);
    return { userError: null, token };
  },
  signin: async (parent: any, args: any, context: any) => {
    const user = await prisma.user.findUnique({
      where: {
        email: args?.email,
      },
    });
    if (!user) {
      return {
        userError: "User not found!",
        token: null,
      };
    }
    const isPassCorrect = await bcrypt.compare(args?.password, user?.password);
    if (!isPassCorrect) {
      return {
        userError: "Password not matched!",
        token: null,
      };
    } else {
      return {
        userError: null,
        token: jwtUtils.generateToken(user?.email, user?.id),
      };
    }
  },
};
