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

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  static async deleteById({ id }) {
    const education = await EducationModel.deleteOne({ id: id });
    return education;
  }
}

export { Education };
