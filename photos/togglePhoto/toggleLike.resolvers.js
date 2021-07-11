import client from "../../client";
import { protectedResolvers } from "../../users/user.utils";

export default {
  Mutation: {
    toggleLike: protectedResolvers(async (_, { id }, { loggedInUser }) => {
      const thePhoto = await client.photo.findUnique({
        where: {
          id,
        },
      });
      if (!thePhoto) {
        return {
          ok: false,
          error: "Photo Not Found!",
        };
      }
      const likeWhere = {
        photoId_userId: {
          userId: loggedInUser.id,
          photoId: id,
        },
      };
      const like = await client.like.findUnique({
        where: likeWhere,
      });
      if (like) {
        await client.like.delete({
          where: likeWhere,
        });
      } else {
        await client.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            photo: {
              connect: {
                id: thePhoto.id,
              },
            },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};
