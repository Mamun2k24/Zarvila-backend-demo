// controller/siteSettingController.js
// import fs from "fs";
// import path from "path";
// import SiteSetting from "../model/SiteSetting.model.js";

// const getOrCreate = async () => {
//   let doc = await SiteSetting.findOne();
//   if (!doc) doc = await SiteSetting.create({ logoUrl: "", brandName: "ZARVILA" });
//   return doc;
// };

// const safeUnlink = (p) => {
//   try {
//     if (p && fs.existsSync(p)) fs.unlinkSync(p);
//   } catch (_e) {}
// };

// // GET: Frontend এর জন্য
// export const getPublicSetting = async (req, res) => {
//   try {
//     const doc = await getOrCreate();
//     res.json({
//       success: true,
//       data: { logoUrl: doc.logoUrl, brandName: doc.brandName },
//     });
//   } catch (e) {
//     res.status(500).json({ success: false, message: e.message });
//   }
// };

// // POST: Logo Add/Edit (multipart/form-data: field = "logo")
// export const upsertLogo = async (req, res) => {
//   try {
//     const doc = await getOrCreate();

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'No file uploaded. Use form-data field name "logo".',
//       });
//     }

//     // old logo file delete (only if local uploads path)
//     if (doc.logoUrl?.startsWith("/uploads/")) {
//       const oldAbsolute = path.join(process.cwd(), doc.logoUrl.replace(/^\//, ""));
//       safeUnlink(oldAbsolute);
//     }

//     doc.logoUrl = `/uploads/${req.file.filename}`;
//     await doc.save();

//     res.json({ success: true, message: "Logo updated", data: { logoUrl: doc.logoUrl } });
//   } catch (e) {
//     res.status(500).json({ success: false, message: e.message });
//   }
// };

// // DELETE: Logo delete
// export const deleteLogo = async (req, res) => {
//   try {
//     const doc = await getOrCreate();

//     if (doc.logoUrl?.startsWith("/uploads/")) {
//       const absolute = path.join(process.cwd(), doc.logoUrl.replace(/^\//, ""));
//       safeUnlink(absolute);
//     }

//     doc.logoUrl = "";
//     await doc.save();

//     res.json({ success: true, message: "Logo deleted" });
//   } catch (e) {
//     res.status(500).json({ success: false, message: e.message });
//   }
// };

// // PUT: brandName ইত্যাদি settings update (optional)
// export const updateSetting = async (req, res) => {
//   try {
//     const doc = await getOrCreate();
//     const { brandName } = req.body;

//     if (typeof brandName === "string") doc.brandName = brandName;

//     await doc.save();
//     res.json({ success: true, message: "Settings updated", data: doc });
//   } catch (e) {
//     res.status(500).json({ success: false, message: e.message });
//   }
// };

import axios from "axios";
import SiteSetting from "../model/SiteSetting.model.js";
import { uploadToImgbb } from "../utils/uploadToImgbb.js";

const getOrCreate = async () => {
  let doc = await SiteSetting.findOne();
  if (!doc) {
    doc = await SiteSetting.create({
      logoUrl: "",
      logoDeleteUrl: "",
      brandName: "BHOLAMART",
    });
  }
  return doc;
};

// GET
export const getPublicSetting = async (req, res) => {
  try {
    const doc = await getOrCreate();
    res.json({
      success: true,
      data: {
        logoUrl: doc.logoUrl,
        brandName: doc.brandName,
      },
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// POST Logo Upload (ImgBB)
export const upsertLogo = async (req, res) => {
  try {
    const doc = await getOrCreate();

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Use form-data field name "logo".',
      });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "IMGBB_API_KEY missing in .env",
      });
    }

    // 🔥 যদি আগে logo থাকে → ImgBB থেকে delete করুন
    if (doc.logoDeleteUrl) {
      try {
        await axios.get(doc.logoDeleteUrl);
      } catch (_err) {}
    }

    const imgbb = await uploadToImgbb(
      req.file.buffer,
      req.file.originalname,
      apiKey
    );

    doc.logoUrl = imgbb.display_url || imgbb.url;
    doc.logoDeleteUrl = imgbb.delete_url || "";

    await doc.save();

    res.json({
      success: true,
      message: "Logo updated (ImgBB)",
      data: { logoUrl: doc.logoUrl },
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// DELETE Logo
export const deleteLogo = async (req, res) => {
  try {
    const doc = await getOrCreate();

    if (doc.logoDeleteUrl) {
      try {
        await axios.get(doc.logoDeleteUrl);
      } catch (_err) {}
    }

    doc.logoUrl = "";
    doc.logoDeleteUrl = "";
    await doc.save();

    res.json({ success: true, message: "Logo deleted (ImgBB + DB)" });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// PUT brandName update
export const updateSetting = async (req, res) => {
  try {
    const doc = await getOrCreate();
    const { brandName } = req.body;

    if (typeof brandName === "string") doc.brandName = brandName;

    await doc.save();
    res.json({ success: true, message: "Settings updated", data: doc });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};