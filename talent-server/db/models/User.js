import { UserModel } from "../schemas/user.js";

class User {
  static async create({ USER }) {
    const NEW_USER = await UserModel.create(USER);
    return NEW_USER
  }
  static async findById({ id }) {
    const USER = await UserModel.findOne({ id });
    return USER;
  }
  static async findByName({name}){
    const USER = await UserModel.findOne({name})
    return USER
  }
  static async updateTalent({updateAmount, id}){
    const USER =  await UserModel.findOne({id})
    const originalTalent = USER?.talent

    const updatedTalent = originalTalent + updateAmount

    const FILTER = { id };
    const UPDATE = {
      $set: { talent: updatedTalent },
    };
    const OPTION = { returnOriginal: false };

    const UPDATED = await UserModel.findOneAndUpdate(FILTER, UPDATE, OPTION);

    return UPDATED;
  }
}

export { User };
