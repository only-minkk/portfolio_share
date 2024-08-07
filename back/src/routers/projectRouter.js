import { Router } from "express";
import {
  projectValidate,
  projectUpdateValidate,
} from "../validation/projectValidation.js";
import { tryCatchAsyncHandler } from "../utils/tryCatchAsyncHandler.js";
import { ProjectService } from "../services/ProjectService.js";

const projectRouter = Router();

// 프로젝트 정보 추가
projectRouter.post(
  "/project",
  projectValidate,
  tryCatchAsyncHandler(async (req) => {
    const { user_id, title, description, from_date, to_date } = req.body;
    const newProject = await ProjectService.addProject({
      user_id,
      title,
      description,
      from_date,
      to_date,
    });
    return newProject;
  })
);

// 프로젝트 정보 조회
projectRouter.get(
  "/projects/:id",
  tryCatchAsyncHandler(async (req) => {
    const user_id = req.params.id;
    const projects = await ProjectService.getProjects({ user_id });
    return projects;
  })
);

// 프로젝트 정보 수정
projectRouter.put(
  "/projects/:id",
  projectUpdateValidate,
  tryCatchAsyncHandler(async (req) => {
    const id = req.params.id;
    const toUpdate = req.body;
    const updatedProject = await ProjectService.setProject({ id, toUpdate });
    return updatedProject;
  })
);

// 프로젝트 정보 삭제
projectRouter.delete(
  "/projects/:id",
  tryCatchAsyncHandler(async (req) => {
    const id = req.params.id;
    const deletedProject = await ProjectService.deleteProject({ id });
    return deletedProject;
  })
);

export { projectRouter };
