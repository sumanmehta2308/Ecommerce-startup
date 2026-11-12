import db from "../config/db.js";
export const getAllUsers = async (req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT * FROM Users");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};
export const getUserById = async (req, res, next) => {
  try 
  {
    const { id } = req.params;
    const [rows] = await db.execute("SELECT * FROM Users WHERE id = ?", [id]);
    if (rows.length === 0) {
      const error = new Error(`User with ID ${id} not found`);
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    next(error);
  }
};
export const addUser = async (req, res, next) => {
  try 
  {
    const { name, email } = req.body;

    if (!name || !email) {
      const error = new Error("Name and email are required");
      error.statusCode = 400;
      return next(error);
    }

    const [result] = await db.execute(
      "INSERT INTO Users (name, email) VALUES (?, ?)",
      [name, email]
    );

    console.log(
      `[INSERT] User added -> ID: ${result.insertId}, Name: ${name}, Email: ${email}`
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { id: result.insertId, name, email },
    });
  } catch (error) {
    console.error("[INSERT ERROR]:", error.message);
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  try 
  {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
      const error = new Error("Name and email are required");
      error.statusCode = 400;
      return next(error);
    }

    const [result] = await db.execute(
      "UPDATE Users SET name = ?, email = ? WHERE id = ?",
      [name, email, id]
    );

    if (result.affectedRows === 0) {
      console.warn(`[UPDATE FAILED] User with ID ${id} not found`);
      const error = new Error(`User with ID ${id} not found`);
      error.statusCode = 404;
      return next(error);
    }
    console.log(
      `[UPDATE] User ID ${id} updated -> Name: ${name}, Email: ${email}`
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: { id: Number(id), name, email },
    });
  } catch (error) {
    console.error("[UPDATE ERROR]:", error.message);
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try
   {
    const { id } = req.params;
    const [result] = await db.execute("DELETE FROM Users WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      console.warn(`[DELETE FAILED] User with ID ${id} not found`);
      const error = new Error(`User with ID ${id} not found`);
      error.statusCode = 404;
      return next(error);
    }
    console.log(`[DELETE] User with ID ${id} deleted successfully`);
    res.status(200).json({
      success: true,
      message: `User with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("[DELETE ERROR]:", error.message);
    next(error);
  }
};
