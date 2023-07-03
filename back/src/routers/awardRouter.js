import is from "@sindresorhus/is";
import { Router } from "express";
import { awardService } from "../services/awardService";
import { ifErrorMessage } from "../middlewares/errorMiddleware";

const awardRouter = Router();

// 수상 내역 추가
awardRouter.post('/award', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
          throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
          );
        }
        const user_id=req.body.user_id;
        const title = req.body.title;
        const description = req.body.description;

        const newAward = await awardService.addAward({
            user_id,
            title,
            description,
          });

        ifErrorMessage(newAward);
        res.status(201).json(newAward);
    }catch (error) {
    next(error);
  }
})

// 수상 내역 수정
awardRouter.put('/awards/:id', async (req, res, next) => {
  try{
      const id = req.params.id;
      const { title, description } = req.body;

      const toUpdate = { title, description };
      const updatedAward = await awardService.setAward({ id, toUpdate });

      ifErrorMessage(updatedAward);
      res.status(200).json(updatedAward);
      } catch (error) {
        next(error);
      }
});

 // 수상 내역 조회
 awardRouter.get('/awards/:id', async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const awards = await awardService.getAwards({user_id});

        ifErrorMessage(awards);
        res.status(200).send(awards);
      } catch (error) {
        next(error);
      }
 });

 // 수상 내역 삭제
awardRouter.delete('/awards/:id', async (req, res, next) => {
  try{
      const id = req.params.id;
      const deletedAward = await awardService.deleteAward({id});

      ifErrorMessage(deletedAward);
      res.send("삭제가 완료되었습니다.")
      } catch (error) {
        next(error);
      }
});

export { awardRouter };