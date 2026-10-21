
// middleware/protect.js
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const protect = async (req, res, next) => {
  try {
    // 1) Header token: Authorization: Bearer <token>
    let token = req.headers.authorization?.split(" ")[1];

    // 2) Optional: cookie token (যদি তুমি cookie ব্যবহার করো)
    // if (!token && req.cookies?.token) token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Normalize user id field
    const uid = decoded.id || decoded._id || decoded.userId;

    if (!uid) {
      return res.status(401).json({ message: "Unauthorized (invalid token payload)." });
    }

    // ✅ IMPORTANT: set both id and _id so controllers work
    req.user = {
      ...decoded,
      id: uid,
      _id: uid,
    };
// console.log("decoded token =", decoded);
// console.log("req.user set =", {
//   ...decoded,
//   id: uid,
//   _id: uid,
// });
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export const ensureAuth = protect;

export const ensureAdmin = async (req, res, next) => {
  try {
    const uid = req.user?.id || req.user?._id;
    if (!uid) return res.status(401).json({ message: "Not authenticated" });

    const user = await User.findById(uid);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    next();
  } catch (err) {
    console.error("ensureAdmin error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
