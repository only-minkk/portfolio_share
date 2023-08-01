import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";
import {
  NotFound,
  CreateFailed,
  GetFailed,
  UpdateFailed,
  DeleteFailed,
} from "../middlewares/CustomError";
import { errorCatch } from "../middlewares/errorMiddleware";
import { successMessage } from "../utils/successMessage";

class certificateService {
  // 자격증 추가
  static async addCertificate({ user_id, title, description, when_date }) {
    // id 는 유니크 값 부여
    const id = uuidv4();

    const newCertificate = { id, user_id, title, description, when_date };

    // db에 저장
    const createdNewCertificate = await Certificate.create({ newCertificate });

    // 등록에 실패할시 에러.
    errorCatch(createdNewCertificate, CreateFailed);

    return createdNewCertificate;
  }

  // 자격증 조회
  static async getCertificates({ user_id }) {
    const certificates = await Certificate.findByUserId({ user_id });

    // 조회 실패시 에러
    errorCatch(certificates, GetFailed);

    return certificates;
  }

  // 자격증 수정
  static async setCertificate({ id, toUpdate }) {
    // 우선 해당 id 의 자격증이 db에 존재하는지 여부 확인
    let certificate = await Certificate.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    errorCatch(certificate, NotFound);

    // 모든 필드가 변경됐을 경우 save() 메서드로 한 번에 저장.
    if (Object.keys(toUpdate).length === 3) {
      certificate.title = toUpdate.title;
      certificate.description = toUpdate.description;
      certificate.when_date = toUpdate.when_date;

      const newCertificate = await certificate.save();

      // save() 실패시 에러.
      errorCatch(newCertificate, UpdateFailed);

      return successMessage.updateSuccessMessage;
    }

    // 변경된 필드의 키 값을 fieldToUpdate 에 선언.
    const fieldToUpdate = Object.keys(toUpdate);

    // 변경된 필드만 update() 메서드로 업데이트
    for (const field of fieldToUpdate) {
      const newValue = toUpdate[field];
      certificate = await Certificate.update({
        id,
        fieldToUpdate: field,
        newValue,
      });
    }

    // update() 실패시 에러.
    errorCatch(certificate, UpdateFailed);

    return successMessage.updateSuccessMessage;
  }

  // 자격증 삭제.
  static async deleteCertificate({ id }) {
    // 해당 내역 조회.
    let certificates = await Certificate.findById({ id });

    // 해당 내역 없으면 에러.
    errorCatch(certificates, NotFound);

    // 해당 내역 삭제.
    certificates = await Certificate.deleteById({ id });

    // 해당 내역 삭제 실패시 에러.
    errorCatch(certificates, DeleteFailed);

    return successMessage.deleteSuccessMessage;
  }
}

export { certificateService };
