import client from "../../client";

export default {
  Query: {
    seePhotoLikes: async (_, { id }) => {
      const likesResult = await client.like.findMany({
        where: {
          photoId: id,
        },
        select: {
          user: true,
        },
      });
      return likesResult.map((like) => like.user);
    },
  },
};
