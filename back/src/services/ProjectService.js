import { Project } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";
import {
  NotFound,
  GetFailed,
  UpdateFailed,
  DeleteFailed,
} from "../utils/CustomError.js";
import { errorCatch } from "../utils/errorCatch.js";
import { successMessage } from "../utils/successMessage.js";

class ProjectService {
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

    // 변경된 값 업데이트
    const updatedProject = await Project.update(id, toUpdate);

    // update() 실패시 에러
    errorCatch(updatedProject, UpdateFailed);

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

export { ProjectService };
