import pool from "../config/db.js";

export const CreateTaskService = async ({
  userId,
  title,
  description,
  priority,
  status,
  duedate,
}) => {
  try {
    if (!userId) {
      const error = new Error("token not proveded");
      error.statusCode = 401;
      throw error;
    }

    const result = await pool.query(
      `
            insert into tasks (
            user_id,
            title,
            description,
            priority,
            status,
            due_date
            ) 
            values ($1,$2,$3,$4,$5,$6)
            returning *
            `,
      [userId, title, description, priority, status, duedate],
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// get task
export const getTaskService = async ({
  userId,
  status,
  priority,
  search,
}) => {
  try {
    const result = await pool.query(
      `
            select * 
            from tasks
            where user_id = $1 
                and title ilike $2
            order by created_at desc
            `,
      [userId, `%${search}`],
    );

    if (result.rows.length === 0) {
      const error = new Error("tasks not found");
      error.statusCode = 404;
      throw error;
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
