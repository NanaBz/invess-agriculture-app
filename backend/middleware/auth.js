// ...new file...
const jwt = require('jsonwebtoken');

/**
 * Verifies Bearer JWT token in Authorization header.
 * Attaches decoded token payload to req.user.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // expected to contain at least { id, role, ... }
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
}

/**
 * Role-based guard.
 * @param {string|string[]} roles - role string or array of allowed roles
 */
function requireRole(roles) {
  const allowed = Array.isArray(roles) ? roles : [roles];
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (allowed.includes(req.user.role)) return next();
    return res.status(403).json({ message: 'Forbidden: insufficient role' });
  };
}

module.exports = { authMiddleware, requireRole };