import jwt from "jsonwebtoken";

export const maxAge = 1 * 24 * 60 * 60; // 1 days // 259,200 seconds

export const createToken = (id) => {
  return jwt.sign({ id }, "SecretToken", {
    expiresIn: maxAge,
  });
};
