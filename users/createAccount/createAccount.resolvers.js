import { hashingPassword } from "../../utilities";
import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                userName,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/Email is already taken.");
        }
        const uglyPassword = await hashingPassword(password, 10);
        await client.user.create({
          data: {
            firstName,
            userName,
            email,
            lastName,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Can not create account!",
        };
      }
    },
  },
};
