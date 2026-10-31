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
export const getTasksService = async ({
  userId,
  page = 1,
  limit = 10,
  status,
  priority,
  search,
}) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const currentPage = Math.max(1, Number(page) || 1);
  const pageLimit = Math.max(1, Number(limit) || 10);

  const conditions = ["user_id = $1"];
  const values = [userId];

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  if (priority) {
    values.push(priority);
    conditions.push(`priority = $${values.length}`);
  }

  if (search?.trim()) {
    values.push(`%${search.trim()}%`);
    conditions.push(`title ILIKE $${values.length}`);
  }

  const whereClause = conditions.join(" AND ");
  const offset = (currentPage - 1) * pageLimit;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM tasks
    WHERE ${whereClause}
  `;

  const tasksQuery = `
    SELECT
      id,
      title,
      description,
      status,
      priority,
      due_date,
      created_at,
      updated_at
    FROM tasks
    WHERE ${whereClause}
    ORDER BY created_at DESC, id DESC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  const [countResult, tasksResult] = await Promise.all([
    pool.query(countQuery, values),
    pool.query(tasksQuery, [...values, pageLimit, offset]),
  ]);

  const total = Number(countResult.rows[0].total);

  return {
    tasks: tasksResult.rows,
    pagination: {
      page: currentPage,
      limit: pageLimit,
      total,
      totalPages: Math.ceil(total / pageLimit),
    },
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
      due_date || null,
      Number(taskId),
      Number(userId),
    ],
  );

  if (result.rows.length === 0) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
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
  // 1. Dashboard Stats
  const statsResult = await pool.query(
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
    WHERE user_id = $1;
    `,
    [userId],
  );

  const stats = statsResult.rows[0];

  const total = Number(stats.total);
  const completed = Number(stats.completed);

  const dashboardStats = {
    total,
    completed,
    pending: Number(stats.pending),
    inProgress: Number(stats.in_progress),
    highPriority: Number(stats.high_priority),
    overdue: Number(stats.overdue),
    dueToday: Number(stats.due_today),
    upcoming: Number(stats.upcoming),
    completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
  };

  // 2. Recent Tasks (latest 5 created tasks)
  const recentResult = await pool.query(
    `
    SELECT *
    FROM tasks
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT 5;
    `,
    [userId],
  );

  // 3. Upcoming Tasks (next 5 incomplete tasks)
  const upcomingResult = await pool.query(
    `
    SELECT *
    FROM tasks
    WHERE user_id = $1
      AND due_date >= CURRENT_DATE
      AND status != 'completed'
    ORDER BY due_date ASC
    LIMIT 5;
    `,
    [userId],
  );

  return {
    stats: dashboardStats,
    recentTasks: recentResult.rows,
    upcomingTasks: upcomingResult.rows,
  };
};
