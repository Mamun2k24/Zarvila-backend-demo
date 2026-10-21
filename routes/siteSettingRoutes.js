// // routes/siteSettingRoutes.js
// import { Router } from "express";
// import upload from "../middleware/upload.js";
// import {
//   getPublicSetting,
//   upsertLogo,
//   deleteLogo,
//   updateSetting,
// } from "../controller/siteSettingController.js";

// const router = Router();

// router.get("/public", getPublicSetting);
// router.put("/", updateSetting);

// // Logo add/edit (same endpoint)
// router.post("/logo", upload.single("logo"), upsertLogo);

// // Logo delete
// router.delete("/logo", deleteLogo);

// export default router;

import { Router } from "express";
import uploadMemory from "../middleware/uploadMemory.js";
import {
  getPublicSetting,
  upsertLogo,
  deleteLogo,
  updateSetting,
} from "../controller/siteSettingController.js";

const router = Router();

router.get("/public", getPublicSetting);
router.put("/", updateSetting);

// ImgBB logo add/edit
router.post("/logo", uploadMemory.single("logo"), upsertLogo);

// logo delete
router.delete("/logo", deleteLogo);

export default router;