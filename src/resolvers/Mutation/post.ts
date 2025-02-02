import { checkUserAccess } from "../../utils/checkUserAccess";

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
      error: null,
      data: updatedPost,
    };
  },
  deletePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    console.log(args);
    if (!userInfo) {
      return {
        error: "Unauthorized",
        data: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.userId, args.postId);
    if (error) {
      return error;
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(args.postId),
      },
    });

    return {
      error: null,
      data: deletedPost,
    };
  },
  publishPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        error: "Unauthorized",
        data: null,
      };
    }

    const error = await checkUserAccess(prisma, userInfo.id, args.postId);
    if (error) {
      return {
        error: error,
        data: null,
      };
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: {
        published: true,
      },
    });

    return {
      error: null,
      data: updatedPost,
    };
  },
};
