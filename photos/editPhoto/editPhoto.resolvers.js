import client from "../../client";
import { protectedResolvers } from "../../users/user.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectedResolvers(
      async (_, { id, caption }, { loggedInUser }) => {
        const oldPhoto = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });
        console.log(oldPhoto);
        if (!oldPhoto) {
          return {
            ok: false,
            error: "Photo not found.",
          };
        }
        const updatedPhoto = await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: processHashtags(caption),
            },
          },
        });
        console.log(photupdatedPhoto);
      }
    ),
  },
};
