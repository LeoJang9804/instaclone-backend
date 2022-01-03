require("dotenv").config();
import http from 'http';
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/user.Utils";
import logger from "morgan";
import pubsub from "./pubsub";

const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
        protectResolver,
      };
    } else {
      return { loggedInUser: ctx.connection.context.loggedInUser }
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can''t listen");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser
      };
    }
  }
});

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });
apollo.installSubscriptionHandlers(app);

const PORT = process.env.PORT;

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}/graphql`);
});
