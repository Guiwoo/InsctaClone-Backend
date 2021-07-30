require("dotenv").config();
import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/user.utils";
import logger from "morgan";

process.on("warning", (warning) => {
  console.log("⭐️", warning.stack);
});

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can't join.");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
});

const app = express();

app.use(logger("dev"));
app.use("/static", express.static("upload"));

apollo.applyMiddleware({ app });

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () =>
  console.log(`🚀 http://localhost:${PORT} is running`)
);
