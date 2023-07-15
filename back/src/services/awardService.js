import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class awardService {
  // 수상 내역 등록
  static async addAward({ user_id, title, description }) {
    //   // id 는 유니크 값 부여
    const id = uuidv4();

    // db에 저장
    const newAward = { id, user_id, title, description };

    const createdNewAward = await Award.create({ newAward });
    createdNewAward.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewAward;
  }

  // 유저의 수상 내역 조회
  static async getAwards({ user_id }) {
    const awards = await Award.findByUserId({ user_id });
    return awards;
  }

  // 수상 내역 수정
  static async setAward({ id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let award = await Award.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const fieldToUpdate = [];

    // 변경된 필드의 key 값만 추출하여 fieldToUpdate 빈 배열에 push.
    for (const key in toUpdate) {
      fieldToUpdate.push(key);
    }

    // 모든 필드가 변경됐을 경우 save() 메서드로 한 번에 저장.
    if (Object.keys(toUpdate).length === 2) {
      award.title = toUpdate.title;
      award.description = toUpdate.description;
      const newAward = await award.save();
      return newAward;
    }

    // update() 메서드로 변경된 필드만 업데이트
    fieldToUpdate.forEach((field) => {
      const newValue = toUpdate[field];
      award = Award.update({ id, fieldToUpdate: field, newValue });
    });

    return award;
  }

  // 수상 내역 삭제
  static async deleteAward({ id }) {
    let awards = await Award.findById({ id });

    if (!awards) {
      const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    awards = await Award.deleteById({ id });

    return awards;
  }
}

export { awardService };
