import { Router } from "express";
import { tryCatchAsyncHandler } from "../utils/tryCatchAsyncHandler";
import { BoardService } from "../services/BoardService";

const boardRouter = Router();

// 게시물 추가
boardRouter.post(
  "/board",
  tryCatchAsyncHandler(async (req) => {
    const title = req.body.title;
    const content = req.body.content;

    const newBoard = await BoardService.addBoard({
      title,
      content,
    });
    return newBoard;
  })
);

// 게시물 조회
boardRouter.get(
  "/boards",
  tryCatchAsyncHandler(async () => {
    const boards = await BoardService.getBoards();

    return boards;
  })
);

// 게시물 수정
boardRouter.put(
  "/boards/:id",
  tryCatchAsyncHandler(async (req) => {
    const id = req.params.id;
    const toUpdate = req.body;
    const updatedBoard = await BoardService.setBoard({ id, toUpdate });

    return updatedBoard;
  })
);

// 게시물 삭제
boardRouter.delete(
  "/boards/:id",
  tryCatchAsyncHandler(async (req) => {
    const id = req.params.id;
    const boards = await BoardService.deleteBoard({ id });

    return boards;
  })
);

export { boardRouter };
