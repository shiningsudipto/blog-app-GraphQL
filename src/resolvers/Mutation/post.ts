export const postResolvers = {
  addPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        error: "Unauthorized",
        data: null,
      };
    }
    const newPost = await prisma.post.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: userInfo.id,
      },
    });
    return {
      error: null,
      data: newPost,
    };
  },
};
