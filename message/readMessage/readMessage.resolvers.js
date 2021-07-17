import client from "../../client";
import { protectedResolvers } from "../../users/user.utils";

export default {
  Mutation: {
    readMessage: protectedResolvers(async (_, { id }, { loggedInUser }) => {
      const message = await client.message.findFirst({
        wehre: {
          id,
          userId: {
            not: loggedInUser.id,
          },
          room: {
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        },
        select: {
          id: true,
        },
      });
      if (!message) {
        return {
          ok: false,
          error: "Message not found!",
        };
      }
      await client.message.update({
        where: {
          id,
        },
        data: {
          read: true,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
