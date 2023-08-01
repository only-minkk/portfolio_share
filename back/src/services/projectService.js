import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";
import {
  NotFound,
  CreateFailed,
  GetFailed,
  UpdateFailed,
  DeleteFailed,
} from "../middlewares/CustomError";
import { errorCatch } from "../middlewares/errorMiddleware";
import { successMessage } from "../util/successMessage";

class projectService {
  // 프로젝트 추가
  static async addProject({ user_id, title, description, from_date, to_date }) {
    // id 는 유니크 값 부여
    const id = uuidv4();

    const newProject = { id, user_id, title, description, from_date, to_date };

    // db에 저장
    const createdNewProject = await Project.create({ newProject });

    // 저장 실패시 에러
    errorCatch(createdNewProject, UpdateFailed);

    return createdNewProject;
  }

  // 프로젝트 조회
  static async getProjects({ user_id }) {
    const projects = await Project.findByUserId({ user_id });

    // 조회 실패시 에러
    errorCatch(projects, GetFailed);

    return projects;
  }

  // 프로젝트 수정
  static async setProject({ id, toUpdate }) {
    // 해당 id의 프로젝트가 db에 존재하는지 확인.
    let project = await Project.findById({ id });

    // 프로젝트 없으면 에러.
    errorCatch(project, NotFound);

    // 모든 필드가 변경됐을 경우 save() 메서드로 한 번에 저장.
    if (Object.keys(toUpdate).length === 4) {
      for (const key in toUpdate) {
        project[key] = toUpdate[key];
      }

      const newProject = await project.save();

      // save() 실패시 에러.
      errorCatch(newProject, UpdateFailed);

      return successMessage.updateSuccessMessage;
    }

    // 변경된 필드의 키 값을 fieldToUpdate 에 선언.
    const fieldToUpdate = Object.keys(toUpdate);

    // update() 메서드로 변경된 필드만 업데이트.
    for (const field of fieldToUpdate) {
      const newValue = toUpdate[field];
      project = await Project.update({ id, fieldToUpdate: field, newValue });
    }

    // update() 실패시 에러
    errorCatch(project, UpdateFailed);

    return successMessage.updateSuccessMessage;
  }

  // 프로젝트 삭제
  static async deleteProject({ id }) {
    // 해당 내역 조회.
    let projects = await Project.findById({ id });

    // 해당 내역 없으면 에러.
    errorCatch(projects, NotFound);

    // 해당 내역 삭제.
    projects = await Project.deleteById({ id });

    // 해당 내역 삭제 실패시 에러.
    errorCatch(projects, DeleteFailed);

    return successMessage.deleteSuccessMessage;
  }
}

export { projectService };
