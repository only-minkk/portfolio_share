import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findByUserId({ user_id }) {
    const user = await EducationModel.find({ user_id: user_id });
    return user;
  }

  static async findById({ id }) {
    const education = await EducationModel.findOne({ id: id });
    return education;
  }

  static async update(id, toUpdate) {
    const updatedEducation = await EducationModel.findOneAndUpdate(
      { id: id },
      toUpdate,
      { returnOriginal: false }
    );
    return updatedEducation;
  }

  static async deleteById({ id }) {
    const education = await EducationModel.deleteOne({ id: id });
    return education;
  }
}

export { Education };
