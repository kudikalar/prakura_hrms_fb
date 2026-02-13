export const authorize = (...roles) => {
  return (req, res, next) => {

    // ✅ Check if authMiddleware ran
    if (!req.user) {
      return res.status(401).json({
        message: 'Unauthorized: User not authenticated'
      });
    }

    // ✅ Check role exists
    if (!req.user.role) {
      return res.status(403).json({
        message: 'Forbidden: Role not assigned'
      });
    }

    // ✅ Check allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access denied'
      });
    }

    next();
  };
};