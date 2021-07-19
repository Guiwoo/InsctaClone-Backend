import { NEW_MESSAGE } from "../../constant";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    roomUpdate: {
      subscribe: () => pubsub.asyncIterator(NEW_MESSAGE),
    },
  },
};
