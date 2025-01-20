export const postResolvers = {
  addPost: async (parent: any, { post }: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        error: "Unauthorized",
        data: null,
      };
    }
    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: userInfo.id,
      },
    });
    return {
      error: null,
      data: newPost,
    };
  },
  updatePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    console.log(args, userInfo);
    if (!userInfo) {
      return {
        error: "Unauthorized",
        data: null,
      };
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: args.post,
    });

    console.log(updatedPost);

    return {
      userError: null,
      data: updatedPost,
    };
  },
};
