import { Router } from "express";
import {
  awardValidate,
  awardUpdateValidate,
} from "../middlewares/awardValidation";
import { tryCatchAsyncHandler } from "../util/tryCatchAsyncHandler";
import { awardService } from "../services/awardService";

const awardRouter = Router();

// 수상 내역 추가
awardRouter.post(
  "/award",
  awardValidate,
  tryCatchAsyncHandler(async (req) => {
    const { user_id, title, description } = req.body;
    const newAward = await awardService.addAward({
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
    const awards = await awardService.getAwards({ user_id });
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
    const updatedAward = await awardService.setAward({ id, toUpdate });
    return updatedAward;
  })
);

// 수상 내역 삭제
awardRouter.delete(
  "/awards/:id",
  tryCatchAsyncHandler(async (req) => {
    const id = req.params.id;
    const deletedAward = await awardService.deleteAward({ id });
    return deletedAward;
  })
);

export { awardRouter };
