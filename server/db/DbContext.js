import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import { PinSchema } from "../models/Pin";
import FavoriteSchema from "../models/Favorite";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);

  Pins = mongoose.model("Pin", PinSchema);

  Profile = mongoose.model("Profile", ProfileSchema);

  Favorite = mongoose.model("Favorite", FavoriteSchema);
}

export const dbContext = new DbContext();
