import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { jwtUtils } from "./utils/jwt.utils";
import { TDecodedUserInfo } from "./types";

const prisma = new PrismaClient();

type TContext = {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: TDecodedUserInfo | null;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const main = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<TContext> => {
      const userInfo = await jwtUtils.getUserInfoFromToken(
        req.headers.authorization as string
      );
      return { prisma, userInfo };
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
};

main();
