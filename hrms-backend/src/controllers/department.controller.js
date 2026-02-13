import prisma from '../config/prisma.js';

export const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany();

    res.status(200).json(departments);
  } catch (error) {
    console.error('GET DEPARTMENTS ERROR:', error);
    res.status(500).json({
      message: 'Failed to fetch departments'
    });
  }
};
