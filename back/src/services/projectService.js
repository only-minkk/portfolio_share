import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class projectService {
  // 프로젝트 추가
  static async addProject({ user_id, title, description, from_date, to_date }) {
    const id = uuidv4();

    const newProject = { id, user_id, title, description, from_date, to_date };

    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null;

    return createdNewProject;
  }

  // 프로젝트 조회
  static async getProjects({ user_id }) {
    const projects = await Project.findByUserId({ user_id });
    return projects;
  }

  // 프로젝트 수정
  static async setProject({ id, toUpdate }) {
    let project = await Project.findById({ id });

    if (!project) {
      throw new NotFound();
    }

    // 모든 필드가 변경됐을 경우 save() 메서드로 한 번에 저장.
    if (Object.keys(toUpdate).length === 4) {
      for (const key in toUpdate) {
        project[key] = toUpdate[key];
      }
      const newProject = await project.save();
      return newProject;
    }

    // 변경된 필드의 키 값을 fieldToUpdate 에 선언.
    const fieldToUpdate = Object.keys(toUpdate);

    // update() 메서드로 변경된 필드만 업데이트.
    fieldToUpdate.forEach((field) => {
      const newValue = toUpdate[field];
      project = Project.update({ id, fieldToUpdate: field, newValue });
    });

    return project;
  }

  // 프로젝트 삭제
  static async deleteProject({ id }) {
    let projects = await Project.findById({ id });
    if (!projects) {
      throw new NotFound();
    }
    projects = await Project.deleteById({ id });
    if (projects.acknowledged) {
      projects = {
        success: true,
        message: "게시글이 성공적으로 삭제되었습니다.",
      };
      return projects;
    } else {
      projects = { success: false, message: "게시글이 삭제되지 않았습니다." };
    }
  }
}

export { projectService };
