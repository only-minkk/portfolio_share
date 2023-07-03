import { Schema, model } from "mongoose";

const LikeSchema = new Schema({
  userId: {
    type: String,
    ref: "User",
  },
  commentId: {
    type: String,
    ref: "Comment",
  },
  PostId: {
    type: String,
    ref: "Post",
  },
});

// 인덱스 설정
LikeSchema.index({ commentId: 1, userId: 1 });

// 모델의 이름과 스키마를 이용해 모델의 정의함.
const LikeModel = model("Like", LikeSchema);

export { LikeModel };