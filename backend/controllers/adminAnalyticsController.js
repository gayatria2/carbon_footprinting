const db = require("../config/db");

// ===============================
// DAILY CARBON
// ===============================
const getDailyCarbon = (req, res) => {
  const sql = `
    SELECT
      DATE(created_at) AS date,
      ROUND(SUM(carbon_emission), 2) AS carbon
    FROM activity
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("DAILY ANALYTICS ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch daily carbon data",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
};


// ===============================
// WEEKLY CARBON
// ===============================
const getWeeklyCarbon = (req, res) => {
  const sql = `
    SELECT
      YEAR(created_at) AS year,
      WEEK(created_at, 1) AS week,
      ROUND(SUM(carbon_emission), 2) AS carbon
    FROM activity
    GROUP BY YEAR(created_at), WEEK(created_at, 1)
    ORDER BY year ASC, week ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("WEEKLY ANALYTICS ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch weekly carbon data",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
};


// ===============================
// MONTHLY CARBON
// ===============================
const getMonthlyCarbon = (req, res) => {
  const sql = `
    SELECT
      YEAR(created_at) AS year,
      MONTH(created_at) AS month,
      DATE_FORMAT(created_at, '%Y-%m') AS month_name,
      ROUND(SUM(carbon_emission), 2) AS carbon
    FROM activity
    GROUP BY
      YEAR(created_at),
      MONTH(created_at),
      DATE_FORMAT(created_at, '%Y-%m')
    ORDER BY year ASC, month ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("MONTHLY ANALYTICS ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch monthly carbon data",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
};


// ===============================
// CATEGORY CARBON
// ===============================
const getCategoryCarbon = (req, res) => {
  const sql = `
    SELECT
      activity_type AS category,
      ROUND(SUM(carbon_emission), 2) AS carbon
    FROM activity
    GROUP BY activity_type
    ORDER BY carbon DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("CATEGORY ANALYTICS ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch category carbon data",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
};


// ===============================
// ACTIVITY COUNT BY CATEGORY
// ===============================
const getActivityCountByCategory = (req, res) => {
  const sql = `
    SELECT
      activity_type AS category,
      COUNT(*) AS activity_count
    FROM activity
    GROUP BY activity_type
    ORDER BY activity_count DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("ACTIVITY COUNT ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch activity count data",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
};


// ===============================
// TOP USERS
// ===============================
const getTopUsers = (req, res) => {
  const sql = `
    SELECT
      u.id,
      u.full_name,
      u.email,
      COUNT(a.id) AS total_activities,
      ROUND(COALESCE(SUM(a.carbon_emission), 0), 2) AS total_carbon
    FROM users u
    LEFT JOIN activity a
      ON u.id = a.user_id
    GROUP BY
      u.id,
      u.full_name,
      u.email
    ORDER BY total_carbon DESC
    LIMIT 10
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("TOP USERS ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch top users",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
};


// ===============================
// COMPLETE ADMIN ANALYTICS
// ===============================
const getAdminAnalytics = async (req, res) => {
  try {
    const queries = {

      daily: `
        SELECT
          DATE(created_at) AS date,
          ROUND(SUM(carbon_emission), 2) AS carbon
        FROM activity
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `,

      weekly: `
        SELECT
          YEAR(created_at) AS year,
          WEEK(created_at, 1) AS week,
          ROUND(SUM(carbon_emission), 2) AS carbon
        FROM activity
        GROUP BY YEAR(created_at), WEEK(created_at, 1)
        ORDER BY year ASC, week ASC
      `,

      monthly: `
        SELECT
          YEAR(created_at) AS year,
          MONTH(created_at) AS month,
          DATE_FORMAT(created_at, '%Y-%m') AS month_name,
          ROUND(SUM(carbon_emission), 2) AS carbon
        FROM activity
        GROUP BY
          YEAR(created_at),
          MONTH(created_at),
          DATE_FORMAT(created_at, '%Y-%m')
        ORDER BY year ASC, month ASC
      `,

      categories: `
        SELECT
          activity_type AS category,
          ROUND(SUM(carbon_emission), 2) AS carbon
        FROM activity
        GROUP BY activity_type
        ORDER BY carbon DESC
      `,

      activityCounts: `
        SELECT
          activity_type AS category,
          COUNT(*) AS activity_count
        FROM activity
        GROUP BY activity_type
        ORDER BY activity_count DESC
      `,

      topUsers: `
        SELECT
          u.id,
          u.full_name,
          u.email,
          COUNT(a.id) AS total_activities,
          ROUND(COALESCE(SUM(a.carbon_emission), 0), 2) AS total_carbon
        FROM users u
        LEFT JOIN activity a
          ON u.id = a.user_id
        GROUP BY
          u.id,
          u.full_name,
          u.email
        ORDER BY total_carbon DESC
        LIMIT 10
      `,
    };

    const executeQuery = (sql) => {
      return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    const [
      daily,
      weekly,
      monthly,
      categories,
      activityCounts,
      topUsers,
    ] = await Promise.all([
      executeQuery(queries.daily),
      executeQuery(queries.weekly),
      executeQuery(queries.monthly),
      executeQuery(queries.categories),
      executeQuery(queries.activityCounts),
      executeQuery(queries.topUsers),
    ]);

    res.status(200).json({
      success: true,

      data: {
        daily,
        weekly,
        monthly,
        categories,
        activityCounts,
        topUsers,
      },
    });

  } catch (error) {
    console.error(
      "ADMIN ANALYTICS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch admin analytics",
    });
  }
};


module.exports = {
  getDailyCarbon,
  getWeeklyCarbon,
  getMonthlyCarbon,
  getCategoryCarbon,
  getActivityCountByCategory,
  getTopUsers,
  getAdminAnalytics,
};