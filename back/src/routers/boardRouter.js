import is from "@sindresorhus/is";
import { Router } from "express";
import { boardService } from "../services/boardService";
import { ifErrorMessage } from "../middlewares/errorMiddleware";

const boardRouter = Router();

// 게시물 추가
boardRouter.post('/board', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
          throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
          );
        }
        const title = req.body.title;
        const content = req.body.content;

        const newBoard = await boardService.addBoard({
            title,
            content,
          });

        ifErrorMessage(newBoard);
        res.status(201).json(newBoard);
    }catch (error) {
    next(error);
  }
})

 // 게시물 조회
boardRouter.get('/boards', async (req, res, next) => {
    try {
        const boards = await boardService.getBoards();

        ifErrorMessage(boards);
        res.status(200).send(boards);
      } catch (error) {
        next(error);
      }
 });

// 게시물 수정
boardRouter.put('/boards/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
	      const { title, content } = req.body;

        const toUpdate = { title, content };
        const updatedBoard = await boardService.setBoard({ id, toUpdate });

        ifErrorMessage(updatedBoard);
        res.status(200).json(updatedBoard);
        } catch (error) {
          next(error);
        }
});

 // 게시물 삭제
 boardRouter.delete('/boards/:id', async (req, res, next) => {
	try {
    const id = req.params.id;
		const boards = await boardService.deleteBoard({ id });
    
    ifErrorMessage(boards);
		res.send("삭제가 완료되었습니다.");
	} catch (error) {
		next(error);
	};
});

export { boardRouter };