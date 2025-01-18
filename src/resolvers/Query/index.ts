import { prisma } from "../../utils/prisma";

export const Query = {
  // users: async (parent: any, args: any, context: any) => { //ex: its a another way
  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
};
