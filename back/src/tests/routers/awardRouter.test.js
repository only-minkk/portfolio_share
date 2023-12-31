import request from "supertest";
import { app } from "../../app"; // Express 애플리케이션의 app 객체 가져오기
import mongoose from "mongoose";

describe("awardRouter 테스트", () => {
  let userId = "b0deebdf-8ea5-4d52-a398-e2db237b575f";
  let awardId = "d73211dc-0756-4e07-a966-4b2a240c3496";
  let toDeleteId;

  // 테스트 시작 전에 수행되는 부분
  beforeAll(async () => {
    // 테스트용 데이터베이스 설정 등 필요한 작업 수행
  });

  // 테스트 종료 후에 수행되는 부분
  afterAll(async () => {
    // 테스트용 데이터베이스 등 정리 작업을 수행

    await mongoose.disconnect();
  });

  // 수상 내역 추가 테스트
  it("POST /award - 수상 내역 추가", async () => {
    const response = await request(app).post("/award").send({
      user_id: userId,
      title: "수상 제목",
      description: "수상 내용",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("user_id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("description");
    expect(response.body.user_id).toBe(userId);
    toDeleteId = response.body.id;
    expect(response.body.title).toBe("수상 제목");
    expect(response.body.description).toBe("수상 내용");
  });

  // 수상 내역 추가 title 내역 없을 때
  it("POST /award - 수상 내역 추가 title 내역 없을 때", async () => {
    const response = await request(app).post("/award").send({
      user_id: userId,
      description: "수상 내용",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        name: "ValidationError",
        message: "title 값을 입력해 주세요.",
      },
    });
  });

  // 수상 내역 추가 description 내역 없을 때
  it("POST /award - 수상 내역 추가 description 내역 없을 때", async () => {
    const response = await request(app).post("/award").send({
      user_id: userId,
      title: "수상 제목",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        name: "ValidationError",
        message: "description 값을 입력해 주세요.",
      },
    });
  });

  // 수상 내역 조회 테스트
  it("GET /awards/:id - 수상 내역 조회", async () => {
    const response = await request(app).get(`/awards/${userId}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // 수상 내역 title 수정 테스트
  it("PUT /awards/:id - 수상 내역 title 수정", async () => {
    const response = await request(app)
      .put(`/awards/${awardId}`)
      .send({ title: "수정 test" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "업데이트에 성공하였습니다.",
    });
  });

  // 수상 내역 description 수정 테스트
  it("PUT /awards/:id - 수상 내역 description 수정", async () => {
    const response = await request(app)
      .put(`/awards/${awardId}`)
      .send({ description: "수정 test" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "업데이트에 성공하였습니다.",
    });
  });

  // 수상 내역 all 수정 테스트
  it("PUT /awards/:id - 수상 내역 all 수정", async () => {
    const response = await request(app)
      .put(`/awards/${awardId}`)
      .send({ title: "test", description: "test" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "업데이트에 성공하였습니다.",
    });
  });

  // 수상 내역 삭제 테스트
  it("DELETE /awards/:id - 수상 내역 삭제", async () => {
    const response = await request(app).delete(`/awards/${toDeleteId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "게시글이 성공적으로 삭제되었습니다.",
    });
  });
});
