import client from "../../client";
import { protectedResolvers } from "../../users/user.utils";

export default {
  Mutation: {
    createComment: protectedResolvers(
      async (_, { photoId, payload }, { loggedInUser }) => {
        const ok = await client.photo.findUnique({
          where: {
            id: photoId,
          },
          select: {
            id: true,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "Photo dose not exist.",
          };
        }
        const getNewComment = await client.comment.create({
          data: {
            payload,
            photo: {
              connect: {
                id: photoId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return {
          ok: true,
          id: getNewComment.id,
        };
      }
    ),
  },
};
