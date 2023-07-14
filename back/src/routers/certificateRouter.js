import { Router } from "express";
import { certificateValidate } from "../middlewares/certificateValidation";
import { tryCatchAsycHandler } from "../middlewares/tryCatchAsycHandler";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

// 자격증 정보 추가
certificateRouter.post(
  "/certificate",
  certificateValidate,
  async (req, res, next) => {
    await tryCatchAsycHandler(req, res, next, (req) => {
      const { user_id, title, description, when_date } = req.body;
      const newCertificate = certificateService.addCertificate({
        user_id,
        title,
        description,
        when_date,
      });
      return newCertificate;
    });
  }
);

// 자격증 정보 조회
certificateRouter.get("/certificates/:id", async (req, res, next) => {
  await tryCatchAsycHandler(req, res, next, (req) => {
    const user_id = req.params.id;
    const certificates = certificateService.getCertificates({ user_id });
    return certificates;
  });
});

// 자격증 정보 수정
certificateRouter.put("/certificates/:id", async (req, res, next) => {
  await tryCatchAsycHandler(req, res, next, (req) => {
    const id = req.params.id;
    const toUpdate = req.body;
    const updatedCertificate = certificateService.setCertificate({
      id,
      toUpdate,
    });
    return updatedCertificate;
  });
});

// 자격증 정보 삭제
certificateRouter.delete("/certificates/:id", async (req, res, next) => {
  await tryCatchAsycHandler(req, res, next, (req) => {
    const id = req.params.id;
    const deletedCertificate = certificateService.deleteCertificate({ id });
    return deletedCertificate;
  });
});

export { certificateRouter };
