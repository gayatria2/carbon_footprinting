const db = require("../config/db");

// =====================================================
// GET ALL EMISSION FACTORS
// =====================================================

const getEmissionFactors = (req, res) => {

  const sql = `
    SELECT
      id,
      activity_type,
      sub_type,
      unit,
      factor,
      description,
      status,
      created_at,
      updated_at
    FROM emission_factors
    ORDER BY activity_type ASC, id ASC
  `;


  db.query(sql, (err, result) => {

    if (err) {

      console.error(
        "GET EMISSION FACTORS ERROR:",
        err
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch emission factors",
      });

    }


    return res.status(200).json({
      success: true,
      data: result,
    });

  });
};


// =====================================================
// GET SINGLE EMISSION FACTOR
// =====================================================

const getEmissionFactorById = (
  req,
  res
) => {

  const id = Number(req.params.id);


  if (!Number.isInteger(id) || id <= 0) {

    return res.status(400).json({
      success: false,
      message: "Invalid emission factor id",
    });

  }


  const sql = `
    SELECT
      id,
      activity_type,
      sub_type,
      unit,
      factor,
      description,
      status,
      created_at,
      updated_at
    FROM emission_factors
    WHERE id = ?
    LIMIT 1
  `;


  db.query(
    sql,
    [id],
    (err, result) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message:
            "Failed to fetch emission factor",
        });

      }


      if (result.length === 0) {

        return res.status(404).json({
          success: false,
          message:
            "Emission factor not found",
        });

      }


      return res.status(200).json({
        success: true,
        data: result[0],
      });

    }
  );
};


// =====================================================
// CREATE EMISSION FACTOR
// =====================================================

const createEmissionFactor = (
  req,
  res
) => {

  const {
    activity_type,
    sub_type,
    unit,
    factor,
    description,
    status,
  } = req.body;


  if (
    !activity_type ||
    !unit ||
    factor === undefined ||
    factor === null
  ) {

    return res.status(400).json({
      success: false,
      message:
        "Activity type, unit and factor are required",
    });

  }


  const numericFactor =
    Number(factor);


  if (
    Number.isNaN(numericFactor) ||
    numericFactor < 0
  ) {

    return res.status(400).json({
      success: false,
      message:
        "Factor must be a valid positive number",
    });

  }


  const sql = `
    INSERT INTO emission_factors
    (
      activity_type,
      sub_type,
      unit,
      factor,
      description,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;


  db.query(
    sql,
    [
      activity_type,
      sub_type || null,
      unit,
      numericFactor,
      description || null,
      status === "Inactive"
        ? "Inactive"
        : "Active",
    ],
    (err, result) => {

      if (err) {

        console.error(
          "CREATE EMISSION FACTOR ERROR:",
          err
        );


        if (err.code === "ER_DUP_ENTRY") {

          return res.status(409).json({
            success: false,
            message:
              "This emission factor already exists",
          });

        }


        return res.status(500).json({
          success: false,
          message:
            "Failed to create emission factor",
        });

      }


      return res.status(201).json({

        success: true,

        message:
          "Emission factor created successfully",

        data: {
          id: result.insertId,
        },

      });

    }
  );
};


// =====================================================
// UPDATE EMISSION FACTOR
// =====================================================

const updateEmissionFactor = (
  req,
  res
) => {

  const id = Number(req.params.id);


  if (!Number.isInteger(id) || id <= 0) {

    return res.status(400).json({
      success: false,
      message: "Invalid emission factor id",
    });

  }


  const {
    activity_type,
    sub_type,
    unit,
    factor,
    description,
    status,
  } = req.body;


  if (
    !activity_type ||
    !unit ||
    factor === undefined ||
    factor === null
  ) {

    return res.status(400).json({
      success: false,
      message:
        "Activity type, unit and factor are required",
    });

  }


  const numericFactor =
    Number(factor);


  if (
    Number.isNaN(numericFactor) ||
    numericFactor < 0
  ) {

    return res.status(400).json({
      success: false,
      message:
        "Factor must be a valid positive number",
    });

  }


  const sql = `
    UPDATE emission_factors
    SET
      activity_type = ?,
      sub_type = ?,
      unit = ?,
      factor = ?,
      description = ?,
      status = ?
    WHERE id = ?
  `;


  db.query(
    sql,
    [
      activity_type,
      sub_type || null,
      unit,
      numericFactor,
      description || null,
      status === "Inactive"
        ? "Inactive"
        : "Active",
      id,
    ],
    (err, result) => {

      if (err) {

        console.error(
          "UPDATE EMISSION FACTOR ERROR:",
          err
        );


        if (err.code === "ER_DUP_ENTRY") {

          return res.status(409).json({
            success: false,
            message:
              "This emission factor already exists",
          });

        }


        return res.status(500).json({
          success: false,
          message:
            "Failed to update emission factor",
        });

      }


      if (result.affectedRows === 0) {

        return res.status(404).json({
          success: false,
          message:
            "Emission factor not found",
        });

      }


      return res.status(200).json({

        success: true,

        message:
          "Emission factor updated successfully",

      });

    }
  );
};


// =====================================================
// DELETE
// =====================================================

const deleteEmissionFactor = (
  req,
  res
) => {

  const id = Number(req.params.id);


  if (!Number.isInteger(id) || id <= 0) {

    return res.status(400).json({
      success: false,
      message: "Invalid emission factor id",
    });

  }


  const sql = `
    DELETE FROM emission_factors
    WHERE id = ?
  `;


  db.query(
    sql,
    [id],
    (err, result) => {

      if (err) {

        console.error(
          "DELETE EMISSION FACTOR ERROR:",
          err
        );

        return res.status(500).json({
          success: false,
          message:
            "Failed to delete emission factor",
        });

      }


      if (result.affectedRows === 0) {

        return res.status(404).json({
          success: false,
          message:
            "Emission factor not found",
        });

      }


      return res.status(200).json({

        success: true,

        message:
          "Emission factor deleted successfully",

      });

    }
  );
};


// =====================================================
// TOGGLE STATUS
// =====================================================

const toggleEmissionFactorStatus = (
  req,
  res
) => {

  const id = Number(req.params.id);


  if (!Number.isInteger(id) || id <= 0) {

    return res.status(400).json({
      success: false,
      message: "Invalid emission factor id",
    });

  }


  const selectSql = `
    SELECT status
    FROM emission_factors
    WHERE id = ?
    LIMIT 1
  `;


  db.query(
    selectSql,
    [id],
    (err, result) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message:
            "Failed to check emission factor",
        });

      }


      if (result.length === 0) {

        return res.status(404).json({
          success: false,
          message:
            "Emission factor not found",
        });

      }


      const newStatus =
        result[0].status === "Active"
          ? "Inactive"
          : "Active";


      const updateSql = `
        UPDATE emission_factors
        SET status = ?
        WHERE id = ?
      `;


      db.query(
        updateSql,
        [newStatus, id],
        (updateErr) => {

          if (updateErr) {

            return res.status(500).json({
              success: false,
              message:
                "Failed to update status",
            });

          }


          return res.status(200).json({

            success: true,

            message:
              `Emission factor ${newStatus.toLowerCase()} successfully`,

            status: newStatus,

          });

        }
      );

    }
  );
};


module.exports = {
  getEmissionFactors,
  getEmissionFactorById,
  createEmissionFactor,
  updateEmissionFactor,
  deleteEmissionFactor,
  toggleEmissionFactorStatus,
};