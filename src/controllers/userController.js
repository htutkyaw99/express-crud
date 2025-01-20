import { matchedData, validationResult } from "express-validator";
import db from "../../prisma/database.js";
import path from "path";

//get all users
export const getUsers = async (req, res) => {
  try {
    const users = await db.user.findMany();
    return res.status(200).json({
      statusCode: 200,
      message: "Users List",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//get user by id
export const getUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(400).json({
        statusCode: 404,
        message: "User not found!",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

export const registerUser = async (req, res) => {
  // Return validation result
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      message: "Validation failed",
      errors: result.array(),
    });
  }

  // Return validated data
  const user = matchedData(req);

  try {
    const imagePath = req.file ? path.join("uploads", req.file.filename) : "";

    console.log(imagePath);

    const newUser = await db.user.create({
      data: {
        name: user.name,
        email: user.email,
        image: imagePath,
      },
    });

    res.status(201).json({
      statusCode: 201,
      message: "User created successfully!",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  //return validation result
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      message: "Validation failed",
      errors: result.array(),
    });
  }

  //return validated data
  const updateData = matchedData(req);

  const id = parseInt(req.params.id);

  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "User Not Found!",
      });
    }

    const updateUser = await db.user.update({
      where: {
        email: user.email,
      },
      data: {
        name: updateData.name,
        email: updateData.email,
      },
    });

    return res.status(201).json({
      statusCode: 201,
      message: "User updated!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "User Not Found!",
      });
    }

    await db.user.delete({
      where: {
        email: user.email,
      },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "User deleted!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
