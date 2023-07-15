import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {
  // 학력 추가
  static async addEducation({ user_id, school, major, position }) {
    // id 는 유니크 값 부여
    const id = uuidv4();

    // db에 저장
    const newEducation = { id, user_id, school, major, position };

    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewEducation;
  }

  // 학력 조회
  static async getEducations({ user_id }) {
    const educations = await Education.findByUserId({ user_id });
    return educations;
  }

  // 학력 수정
  static async setEducation({ id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let education = await Education.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 모든 필드가 변경됐을 경우 save() 메서드로 한 번에 저장.
    if (Object.keys(toUpdate).length === 3) {
      education.school = toUpdate.school;
      education.major = toUpdate.major;
      education.position = toUpdate.position;
      const newEducation = await education.save();
      return newEducation;
    }

    const fieldToUpdate = [];

    // 변경된 필드의 key 값만 추출하여 fieldToUpdate 빈 배열에 push.
    for (const key in toUpdate) {
      fieldToUpdate.push(key);
    }

    // update() 메서드로 변경된 필드만 업데이트.
    fieldToUpdate.forEach((field) => {
      const newValue = toUpdate[field];
      education = Education.update({ id, fieldToUpdate: field, newValue });
    });

    return education;
  }

  // 학력 삭제
  static async deleteEducation({ id }) {
    let educations = await Education.findById({ id });
    if (!educations) {
      const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    educations = await Education.deleteById({ id });
    return educations;
  }
}

export { educationService };
