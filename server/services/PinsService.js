import { dbContext } from "../db/DbContext";
import { profilesService } from "./ProfilesService";
import { BadRequest, Unexpected } from "../utils/Errors.js"

class PinsService {
  async getAll(query = {}) {
    // TODO BL goes here
    return await dbContext.Pins.find({ ...query, deleted: false }).populate("creator", "name picture -email");
  }
  async getOne(id) {
    // TODO BL goes here
    return await dbContext.Pins.findById(id).populate("creator", "name picture -email");
  }
  async create(pin) {
    return await dbContext.Pins.create(pin);
  }
  async delete(userInfo, pinId) {
    let profile = await profilesService.getProfile(userInfo);
    let existingPin = await dbContext.Pins.findById(pinId);

    if (!profile.subs.includes(userInfo.sub)) {
      throw new BadRequest("You are not the user matched to this email");
    }

    if (!existingPin) {
      throw new BadRequest("Did not find a pin with id: " + pinId);
    }

    if (existingPin.creatorEmail != userInfo.email) {
      throw new BadRequest("You are not the creator of this pin.");
    }

    let updatedPin = await dbContext.Pins.findByIdAndUpdate(pinId, { deleted: true }, { new: true });

    if (!updatedPin) {
      throw new Unexpected("An unexpected error occurred in the server");
    }

    return {
      id: updatedPin._id
    };

  }
}

export const pinsService = new PinsService();