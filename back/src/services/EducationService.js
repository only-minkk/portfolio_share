import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";
import {
  NotFound,
  CreateFailed,
  GetFailed,
  UpdateFailed,
  DeleteFailed,
} from "../utils/CustomError";
import { errorCatch } from "../utils/errorCatch";
import { successMessage } from "../utils/successMessage";

class EducationService {
  // 학력 추가
  static async addEducation({ user_id, school, major, position }) {
    // id 는 유니크 값 부여
    const id = uuidv4();

    const newEducation = { id, user_id, school, major, position };

    // db에 저장
    const createdNewEducation = await Education.create({ newEducation });

    // 등록 실패시 에러
    errorCatch(createdNewEducation, CreateFailed);

    return createdNewEducation;
  }

  // 학력 조회
  static async getEducations({ user_id }) {
    const educations = await Education.findByUserId({ user_id });

    // 조회 실패시 에러
    errorCatch(educations, GetFailed);

    return educations;
  }

  // 학력 수정
  static async setEducation({ id, toUpdate }) {
    // 우선 해당 id 의 학력이 db에 존재하는지 여부 확인
    let education = await Education.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    errorCatch(education, NotFound);

    // 변경된 값 업데이트
    const updatedEducation = await Education.update(id, toUpdate);

    // update() 실패시 에러
    errorCatch(updatedEducation, UpdateFailed);

    return successMessage.updateSuccessMessage;
  }

  // 학력 삭제
  static async deleteEducation({ id }) {
    // 해당 내역 조회.
    let educations = await Education.findById({ id });

    // 해당 내역 없으면 에러.
    errorCatch(educations, NotFound);

    // 해당 내역 삭제.
    educations = await Education.deleteById({ id });

    // 해당 내역 삭제 실패시 에러.
    errorCatch(educations, DeleteFailed);

    return successMessage.deleteSuccessMessage;
  }
}

export { EducationService };
