import { pool } from "../db.js";
import bcrypt, { compare } from "bcrypt";

export async function comparePassword(email, password, query) {
  const [user] = await pool.query(query, [email]);
  if (user) {
    const auth = await bcrypt.compare(password, user[0].password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
}
