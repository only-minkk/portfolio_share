import { ProjectModel } from "../schemas/project";

class Project {
    static async create({ newProject }) {
      const createdNewProject = await ProjectModel.create(newProject);
      return createdNewProject;
    }
  
    static async findByUserId({ user_id }) {
      const user = await ProjectModel.find({ user_id: user_id });
      return user;
    }
  
    static async findById({ id }) {
      const project = await ProjectModel.findOne({ id: id });
      return project;
    }
  
    static async update({ id, fieldToUpdate, newValue }) {
      const filter = { id: id };
      const update = { [fieldToUpdate]: newValue };
      const option = { returnOriginal: false };
  
      const updatedProject = await ProjectModel.findOneAndUpdate(
        filter,
        update,
        option
      );
      return updatedProject;
    }

    static async deleteById({ id }) {
      const project = await ProjectModel.deleteOne({ id: id });
      return project;
    }
  }
  
  export { Project };
  