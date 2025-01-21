// import { prisma } from "../../utils/prisma";

export const Query = {
  // users: async (parent: any, args: any, context: any) => { //ex: its a another way
  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
  profile: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: Number(args.userId),
      },
    });
  },
  user: async (parent: any, agrs: any, { prisma, userInfo }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: userInfo.id,
      },
    });
  },
  posts: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
};
