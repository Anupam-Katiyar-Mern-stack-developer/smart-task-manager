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
export const getTask = async ({ userId, page, offset, limit, search }) => {
  const result = await pool.query(
    `
    select * from tasks
    where user_id=$1
    and title ilike $2
      limit $3 
      offset $4
    `,
    [userId, search, limit, offset],
  );

  const resultCount = await pool.query(
    `
    select count(*) from tasks
    where user_id =$!
    `,
    [userId],
  );

  const totalTasks = resultCount.rows;

  const totalPages = Math.ceil(totalTasks / limit);

  return {
    tasks: result.rows,
    totalPages,
    totalTasks,
  };
};

// get single task

export const getSingleTaskService = async ({ userId, title }) => {
  try {
    const response = await pool.query(
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

// update task service

export const updateTaskService = async ({
  userId,
  taskId,
  title,
  priority,
  due_date,
  description,
  status,
}) => {
  const result = await pool.query(
    `UPDATE tasks
   SET
     title = COALESCE($1, title),
     description = COALESCE($2, description),
     priority = COALESCE($3, priority),
     status = COALESCE($4, status),
     due_date = COALESCE($5, due_date),
     updated_at = CURRENT_TIMESTAMP
   WHERE id = $6 AND user_id = $7
   RETURNING *`,
    [
      title ?? null,
      description ?? null,
      priority ?? null,
      status ?? null,
      due_date ?? null,
      taskId,
      userId,
    ],
  );
  if (response.rows.length === 0) {
    const error = new Error("not found");
    error.statusCode = 404;
    throw error;
  }

  return response.rows[0];
};

export const deleteTaskService = async ({ userId, taskId }) => {
  const result = await pool.query(
    `delete from tasks 
    where id = $1 and user_id = $2 
    returning id
    `,
    [taskId, userId],
  );

  if (result.rowCount === 0) {
    const error = new Error("task not found");
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
};

// dashboard
export const dashboardService = async ({ userId }) => {
  const result = await pool.query(
    `
    SELECT
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE status = 'completed') AS completed,
  COUNT(*) FILTER (WHERE status = 'pending') AS pending,
  COUNT(*) FILTER (WHERE status = 'in_progress') AS in_progress,
  COUNT(*) FILTER (WHERE priority = 'high') AS high_priority,
  COUNT(*) FILTER (
  WHERE due_date < CURRENT_DATE
  AND status != 'completed'
) AS overdue,

COUNT(*) FILTER (
  WHERE due_date = CURRENT_DATE
  AND status != 'completed'
) AS due_today,

COUNT(*) FILTER (
  WHERE due_date > CURRENT_DATE
  AND status != 'completed'
) AS upcoming
FROM tasks
WHERE user_id = $1; `,
    [userId],
  );
  const stats = result.rows[0];

  const total = Number(stats.total);
  const completed = Number(stats.completed);
  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    pending: Number(stats.pending),
    inProgress: Number(stats.in_progress),
    highPriority: Number(stats.high_priority),
    overdue: Number(stats.overdue),
    dueToday: Number(stats.due_today),
    upcoming: Number(stats.upcoming),
    completionRate,
  };
};
