import { Award } from "../db";
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

class awardService {
  // 수상 내역 등록
  static async addAward({ user_id, title, description }) {
    // id 는 유니크 값 부여
    const id = uuidv4();

    const newAward = { id, user_id, title, description };

    // db에 저장
    const createdNewAward = await Award.create({ newAward });

    // creat() 실패시 에러.
    errorCatch(createdNewAward, CreateFailed);

    return createdNewAward;
  }

  // 유저의 수상 내역 조회
  static async getAwards({ user_id }) {
    const awards = await Award.findByUserId({ user_id });

    // 조회 실패시 에러
    errorCatch(awards, GetFailed);

    return awards;
  }

  // 수상 내역 수정
  static async setAward({ id, toUpdate }) {
    // 우선 해당 id 의 award가 db에 존재하는지 여부 확인
    let award = await Award.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    errorCatch(award, NotFound);

    // 변경된 값 업데이트
    const updatedAward = await Award.update(id, toUpdate);

    // update() 실패시 에러
    errorCatch(updatedAward, UpdateFailed);

    return successMessage.updateSuccessMessage;
  }

  // 수상 내역 삭제
  static async deleteAward({ id }) {
    // 해당 내역 조회
    let awards = await Award.findById({ id });

    // 해당 내역 없으면 에러
    errorCatch(awards, NotFound);

    // 해당 내역 삭제
    awards = await Award.deleteById({ id });

    // 해당 내역 삭제 실패시 에러
    errorCatch(awards, DeleteFailed);

    return successMessage.deleteSuccessMessage;
  }
}

export { awardService };
