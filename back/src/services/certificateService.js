import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";
import { NotFound } from "../middlewares/CustomError";

class certificateService {
  // 자격증 추가
  static async addCertificate({ user_id, title, description, when_date }) {
    // id 는 유니크 값 부여
    const id = uuidv4();

    // db에 저장
    const newCertificate = { id, user_id, title, description, when_date };

    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewCertificate;
  }

  // 자격증 조회
  static async getCertificates({ user_id }) {
    const certificates = await Certificate.findByUserId({ user_id });
    return certificates;
  }

  // 자격증 수정
  static async setCertificate({ id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let certificate = await Certificate.findById({ id });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      throw new NotFound();
    }

    // 모든 필드가 변경됐을 경우 save() 메서드로 한 번에 저장.
    if (Object.keys(toUpdate).length === 3) {
      certificate.title = toUpdate.title;
      certificate.description = toUpdate.description;
      certificate.when_date = toUpdate.when_date;
      const newCertificate = await certificate.save();
      return newCertificate;
    }

    // 변경된 필드의 키 값을 fieldToUpdate 에 선언.
    const fieldToUpdate = Object.keys(toUpdate);

    // 변경된 필드만 update() 메서드로 업데이트
    fieldToUpdate.forEach((field) => {
      const newValue = toUpdate[field];
      certificate = Certificate.update({ id, fieldToUpdate: field, newValue });
    });

    return certificate;
  }

  // 자격증 삭제.
  static async deleteCertificate({ id }) {
    let certificates = await Certificate.findById({ id });
    if (!certificates) {
      throw new NotFound();
    }
    certificates = await Certificate.deleteById({ id });
    return certificates;
  }
}

export { certificateService };
