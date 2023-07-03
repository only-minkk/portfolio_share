import is from "@sindresorhus/is";
import { Router } from "express";
import { educationService } from "../services/educationService";
import { ifErrorMessage } from "../middlewares/errorMiddleware";

const educationRouter = Router();

// 학력 정보 추가
educationRouter.post('/education', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
          throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
          );
        }
        const user_id=req.body.user_id;
        const school = req.body.school;
        const major = req.body.major;
        const position = req.body.position;

        const newEducation = await educationService.addEducation({
            user_id,
            school,
            major,
            position,
          });

        ifErrorMessage(newEducation);
        res.status(201).json(newEducation);
    }catch (error) {
    next(error);
  }
})

// 학력 정보 수정
educationRouter.put('/educations/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
	      const { school, major, position } = req.body;

        const toUpdate = { school, major, position };
        const updatedEducation = await educationService.setEducation({ id, toUpdate });

        ifErrorMessage(updatedEducation);
        res.status(200).json(updatedEducation);
        } catch (error) {
          next(error);
        }
});

 // 학력 정보 조회
 educationRouter.get('/educations/:id', async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const educations = await educationService.getEducations({user_id});

        ifErrorMessage(educations);
        res.status(200).send(educations);
      } catch (error) {
        next(error);
      }
 });

 // 학력 정보 삭제
 educationRouter.delete('/educations/:id', async (req, res, next) => {
	try {
    const id = req.params.id;
		const educations = await educationService.deleteEducation({ id });
    
    ifErrorMessage(educations);
		res.send("삭제가 완료되었습니다.");
	} catch (error) {
		next(error);
	};
});

export { educationRouter };