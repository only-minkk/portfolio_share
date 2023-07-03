import { Router } from "express";
import { LikeModel } from "../db/schemas/like";
import { ifErrorMessage } from "../middlewares/errorMiddleware";


const likeRouter = Router();

likeRouter.post("/like/uplike", (req, res) => {
    let { commentId, userId } = req.body;

    const LikeIns = new LikeModel({ userId, commentId });

    LikeIns.save((err, result) => {
        if (err) return res.status(400).json({ upLike: false, err });
        return res.status(200).json({ upLike: true });
    });
});

likeRouter.post("/like/unlike", (req, res) => {
    let { commentId, userId } = req.body;

    console.log(commentId, userId);

    LikeModel.findOneAndDelete({ commentId: commentId, userId: userId }).exec(
        (err, result) => {
            if (err) return res.status(400).json({ unLike: false, err });
            return res.status(200).json({ unLike: true });
        }
    );
});

likeRouter.get("/like/getLike/:id", async (req, res, next) => {
    try {
        const userId = req.params.id;

        const likes = await LikeModel.find({userId: userId});
        ifErrorMessage(likes);
        res.status(200).send(likes);
      } catch (error) {
        next(error);
      }
});

export { likeRouter };
