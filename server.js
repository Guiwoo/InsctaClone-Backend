require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/user.utils";
import logger from "morgan";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

const app = express();

app.use(logger("dev"));
app.use("/static", express.static("upload"));

apollo.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 http://localhost:${PORT} is running`)
);
