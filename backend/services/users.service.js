import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// user regsiter
export const userRegisterService = async ({ name, email, password }) => {
  try {
    const normalizedEmail = email.trim();
    if (!name || !email || !password) {
      const error = new Error("all fields are require");
      error.statusCode = 400;
      throw error;
    }

    const emailCheck = await pool.query(
      `
            select id, email from users 
            where email = $1
            `,
      [normalizedEmail],
    );

    if (emailCheck.rows.length > 0) {
      const error = new Error("email already register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `insert into users (name,email,password)
        values ($1,$2,$3)

        returning 
         
        id,
        name,
        email,
        created_at
        `,
      [name.trim(), normalizedEmail, hashedPassword],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// user login service

export const userLoginService = async ({ email, password }) => {
  try {
    const normalizedEmail = email.trim();

    const result = await pool.query(
      `
    select id,name ,email,password from users 
    where email=$1
    limit 1
    `,
      [normalizedEmail],
    );

    if (result.rows.length === 0) {
      const error = new Error("user not found");
      error.statusCode = 404;
      throw error;
    }
    const user = result.rows[0];

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      const error = new Error("invalid username and password");
      error.statusCode = 403;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: "user",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    return {
        user,token
    };
  } catch (error) {
    throw error;
  }
};
