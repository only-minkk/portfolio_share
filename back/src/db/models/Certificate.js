import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findByUserId({ user_id }) {
    const user = await CertificateModel.find({ user_id: user_id });
    return user;
  }

  static async findById({ id }) {
    const certificate = await CertificateModel.findOne({ id: id });
    return certificate;
  }

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }

  static async deleteById({ id }) {
    const certificate = await CertificateModel.deleteOne({ id: id });
    return certificate;
  }
}

export { Certificate };
