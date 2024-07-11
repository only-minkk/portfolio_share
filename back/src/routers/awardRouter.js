import { Router } from "express";
import {
  awardValidate,
  awardUpdateValidate,
} from "../validation/awardValidation.js";
import { tryCatchAsyncHandler } from "../utils/tryCatchAsyncHandler.js";
import { AwardService } from "../services/AwardService.js";

const awardRouter = Router();

// 수상 내역 추가
awardRouter.post(
  "/award",
  awardValidate,
  tryCatchAsyncHandler(async (req) => {
    const { user_id, title, description } = req.body;
    const newAward = await AwardService.addAward({
      user_id,
      title,
      description,
    });
    return newAward;
  })
);

// 수상 내역 조회
awardRouter.get(
  "/awards/:id",
  tryCatchAsyncHandler(async (req) => {
    const user_id = req.params.id;
    const awards = await AwardService.getAwards({ user_id });
    return awards;
  })
);

// 수상 내역 수정
awardRouter.put(
  "/awards/:id",
  awardUpdateValidate,
  tryCatchAsyncHandler(async (req) => {
    const id = req.params.id;
    const toUpdate = req.body;
    const updatedAward = await AwardService.setAward({ id, toUpdate });
    return updatedAward;
  })
);

// 수상 내역 삭제
awardRouter.delete(
  "/awards/:id",
  tryCatchAsyncHandler(async (req) => {
    const id = req.params.id;
    const deletedAward = await AwardService.deleteAward({ id });
    return deletedAward;
  })
);

export { awardRouter };
