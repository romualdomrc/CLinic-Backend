import { pool } from "../db.js";
import { encryptPassword } from "../utils/encryptPassword.js";
import { createToken, maxAge } from "../utils/createToken.js";
import { comparePassword } from "../utils/comparePassword.js";

export const homePage = async (req, res) => {
  res.json("Home page without authentication");
};

export const getAllUsers = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users");
  res.json(rows);
};

export const getUserById = async (req, res, id) => {
  try {
    const userId = req.params.id;
    if (!/^\d+$/.test(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      userId || id,
    ]);
    if (rows.length === 1) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error finding user by ID:", error);
    res.status(500).json({ error: "Could not find user" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const encryptedPassword = await encryptPassword(password);

    const insertUserQuery =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    const [result] = await pool.query(insertUserQuery, [
      name,
      email,
      encryptedPassword,
    ]);

    res.status(201).json({ message: "User created", userId: result.insertId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Could not create user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = await req.body;

  try {
    const authUser = await comparePassword(
      email,
      password,
      "SELECT * FROM users WHERE email = ?"
    );
    const token = createToken(authUser[0].id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({
      message: `user ${authUser[0].name} logged with email ${authUser[0].email}`,
      jwt: { token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
