import { Router } from "express";
import { tryCatchAsyncHandler } from "../middlewares/tryCatchAsyncHandler";
import { educationValidate } from "../middlewares/educationValidation";
import { educationService } from "../services/educationService";

const educationRouter = Router();

// 학력 정보 추가
educationRouter.post(
  "/education",
  educationValidate,
  async (req, res, next) => {
    await tryCatchAsyncHandler(req, res, next, (req) => {
      const { user_id, school, major, position } = req.body;
      const newEducation = educationService.addEducation({
        user_id,
        school,
        major,
        position,
      });
      return newEducation;
    });
  }
);

// 학력 정보 수정
educationRouter.put("/educations/:id", async (req, res, next) => {
  await tryCatchAsyncHandler(req, res, next, (req) => {
    const id = req.params.id;
    const toUpdate = req.body;
    const updatedEducation = educationService.setEducation({
      id,
      toUpdate,
    });
    return updatedEducation;
  });
});

// 학력 정보 조회
educationRouter.get("/educations/:id", async (req, res, next) => {
  await tryCatchAsyncHandler(req, res, next, (req) => {
    const user_id = req.params.id;
    const educations = educationService.getEducations({ user_id });
    return educations;
  });
});

// 학력 정보 삭제
educationRouter.delete("/educations/:id", async (req, res, next) => {
  await tryCatchAsyncHandler(req, res, next, (req) => {
    const id = req.params.id;
    const deletedEducation = educationService.deleteEducation({ id });
    return deletedEducation;
  });
});

export { educationRouter };
