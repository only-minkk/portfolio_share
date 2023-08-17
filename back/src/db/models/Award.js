import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findByUserId({ user_id }) {
    const user = await AwardModel.find({ user_id: user_id });
    return user;
  }

  static async findById({ id }) {
    const award = await AwardModel.findOne({ id: id });
    return award;
  }

  static async update(id, toUpdate) {
    const updatedAward = await AwardModel.findOneAndUpdate(
      { id: id },
      toUpdate,
      {
        returnOriginal: false,
      }
    );
    return updatedAward;
  }

  static async deleteById({ id }) {
    const award = await AwardModel.deleteOne({ id: id });
    return award;
  }
}

export { Award };
