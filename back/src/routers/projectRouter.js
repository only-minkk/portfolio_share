import { Router } from "express";
import {
  projectValidate,
  projectUpdateValidate,
} from "../middlewares/projectValidation";
import { tryCatchAsyncHandler } from "../middlewares/tryCatchAsyncHandler";
import { projectService } from "../services/projectService";

const projectRouter = Router();

// 프로젝트 정보 추가
projectRouter.post("/project", projectValidate, async (req, res, next) => {
  await tryCatchAsyncHandler(req, res, next, async (req) => {
    const { user_id, title, description, from_date, to_date } = req.body;
    const newProject = await projectService.addProject({
      user_id,
      title,
      description,
      from_date,
      to_date,
    });
    return newProject;
  });
});

// 프로젝트 정보 조회
projectRouter.get("/projects/:id", async (req, res, next) => {
  await tryCatchAsyncHandler(req, res, next, async (req) => {
    const user_id = req.params.id;
    const projects = await projectService.getProjects({ user_id });
    return projects;
  });
});

// 프로젝트 정보 수정
projectRouter.put(
  "/projects/:id",
  projectUpdateValidate,
  async (req, res, next) => {
    await tryCatchAsyncHandler(req, res, next, async (req) => {
      const id = req.params.id;
      const toUpdate = req.body;
      const updatedProject = await projectService.setProject({ id, toUpdate });
      return updatedProject;
    });
  }
);

// 프로젝트 정보 삭제
projectRouter.delete("/projects/:id", async (req, res, next) => {
  await tryCatchAsyncHandler(req, res, next, async (req) => {
    const id = req.params.id;
    const deletedProject = await projectService.deleteProject({ id });
    return deletedProject;
  });
});

export { projectRouter };
