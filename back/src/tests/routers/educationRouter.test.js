import request from "supertest";
import { app } from "../../app"; // Express 애플리케이션의 app 객체 가져오기
import mongoose from "mongoose";

describe("educationRouter 테스트", () => {
  // 테스트 시작 전에 수행되는 부분
  let userId = "b0deebdf-8ea5-4d52-a398-e2db237b575f";
  let educationId = "38166e25-2444-4217-a29b-0cf421f0dba4";
  let toDeleteId;

  beforeAll(async () => {
    // 테스트용 데이터베이스 설정 등 필요한 작업 수행
  });

  // 테스트 종료 후에 수행되는 부분
  afterAll(async () => {
    // 테스트용 데이터베이스 등 정리 작업을 수행

    await mongoose.disconnect();
  });

  // 학력 내역 추가 테스트
  it("POST /education - 학력 내역 추가", async () => {
    const response = await request(app).post("/education").send({
      user_id: userId,
      school: "학교",
      major: "전공",
      position: "재학중",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("user_id", userId);
    expect(response.body).toHaveProperty("school", "학교");
    expect(response.body).toHaveProperty("major", "전공");
    expect(response.body).toHaveProperty("position", "재학중");
    expect(response.body.user_id).toBe(userId);
    toDeleteId = response.body.id;
    expect(response.body.school).toBe("학교");
    expect(response.body.major).toBe("전공");
    expect(response.body.position).toBe("재학중");
  });

  // 학력 내역 추가 school 내역 없을 때
  it("POST /education - 학력 내역 추가 school 내역 없을 때", async () => {
    const response = await request(app).post("/education").send({
      user_id: userId,
      major: "전공",
      position: "재학중",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        name: "ValidationError",
        message: "school 값을 입력해 주세요.",
      },
    });
  });

  // 학력 내역 추가 major 내역 없을 때
  it("POST /education - 학력 내역 추가 major 내역 없을 때", async () => {
    const response = await request(app).post("/education").send({
      user_id: userId,
      school: "학교",
      position: "재학중",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        name: "ValidationError",
        message: "major 값을 입력해 주세요.",
      },
    });
  });

  // 학력 내역 추가 position 내역 없을 때
  it("POST /education - 학력 내역 추가 position 내역 없을 때", async () => {
    const response = await request(app).post("/education").send({
      user_id: userId,
      school: "학교",
      major: "전공",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        name: "ValidationError",
        message: "position 값을 입력해 주세요.",
      },
    });
  });

  // 학력 내역 조회 테스트
  it("GET /educations/:id - 학력 내역 조회", async () => {
    const response = await request(app).get(`/educations/${userId}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // 학력 내역 school 수정 테스트
  it("PUT /educations/:id - 학력 내역 school 수정", async () => {
    const response = await request(app)
      .put(`/educations/${educationId}`)
      .send({ school: "수정 school" });
    expect(response.status).toBe(204);
  });

  // 학력 내역 major 수정 테스트
  it("PUT /educations/:id - 학력 내역 major 수정", async () => {
    const response = await request(app)
      .put(`/educations/${educationId}`)
      .send({ major: "수정 major" });
    expect(response.status).toBe(204);
  });

  // 학력 내역 position 수정 테스트
  it("PUT /educations/:id - 학력 내역 position 수정", async () => {
    const response = await request(app)
      .put(`/educations/${educationId}`)
      .send({ position: "학사 졸업" });
    expect(response.status).toBe(204);
  });

  // 학력 내역 school, major, position 수정 테스트
  it("PUT /educations/:id - 학력 내역 school, major, position 수정", async () => {
    const response = await request(app)
      .put(`/educations/${educationId}`)
      .send({ school: "test", major: "test", position: "재학중" });
    expect(response.status).toBe(204);
  });

  // 학력 내역 삭제 테스트
  it("DELETE /educations/:id - 학력 내역 삭제", async () => {
    const response = await request(app).delete(`/educations/${toDeleteId}`);
    expect(response.status).toBe(204);
  });
});
