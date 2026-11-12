import db from "../config/db.js";
export const addStudent = async (req, res, next) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
      const error = new Error("Name, email, and age are required");
      error.statusCode = 400;
      return next(error);
    }

    const [result] = await db.execute(
      "INSERT INTO students (name, email, age) VALUES (?, ?, ?)",
      [name, email, age]
    );

    console.log(
      `[INSERT] Student added -> ID: ${result.insertId}, Name: ${name}, Email: ${email}, Age: ${age}`
    );

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: { id: result.insertId, name, email, age },
    });
  } catch (error) {
    console.error("[INSERT ERROR]:", error.message);
    if (error.code === "ER_DUP_ENTRY") {
      error.statusCode = 409;
      error.message = "A student with this email already exists";
    }
    next(error);
  }
};
export const getAllStudents = async (req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT * FROM students");
    console.log(`[FETCH ALL] Retrieved ${rows.length} students`);

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("[FETCH ALL ERROR]:", error.message);
    next(error);
  }
};
export const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute("SELECT * FROM students WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      console.warn(`[FETCH FAILED] Student with ID ${id} not found`);
      const error = new Error(`Student with ID ${id} not found`);
      error.statusCode = 404;
      return next(error);
    }

    console.log(`[FETCH ONE] Retrieved student ID: ${id}`);
    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("[FETCH ONE ERROR]:", error.message);
    next(error);
  }
};
export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const [existing] = await db.execute("SELECT * FROM students WHERE id = ?", [
      id,
    ]);
    if (existing.length === 0) {
      console.warn(`[UPDATE FAILED] Student with ID ${id} not found`);
      const error = new Error(`Student with ID ${id} not found`);
      error.statusCode = 404;
      return next(error);
    }
    const updatedName = name ?? existing[0].name;
    const updatedEmail = email ?? existing[0].email;
    const updatedAge = age ?? existing[0].age;

    await db.execute(
      "UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?",
      [updatedName, updatedEmail, updatedAge, id]
    );

    console.log(
      `[UPDATE] Student ID ${id} updated -> Name: ${updatedName}, Email: ${updatedEmail}, Age: ${updatedAge}`
    );
    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: {
        id: Number(id),
        name: updatedName,
        email: updatedEmail,
        age: updatedAge,
      },
    });
  } catch (error) {
    console.error("[UPDATE ERROR]:", error.message);
    next(error);
  }
};
export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute("DELETE FROM students WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      console.warn(`[DELETE FAILED] Student with ID ${id} not found`);
      const error = new Error(`Student with ID ${id} not found`);
      error.statusCode = 404;
      return next(error);
    }
    console.log(`[DELETE] Student with ID ${id} deleted successfully`);
    res.status(200).json({
      success: true,
      message: `Student with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("[DELETE ERROR]:", error.message);
    next(error);
  }
};
