import { Router } from "express";
import { tryCatchAsyncHandler } from "../utils/tryCatchAsyncHandler";
import { LikeModel } from "../db/schemas/like";

const likeRouter = Router();

likeRouter.post(
  "/like/uplike",
  tryCatchAsyncHandler(async (req, res) => {
    let { commentId, userId } = req.body;

    const LikeIns = new LikeModel({ userId, commentId });

    const upLike = await LikeIns.save();

    if (!upLike) {
      throw new Error({ upLike: false, error });
    }
    return { uplike: true };
  })
);

likeRouter.post(
  "/like/unlike",
  tryCatchAsyncHandler(async (req) => {
    const { commentId, userId } = req.body;

    const like = await LikeModel.findOneAndDelete({
      commentId: commentId,
      userId: userId,
    });

    if (!like) {
      throw new Error({ unlike: false, error });
    }
    return { unlike: true };
  })
);

likeRouter.get(
  "/like/getLike/:id",
  tryCatchAsyncHandler(async (req) => {
    const userId = req.params.id;
    const likes = await LikeModel.find({ userId: userId });

    return likes;
  })
);

export { likeRouter };
