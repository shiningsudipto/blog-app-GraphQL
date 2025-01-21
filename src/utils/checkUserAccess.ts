export const checkUserAccess = async (
  prisma: any,
  userId: any,
  postId: any
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!user) {
    return {
      error: "User not found!",
      data: null,
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
  });

  if (!post) {
    return {
      error: "post not found!",
      data: null,
    };
  }

  if (post.authorId !== user.id) {
    return {
      error: "Post not owned by User!",
      data: null,
    };
  }
};
