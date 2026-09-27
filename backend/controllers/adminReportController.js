const db = require("../config/db");

// ==============================
// OVERALL REPORT
// ==============================
const getOverallReport = (req, res) => {
  const sql = `
    SELECT
      COUNT(*) AS total_activities,
      COUNT(DISTINCT user_id) AS total_users,
      ROUND(COALESCE(SUM(carbon_emission), 0), 2) AS total_carbon,
      ROUND(COALESCE(AVG(carbon_emission), 0), 2) AS average_carbon
    FROM activity
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("OVERALL REPORT ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch overall report",
      });
    }

    res.status(200).json({
      success: true,
      data: result[0],
    });
  });
};


// ==============================
// CATEGORY REPORT
// ==============================
const getCategoryReport = (req, res) => {
  const sql = `
    SELECT
      activity_type,
      COUNT(*) AS total_activities,
      ROUND(COALESCE(SUM(carbon_emission), 0), 2) AS total_carbon,
      ROUND(COALESCE(AVG(carbon_emission), 0), 2) AS average_carbon
    FROM activity
    GROUP BY activity_type
    ORDER BY total_carbon DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("CATEGORY REPORT ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch category report",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
};


// ==============================
// USER REPORT
// ==============================
const getUserReport = (req, res) => {
  const sql = `
    SELECT
      u.id,
      u.full_name,
      u.email,
      COUNT(a.id) AS total_activities,
      ROUND(COALESCE(SUM(a.carbon_emission), 0), 2) AS total_carbon,
      ROUND(COALESCE(AVG(a.carbon_emission), 0), 2) AS average_carbon
    FROM users u
    LEFT JOIN activity a
      ON u.id = a.user_id
    GROUP BY u.id, u.full_name, u.email
    ORDER BY total_carbon DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("USER REPORT ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch user report",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
};


// ==============================
// MONTHLY REPORT
// ==============================
const getMonthlyReport = (req, res) => {
  const sql = `
    SELECT
      DATE_FORMAT(activity_date, '%Y-%m') AS month,
      COUNT(*) AS total_activities,
      ROUND(COALESCE(SUM(carbon_emission), 0), 2) AS total_carbon
    FROM activity
    GROUP BY DATE_FORMAT(activity_date, '%Y-%m')
    ORDER BY month ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("MONTHLY REPORT ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch monthly report",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
};


// ==============================
// REPORT BY DATE RANGE
// ==============================
const getDateRangeReport = (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({
      success: false,
      message: "startDate and endDate are required",
    });
  }

  const sql = `
    SELECT
      COUNT(*) AS total_activities,
      COUNT(DISTINCT user_id) AS total_users,
      ROUND(COALESCE(SUM(carbon_emission), 0), 2) AS total_carbon,
      ROUND(COALESCE(AVG(carbon_emission), 0), 2) AS average_carbon
    FROM activity
    WHERE DATE(activity_date) BETWEEN ? AND ?
  `;

  db.query(sql, [startDate, endDate], (err, result) => {
    if (err) {
      console.error("DATE RANGE REPORT ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch date range report",
      });
    }

    res.status(200).json({
      success: true,
      data: result[0],
    });
  });
};


// ==============================
// COMPLETE REPORT
// ==============================
const getCompleteReport = async (req, res) => {
  try {
    const overallQuery = `
      SELECT
        COUNT(*) AS total_activities,
        COUNT(DISTINCT user_id) AS total_users,
        ROUND(COALESCE(SUM(carbon_emission),0),2) AS total_carbon,
        ROUND(COALESCE(AVG(carbon_emission),0),2) AS average_carbon
      FROM activity
    `;

    const categoryQuery = `
      SELECT
        activity_type,
        COUNT(*) AS total_activities,
        ROUND(COALESCE(SUM(carbon_emission),0),2) AS total_carbon
      FROM activity
      GROUP BY activity_type
      ORDER BY total_carbon DESC
    `;

    const monthlyQuery = `
      SELECT
        DATE_FORMAT(activity_date, '%Y-%m') AS month,
        COUNT(*) AS total_activities,
        ROUND(COALESCE(SUM(carbon_emission),0),2) AS total_carbon
      FROM activity
      GROUP BY DATE_FORMAT(activity_date, '%Y-%m')
      ORDER BY month ASC
    `;

    const userQuery = `
      SELECT
        u.id,
        u.full_name,
        u.email,
        COUNT(a.id) AS total_activities,
        ROUND(COALESCE(SUM(a.carbon_emission),0),2) AS total_carbon
      FROM users u
      LEFT JOIN activity a ON u.id = a.user_id
      GROUP BY u.id, u.full_name, u.email
      ORDER BY total_carbon DESC
    `;

    const [
      overall,
      categories,
      monthly,
      users,
    ] = await Promise.all([
      new Promise((resolve, reject) => {
        db.query(overallQuery, (err, result) =>
          err ? reject(err) : resolve(result)
        );
      }),

      new Promise((resolve, reject) => {
        db.query(categoryQuery, (err, result) =>
          err ? reject(err) : resolve(result)
        );
      }),

      new Promise((resolve, reject) => {
        db.query(monthlyQuery, (err, result) =>
          err ? reject(err) : resolve(result)
        );
      }),

      new Promise((resolve, reject) => {
        db.query(userQuery, (err, result) =>
          err ? reject(err) : resolve(result)
        );
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        overall: overall[0],
        categories,
        monthly,
        users,
      },
    });
  } catch (error) {
    console.error("COMPLETE REPORT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate complete report",
    });
  }
};


module.exports = {
  getOverallReport,
  getCategoryReport,
  getUserReport,
  getMonthlyReport,
  getDateRangeReport,
  getCompleteReport,
};