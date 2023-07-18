import { Router } from "express";
import {
  certificateValidate,
  certificateUpdateValidate,
} from "../middlewares/certificateValidation";
import { tryCatchAsyncHandler } from "../middlewares/tryCatchAsyncHandler";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

// 자격증 정보 추가
certificateRouter.post(
  "/certificate",
  certificateValidate,
  tryCatchAsyncHandler(async (req) => {
    const { user_id, title, description, when_date } = req.body;
    const newCertificate = await certificateService.addCertificate({
      user_id,
      title,
      description,
      when_date,
    });
    return newCertificate;
  })
);

// 자격증 정보 조회
certificateRouter.get(
  "/certificates/:id",
  tryCatchAsyncHandler(async (req) => {
    const user_id = req.params.id;
    const certificates = await certificateService.getCertificates({ user_id });
    return certificates;
  })
);

// 자격증 정보 수정
certificateRouter.put(
  "/certificates/:id",
  certificateUpdateValidate,
  tryCatchAsyncHandler(async (req) => {
    const id = req.params.id;
    const toUpdate = req.body;
    const updatedCertificate = await certificateService.setCertificate({
      id,
      toUpdate,
    });
    return updatedCertificate;
  })
);

// 자격증 정보 삭제
certificateRouter.delete(
  "/certificates/:id",
  tryCatchAsyncHandler(async (req) => {
    const id = req.params.id;
    const deletedCertificate = await certificateService.deleteCertificate({
      id,
    });
    return deletedCertificate;
  })
);

export { certificateRouter };
