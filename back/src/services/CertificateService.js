import { Certificate } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";
import {
  NotFound,
  CreateFailed,
  GetFailed,
  UpdateFailed,
  DeleteFailed,
} from "../utils/CustomError.js";
import { errorCatch } from "../utils/errorCatch.js";
import { successMessage } from "../utils/successMessage.js";

class CertificateService {
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

    // 변경된 값 업데이트
    const updatedCertificate = await Certificate.update(id, toUpdate);

    // update() 실패시 에러.
    errorCatch(updatedCertificate, UpdateFailed);

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

export { CertificateService };
