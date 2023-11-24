import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "SecretToken", (err, decodedToken) => {
      if (err) {
        console.log("Error");
        console.log(err.message);
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    throw new Error("Invalid Token");
  }
};
