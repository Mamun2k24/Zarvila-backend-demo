
import User from "../model/user.model.js";

// };
export const isAdmin = async (req, res, next) => {
  try {
    // console.log("isAdmin req.user =", req.user);
    if (!req.user?.id) return res.status(401).json({ message: "Not authenticated" });

    const user = await User.findById(req.user.id).select("role");
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};