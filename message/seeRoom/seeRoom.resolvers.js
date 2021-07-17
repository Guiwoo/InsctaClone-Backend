import client from "../../client";
import { protectedResolvers } from "../../users/user.utils";

export default {
  Query: {
    seeRoom: protectedResolvers((_, { id }, { loggedInUser }) =>
      client.room.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      })
    ),
  },
};
