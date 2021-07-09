import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      //this will return 0 or 1 because it will checking the list that is loggedinUser following list
      const fancyway = await client.user.count({
        where: {
          userName: loggedInUser.userName,
          following: {
            some: {
              id,
            },
          },
        },
      });
      const exists = await client.user
        .findUnique({ where: { userName: loggedInUser.userName } })
        .following({
          where: { id },
        });
      return exists.length !== 0;
    },
    photos: ({ id }) =>
      client.user.findUnique({
        where: {
          id,
        },
      }).photos,
  },
};
