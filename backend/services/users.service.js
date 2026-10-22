import pool from "../config/db.js";
import bcrypt from "bcryptjs";

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
