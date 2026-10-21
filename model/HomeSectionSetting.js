import mongoose from "mongoose";

const { Schema } = mongoose;

const subtitleSchema = new Schema(
  {
    text: { type: String, trim: true, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);

const homeSectionSettingSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      enum: ["men", "women", "kids", "accessories"],
      index: true,
    },

    sectionTitle: { type: String, trim: true, required: true },

    subtitles: { type: [subtitleSchema], default: [] },

    isEnabled: { type: Boolean, default: true },

  categoryId: {
  type: Schema.Types.ObjectId,
  ref: "Category",
  default: null,
  index: true,
},
  },
  { timestamps: true }
);

const HomeSectionSetting =
  mongoose.models.HomeSectionSetting ||
  mongoose.model("HomeSectionSetting", homeSectionSettingSchema);

export default HomeSectionSetting;