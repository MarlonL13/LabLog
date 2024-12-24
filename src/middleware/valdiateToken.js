import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT token in request headers

 * @param {string} req.headers.authorization - Authorization header containing the JWT token
 * @param {Function} next - Express next middleware function
 * @returns {Object} Returns 401 if token is missing, 403 if token is invalid, or calls next() if valid
 * @throws {Error} When token verification fails
 */
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

/**
 * Creates a middleware function that checks if a user has sufficient role permissions
 * @param {string} role - The minimum role required to access the route ('student', 'researcher', 'technician', or 'coordinator')
 * @returns {function} Middleware function that validates user role
 * @throws {Response} Returns 403 status if user's role is insufficient
 */
const checkRole = (role) => (req, res, next) => {
  const roleNumber = {
    student: 1,
    researcher: 2,
    technician: 3,
    coordinator: 4,
  };
  const userRole = roleNumber[req.user.role];
  const minRole = roleNumber[role];

  if (userRole >= minRole) {
    return next();
  }
  return res.status(403).json({ message: "Access Forbidden" });
};

export { verifyToken, checkRole };
