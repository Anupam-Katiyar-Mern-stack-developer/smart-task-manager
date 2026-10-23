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
  limit,
  pageNumber,
  offset,
}) => {
  try {
    const result = await pool.query(
      `
            select * 
            from tasks
            where user_id = $1 
                and title ilike $2
                and ($3::text is null or status = $3)
                and ($4::text is null or priority =$4)
            order by created_at desc
            limit $5 offset $6
            `,
      [userId, `%${search}%`, status || null, priority || null, limit, offset],
    );

    const countResult = await pool.query(
      `SELECT COUNT(*) AS total
   FROM tasks
   WHERE user_id = $1
     AND title ILIKE $2
     AND ($3::text IS NULL OR status = $3)
     AND ($4::text IS NULL OR priority = $4)`,
      [userId, `%${search}%`, status || null, priority || null],
    );

    const total = Number(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    return {
      tasks: result.rows,
      pagination: {
        page: pageNumber,
        limit,
        total,
        totalPages,
      },
    };
  } catch (error) {
    throw error;
  }
};

// get single task

export const getSingleTaskService = async ({ userId, title }) => {
  try {
    const response =await pool.query(
      `select * from tasks
      where title=$1
      and user_id =$2 
      `,
      [title, userId],
    );

    if (response.rows.length === 0) {
      const error = new Error("not found ");
      error.statusCode = 404;
      throw error;
    }
    return response.rows[0];
  } catch (error) {
    throw error;
  }
};
