import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { protectedResolvers } from "../user.utils";
import fs from "fs";

export default {
  Mutation: {
    editProfile: protectedResolvers(
      async (
        _,
        {
          firstName,
          lastName,
          userName,
          email,
          password: newPassword,
          bio,
          avatar,
        },
        { loggedInUser }
      ) => {
        const { filename, createReadStream } = await avatar;
        const readStream = createReadStream();
        const writeStream = fs.createWriteStream(
          process.cwd() + "/upload/" + filename
        );
        readStream.pipe(writeStream);
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            userName,
            email,
            bio,
            ...(uglyPassword && { password: uglyPassword }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile!",
          };
        }
      }
    ),
  },
};
