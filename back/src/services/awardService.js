import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class awardService {
    static async addAward({ user_id, title, description }) {
    //   // id 는 유니크 값 부여
      const id = uuidv4();
      
      // db에 저장
      const newAward = { id, user_id, title, description };

      const createdNewAward = await Award.create({ newAward });
      createdNewAward.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
  
      return createdNewAward;
    }

    static async setAward({ id, toUpdate }) {
      // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
      let award = await Award.findById({ id });
      
      // db에서 찾지 못한 경우, 에러 메시지 반환
      if (!award) {
        const errorMessage =
          "내역이 없습니다. 다시 한 번 확인해 주세요.";
        return { errorMessage };
      }
  
      if (toUpdate.title) {
        const fieldToUpdate = "title";
        const newValue = toUpdate.title;
        award = await Award.update({ id, fieldToUpdate, newValue });
      }
  
      if (toUpdate.description) {
        const fieldToUpdate = "description";
        const newValue = toUpdate.description;
        award = await Award.update({ id, fieldToUpdate, newValue });
      }

      return award;
    }

    static async getAwards({ user_id }) {
        const awards = await Award.findByUserId({ user_id });
        return awards;
      }

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