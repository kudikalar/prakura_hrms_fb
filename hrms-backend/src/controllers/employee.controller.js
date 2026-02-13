import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';

const VALID_ROLES = ['ADMIN', 'HR', 'EMPLOYEE'];

/**
 * CREATE EMPLOYEE
 * POST /api/employees
 */
export const createEmployee = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({
        message: 'Name, email and role are required'
      });
    }

    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({
        message: 'Invalid role'
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'Employee already exists with this email'
      });
    }

    const hashedPassword = await bcrypt.hash('Welcome@123', 10);

    const employee = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.status(201).json({
      employee
    });

  } catch (error) {
    console.error('CREATE EMPLOYEE ERROR:', error);
    res.status(500).json({
      message: 'Failed to create employee'
    });
  }
};

/**
 * GET EMPLOYEE BY ID
 * GET /api/employees/:id
 */
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (!employee) {
      return res.status(404).json({
        message: 'Employee not found'
      });
    }

    res.status(200).json(employee);

  } catch (error) {
    console.error('GET EMPLOYEE ERROR:', error);
    res.status(500).json({
      message: 'Failed to fetch employee'
    });
  }
};

/**
 * UPDATE EMPLOYEE
 * PUT /api/employees/:id
 */
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Only allow fields that exist in Prisma user model
    const allowedFields = ['name', 'email', 'role'];
    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: 'No valid fields provided for update'
      });
    }

    const employee = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.status(200).json(employee);

  } catch (error) {
    console.error('UPDATE EMPLOYEE ERROR:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({
        message: 'Employee not found'
      });
    }

    res.status(500).json({
      message: 'Failed to update employee'
    });
  }
};


/**
 * DELETE EMPLOYEE
 * DELETE /api/employees/:id
 */
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({
      message: 'Employee deleted successfully'
    });

  } catch (error) {
    console.error('DELETE EMPLOYEE ERROR:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({
        message: 'Employee not found'
      });
    }

    res.status(500).json({
      message: 'Failed to delete employee'
    });
  }
};

