import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class certificateService {
    static async addCertificate({ user_id, title, description, when_date }) {
      // id 는 유니크 값 부여
      const id = uuidv4();
      
      // db에 저장
      const newCertificate = { id, user_id, title, description, when_date };

      const createdNewCertificate = await Certificate.create({ newCertificate });
      createdNewCertificate.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
  
      return createdNewCertificate;
    }

    static async getCertificates({ user_id }) {
      const certificates = await Certificate.findByUserId({ user_id });
      return certificates;
    }

    static async setCertificate({ id, toUpdate }) {
      // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
      let certificate = await Certificate.findById({ id });
      // db에서 찾지 못한 경우, 에러 메시지 반환
      if (!certificate) {
        const errorMessage =
          "내역이 없습니다. 다시 한 번 확인해 주세요.";
        return { errorMessage };
      }
  
      if (toUpdate.title) {
        const fieldToUpdate = "title";
        const newValue = toUpdate.title;
        certificate = await Certificate.update({ id, fieldToUpdate, newValue });
      }
  
      if (toUpdate.description) {
        const fieldToUpdate = "description";
        const newValue = toUpdate.description;
        certificate = await Certificate.update({ id, fieldToUpdate, newValue });
      }
  
      if (toUpdate.when_date) {
        const fieldToUpdate = "when_date";
        const newValue = toUpdate.when_date;
        certificate = await Certificate.update({ id, fieldToUpdate, newValue });
      }

      return certificate;
    }

    static async deleteCertificate({ id }) {
      let certificates = await Certificate.findById({ id });
      if (!certificates) {
        const errorMessage =
          "내역이 없습니다. 다시 한 번 확인해 주세요.";
        return { errorMessage };
      }
      certificates = await Certificate.deleteById({ id });
      return certificates
    }
}

export { certificateService };