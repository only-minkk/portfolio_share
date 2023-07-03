import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {
    static async addEducation({ user_id, school, major, position }) {
      // id 는 유니크 값 부여
      const id = uuidv4();
      
      // db에 저장
      const newEducation = { id, user_id, school, major, position };

      const createdNewEducation = await Education.create({ newEducation });
      createdNewEducation.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
  
      return createdNewEducation;
    }

    static async setEducation({ id, toUpdate }) {
      // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
      let education = await Education.findById({ id });
  
      // db에서 찾지 못한 경우, 에러 메시지 반환
      if (!education) {
        const errorMessage =
          "내역이 없습니다. 다시 한 번 확인해 주세요.";
        return { errorMessage };
      }
  
      if (toUpdate.school) {
        const fieldToUpdate = "school";
        const newValue = toUpdate.school;
        education = await Education.update({ id, fieldToUpdate, newValue });
      }
  
      if (toUpdate.major) {
        const fieldToUpdate = "major";
        const newValue = toUpdate.major;
        education = await Education.update({ id, fieldToUpdate, newValue });
      }
  
      if (toUpdate.position) {
        const fieldToUpdate = "position";
        const newValue = toUpdate.position;
        education = await Education.update({ id, fieldToUpdate, newValue });
      }

      return education;
    }

    static async getEducations({ user_id }) {
        const educations = await Education.findByUserId({ user_id });
        return educations;
      }

      static async deleteEducation({ id }) {
        let educations = await Education.findById({ id });
        if (!educations) {
          const errorMessage =
            "내역이 없습니다. 다시 한 번 확인해 주세요.";
          return { errorMessage };
        }
        educations = await Education.deleteById({ id });
        return educations
      }
  }
  
  export { educationService };