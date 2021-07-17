import client from "../../client";
import { protectedResolvers } from "../../users/user.utils";

export default {
  Query: {
    seeRooms: protectedResolvers(
      async (_, __, { loggedInUser }) =>
        await client.room.findMany({
          where: {
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
