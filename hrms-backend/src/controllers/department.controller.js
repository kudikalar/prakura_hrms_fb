import prisma from '../config/prisma.js';

/**
 * ✅ GET ALL DEPARTMENTS
 */
export const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(departments);
  } catch (error) {
    console.error('GET DEPARTMENTS ERROR:', error);
    res.status(500).json({ message: 'Failed to fetch departments' });
  }
};


/**
 * ✅ GET DEPARTMENT BY ID
 */
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await prisma.department.findUnique({
      where: { id: Number(id) }
    });

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json(department);
  } catch (error) {
    console.error('GET DEPARTMENT BY ID ERROR:', error);
    res.status(500).json({ message: 'Failed to fetch department' });
  }
};


/**
 * ✅ CREATE DEPARTMENT
 */
export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Department name is required' });
    }

    const department = await prisma.department.create({
      data: { name }
    });

    res.status(201).json({
      message: 'Department created successfully',
      department
    });

  } catch (error) {

    if (error.code === 'P2002') {
      return res.status(400).json({
        message: 'Department already exists'
      });
    }

    console.error('CREATE DEPARTMENT ERROR:', error);
    res.status(500).json({ message: 'Failed to create department' });
  }
};


/**
 * ✅ UPDATE DEPARTMENT
 */
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingDepartment = await prisma.department.findUnique({
      where: { id: Number(id) }
    });

    if (!existingDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const updatedDepartment = await prisma.department.update({
      where: { id: Number(id) },
      data: { name }
    });

    res.status(200).json({
      message: 'Department updated successfully',
      department: updatedDepartment
    });

  } catch (error) {
    console.error('UPDATE DEPARTMENT ERROR:', error);
    res.status(500).json({ message: 'Failed to update department' });
  }
};


/**
 * ✅ DELETE DEPARTMENT
 */
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const existingDepartment = await prisma.department.findUnique({
      where: { id: Number(id) }
    });

    if (!existingDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }

    await prisma.department.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({
      message: 'Department deleted successfully'
    });

  } catch (error) {

    // If department is linked to employees
    if (error.code === 'P2003') {
      return res.status(400).json({
        message: 'Cannot delete department with assigned employees'
      });
    }

    console.error('DELETE DEPARTMENT ERROR:', error);
    res.status(500).json({ message: 'Failed to delete department' });
  }
};