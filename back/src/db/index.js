import mongoose from "mongoose";
import { User } from "./models/User.js";
import { Education } from "./models/Education.js";
import { Award } from "./models/Award.js";
import { Certificate } from "./models/Certificate.js";
import { Project } from "./models/Project.js";
import { Board } from "./models/Board.js";

const DB_URL =
  process.env.NODE_ENV == "test"
    ? process.env.MONGODB_TEST_URL
    : process.env.MONGODB_URL ||
      "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

mongoose.connect(DB_URL);
const db = mongoose.connection;

console.log(process.env.NODE_ENV);
db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
);
db.on("error", (error) =>
  console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);

export { User, Education, Award, Certificate, Project, Board };
