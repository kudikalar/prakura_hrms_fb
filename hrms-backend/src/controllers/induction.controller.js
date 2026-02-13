import prisma from '../config/prisma.js';

// Assign induction to employee
export const assignInduction = async (req, res) => {
  const { employeeId } = req.body;

  const induction = await prisma.induction.create({
    data: {
      employeeId,
      status: 'NOT_STARTED'
    }
  });

  res.status(201).json(induction);
};

// Get induction by employee
export const getEmployeeInduction = async (req, res) => {
  const { employeeId } = req.params;

  const induction = await prisma.induction.findFirst({
    where: { employeeId: Number(employeeId) }
  });

  if (!induction)
    return res.status(404).json({ message: 'Induction not assigned' });

  res.json(induction);
};

// Update induction status
export const updateInductionStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const induction = await prisma.induction.update({
    where: { id: Number(id) },
    data: {
      status,
      completedAt: status === 'COMPLETED' ? new Date() : null
    }
  });

  res.json(induction);
};
