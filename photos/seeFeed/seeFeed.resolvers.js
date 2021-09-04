import client from "../../client";
import { protectedResolvers } from "../../users/user.utils";

export default {
  Query: {
    seeFeed: protectedResolvers((_, { offSet }, { loggedInUser }) =>
      client.photo.findMany({
        take: 2,
        skip: offSet,
        where: {
          OR: [
            {
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    ),
  },
};
