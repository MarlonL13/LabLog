import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access token not providade" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: `${err.name}: ${err.message}` });
  }
};

const checkRole = (role) => (req, res, next) => {
  const roleNumber = {
    student: 1,
    researcher: 2,
    technician: 3,
    coordinator: 4,
    test: 5,
  };
  const userRole = roleNumber[req.user.role];
  const minRole = roleNumber[role];

  if (userRole >= minRole) {
    return next();
  }
  return res.status(403).json({ message: "Access Forbidden" });
};

export { verifyToken, checkRole };
