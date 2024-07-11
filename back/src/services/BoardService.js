import { Board } from "../db/index.js";
import { v4 as uuidv4 } from "uuid";
import { NotFound } from "../utils/CustomError.js";

class BoardService {
  static async addBoard({ title, content }) {
    const id = uuidv4();

    const newBoard = { id, title, content };

    const createdNewBoard = await Board.create({ newBoard });
    createdNewBoard.errorMessage = null;

    return createdNewBoard;
  }

  static async getBoards() {
    const boards = await Board.findBoards();
    return boards;
  }

  static async setBoard({ id, toUpdate }) {
    let board = await Board.findById({ id });

    if (!board) {
      throw new NotFound();
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      board = await Board.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.content) {
      const fieldToUpdate = "content";
      const newValue = toUpdate.content;
      board = await Board.update({ id, fieldToUpdate, newValue });
    }

    return board;
  }

  static async deleteBoard({ id }) {
    let boards = await Board.findById({ id });
    if (!boards) {
      throw new NotFound();
    }
    boards = await Board.deleteById({ id });

    return boards;
  }
}

export { BoardService };
