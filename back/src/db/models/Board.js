import { BoardModel } from "../schemas/board";

class Board {
    static async create({ newBoard }) {
      const createdNewBoard = await BoardModel.create(newBoard);
      return createdNewBoard;
    }
  
    static async findBoards() {
      const boards = await BoardModel.find();
      return boards;
    }
  
    static async findById({ id }) {
      const board = await BoardModel.findOne({ id: id });
      return board;
    }
  
    static async update({ id, fieldToUpdate, newValue }) {
      const filter = { id: id };
      const update = { [fieldToUpdate]: newValue };
      const option = { returnOriginal: false };
  
      const updatedBoard = await BoardModel.findOneAndUpdate(
        filter,
        update,
        option
      );
      return updatedBoard;
    }

    static async deleteById({ id }) {
      const board = await BoardModel.deleteOne({ id: id });
      return board;
    }
  }
  
  export { Board };
  