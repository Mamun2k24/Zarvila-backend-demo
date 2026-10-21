import express from "express";
import {
  getMyNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../controller/notificationController.js";
import { protect } from "../middleware/protect.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/", protect, isAdmin, getMyNotifications);
router.get("/unread-count", protect, isAdmin, getUnreadNotificationCount);
router.patch("/:id/read", protect, isAdmin, markNotificationAsRead);
router.patch("/mark-all-read", protect, isAdmin, markAllNotificationsAsRead);

export default router;