require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema, { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/user.utils";

const PORT = process.env.PORT;
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

server
  .listen(PORT)
  .then(() => console.log(`🚀 http://localhost:${PORT} is running`));
