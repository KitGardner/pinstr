import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const FavoriteSchema = new Schema(
  {
    UserProfile: { type: ObjectId, required: true, ref: "Profile" },
    Pin: { type: ObjectId, required: true, ref: "Pin" }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

FavoriteSchema.index({ UserProfile: 1, Pin: 1 })

export default FavoriteSchema;