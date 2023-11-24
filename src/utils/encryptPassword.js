import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};
