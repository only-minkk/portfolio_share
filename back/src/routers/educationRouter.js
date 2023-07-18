import { Router } from "express";
import {
  educationValidate,
  educationUpdateValidate,
} from "../middlewares/educationValidation";
import { tryCatchAsyncHandler } from "../middlewares/tryCatchAsyncHandler";
import { educationService } from "../services/educationService";

const educationRouter = Router();

// 학력 정보 추가
educationRouter.post(
  "/education",
  educationValidate,
  async (req, res, next) => {
    await tryCatchAsyncHandler(req, res, next, async (req) => {
      const { user_id, school, major, position } = req.body;
      const newEducation = await educationService.addEducation({
        user_id,
        school,
        major,
        position,
      });
      return newEducation;
    });
  }
);

// 학력 정보 조회
educationRouter.get("/educations/:id", async (req, res, next) => {
  await tryCatchAsyncHandler(req, res, next, async (req) => {
    const user_id = req.params.id;
    const educations = await educationService.getEducations({ user_id });
    return educations;
  });
});

// 학력 정보 수정
educationRouter.put(
  "/educations/:id",
  educationUpdateValidate,
  async (req, res, next) => {
    await tryCatchAsyncHandler(req, res, next, async (req) => {
      const id = req.params.id;
      const toUpdate = req.body;
      const updatedEducation = await educationService.setEducation({
        id,
        toUpdate,
      });
      return updatedEducation;
    });
  }
);

// 학력 정보 삭제
educationRouter.delete("/educations/:id", async (req, res, next) => {
  await tryCatchAsyncHandler(req, res, next, async (req) => {
    const id = req.params.id;
    const deletedEducation = await educationService.deleteEducation({ id });
    return deletedEducation;
  });
});

export { educationRouter };
