// model/SiteSetting.model.js
// import mongoose from "mongoose";

// const siteSettingSchema = new mongoose.Schema(
//   {
//     logoUrl: { type: String, default: "" },     // e.g. /uploads/xxx.png
//     brandName: { type: String, default: "ZARVILA" },
//   },
//   { timestamps: true }
// );

// const SiteSetting = mongoose.model("SiteSetting", siteSettingSchema);
// export default SiteSetting;
import mongoose from "mongoose";

const siteSettingSchema = new mongoose.Schema(
  {
    // ImgBB image public URL
    logoUrl: { type: String, default: "" },

    // ImgBB delete URL (image delete করার জন্য)
    logoDeleteUrl: { type: String, default: "" },

    brandName: { type: String, default: "BHOLAMART" },
  },
  { timestamps: true }
);

const SiteSetting = mongoose.model("SiteSetting", siteSettingSchema);
export default SiteSetting;