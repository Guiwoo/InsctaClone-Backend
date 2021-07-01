import bcrypt from "bcrypt";

export const hashingPassword = (password, count) =>
  bcrypt.hash(password, count);
