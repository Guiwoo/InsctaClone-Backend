import client from "../../client";
import { protectedResolvers } from "../../users/user.utils";

export default {
  Mutation: {
    editComment: protectedResolvers(
      async (_, { id, payload }, { loggedInUser }) => {
        const comment = await client.comment.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
          },
        });
        if (!comment) {
          return {
            ok: false,
            error: "Comment not found",
          };
        } else if (comment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not authorzied",
          };
        } else {
          await client.comment.update({
            where: {
              id,
            },
            data: {
              payload,
            },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
