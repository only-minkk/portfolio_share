import is from "@sindresorhus/is";
import { Router } from "express";
import { projectService } from "../services/projectService";
import { ifErrorMessage } from "../middlewares/errorMiddleware";

const projectRouter = Router();

// 프로젝트 정보 추가
projectRouter.post('/project', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
          throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
          );
        }
        const user_id=req.body.user_id;
        const title = req.body.title;
        const description = req.body.description;
        const from_date = req.body.from_date;
        const to_date = req.body.to_date;

        const newProject = await projectService.addProject({
            user_id,
            title,
            description,
            from_date,
            to_date,
          });

        ifErrorMessage(newProject);
        res.status(201).json(newProject);
    }catch (error) {
    next(error);
  }
});

 // 프로젝트 정보 조회
 projectRouter.get('/projects/:id', async (req, res, next) => {
  try {
      const user_id = req.params.id;

      const projects = await projectService.getProjects({user_id});
      
      ifErrorMessage(projects);
      res.status(200).send(projects);
    } catch (error) {
      next(error);
    }
});

// 프로젝트 정보 수정
projectRouter.put('/projects/:id', async (req, res, next) => {
  try{
      const id = req.params.id;
      const { title, description, from_date, to_date } = req.body;

      const toUpdate = { title, description, from_date, to_date };
      const updatedProject = await projectService.setProject({ id, toUpdate });

      ifErrorMessage(updatedProject);
      res.status(200).json(updatedProject);
      } catch (error) {
        next(error);
      }
});

// 프로젝트 정보 삭제
projectRouter.delete('/projects/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const deletedProject = await projectService.deleteProject({id});
        
    ifErrorMessage(deletedProject)
    res.send("삭제가 완료되었습니다.")
  } catch (error) {
      next(error);
    }
});

export { projectRouter };