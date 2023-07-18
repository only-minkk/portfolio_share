import { Router } from "express";
import { tryCatchAsyncHandler } from "../middlewares/tryCatchAsyncHandler";
import { boardService } from "../services/boardService";

const boardRouter = Router();

// 게시물 추가
boardRouter.post(
  "/board",
  tryCatchAsyncHandler(async (req) => {
    const title = req.body.title;
    const content = req.body.content;

    const newBoard = await boardService.addBoard({
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
    const boards = await boardService.getBoards();

    return boards;
  })
);

// 게시물 수정
boardRouter.put(
  "/boards/:id",
  tryCatchAsyncHandler(async (req) => {
    const id = req.params.id;
    const toUpdate = req.body;
    const updatedBoard = await boardService.setBoard({ id, toUpdate });

    return updatedBoard;
  })
);

// 게시물 삭제
boardRouter.delete(
  "/boards/:id",
  tryCatchAsyncHandler(async (req) => {
    const id = req.params.id;
    const boards = await boardService.deleteBoard({ id });

    return boards;
  })
);

export { boardRouter };
