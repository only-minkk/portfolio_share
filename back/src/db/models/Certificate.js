import { CertificateModel } from "../schemas/certificate.js";

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

  static async update(id, toUpdate) {
    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      { id: id },
      toUpdate,
      { returnOriginal: false }
    );
    return updatedCertificate;
  }

  static async deleteById({ id }) {
    const certificate = await CertificateModel.deleteOne({ id: id });
    return certificate;
  }
}

export { Certificate };
