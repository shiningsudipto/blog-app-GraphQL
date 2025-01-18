import { prisma } from "../../utils/prisma";

export const Query = {
  users: async (parent: any, args: any, context: any) => {
    return await prisma.user.findMany();
  },
};
