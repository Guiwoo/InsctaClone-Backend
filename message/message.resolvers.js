import client from "../client";

export default {
  Room: {
    user: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    message: ({ id }) => client.message.findMany({ whrere: { roomId: id } }),
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          read: false,
          roomId: id,
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
        },
      });
    },
  },
};
