import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

describe("certificateRouter 테스트", () => {
  let userId = "b0deebdf-8ea5-4d52-a398-e2db237b575f";
  let certificateId = "6a647e85-3a40-4364-9e4a-2c8307fa69d1";
  let toDeletedId;

  // 테스트 시작 전에 수행되는 부분
  beforeAll(async () => {
    // 테스트용 데이터베이스 설정 등 필요한 작업 수행
  });

  // 테스트 종료 후에 수행되는 부분
  afterAll(async () => {
    // 테스트용 데이터베이스 등 정리 작업 수행

    await mongoose.disconnect();
  });

  // 자격증 내역 추가 테스트
  it("POST /certificate - 자격증 내역 추가", async () => {
    const response = await request(app).post("/certificate").send({
      user_id: userId,
      title: "자격증 title",
      description: "자격증 description",
      when_date: "2023-07-22",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("user_id", userId);
    expect(response.body).toHaveProperty("title", "자격증 title");
    expect(response.body).toHaveProperty("description", "자격증 description");
    expect(response.body).toHaveProperty("when_date", "2023-07-22");
    toDeletedId = response.body.id;
  });

  // 자격증 내역 추가 title 내역 없을 때
  it("POST /certificate - 자격증 내역 추가 title 내역 없을 때", async () => {
    const response = await request(app).post("/certificate").send({
      user_id: userId,
      description: "자격증 description",
      when_date: "2023-07-22",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        name: "ValidationError",
        message: "title 값을 입력해 주세요.",
      },
    });
  });

  // 자격증 내역 추가 description 내역 없을 때
  it("POST /certificate - 자격증 내역 추가 description 내역 없을 때", async () => {
    const response = await request(app).post("/certificate").send({
      user_id: userId,
      title: "자격증 title",
      when_date: "2023-07-22",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        name: "ValidationError",
        message: "description 값을 입력해 주세요.",
      },
    });
  });

  // 자격증 내역 추가 when_date 내역 없을 때
  it("POST /certificate - 자격증 내역 추가 when_date 내역 없을 때", async () => {
    const response = await request(app).post("/certificate").send({
      user_id: userId,
      title: "자격증 title",
      description: "자격증 description",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        name: "ValidationError",
        message: "when_date 값을 입력해 주세요.",
      },
    });
  });

  // 자격증 내역 조회 테스트
  it("GET /certificates/:id - 자격증 내역 조회", async () => {
    const response = await request(app).get(`/certificates/${userId}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // 자격증 내역 title 수정 테스트
  it("PUT /certificates/:id - 자격증 내역 title 수정", async () => {
    const response = await request(app)
      .put(`/certificates/${certificateId}`)
      .send({
        title: "수정 title",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "업데이트에 성공하였습니다.",
    });
  });

  // 자격증 내역 description 수정 테스트
  it("PUT /certificates/:id - 자격증 내역 description 수정", async () => {
    const response = await request(app)
      .put(`/certificates/${certificateId}`)
      .send({ description: "수정 description" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "업데이트에 성공하였습니다.",
    });
  });

  // 자격증 내역 when_date 수정 테스트
  it("PUT /certificates/:id - 자격증 내역 when_date 수정", async () => {
    const response = await request(app)
      .put(`/certificates/${certificateId}`)
      .send({ when_date: "2000-02-02" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "업데이트에 성공하였습니다.",
    });
  });

  // 자격증 내역 all 수정 테스트
  it("PUT /certificates/:id - 자격증 내역 when_date 수정", async () => {
    const response = await request(app)
      .put(`/certificates/${certificateId}`)
      .send({ title: "test", description: "test", when_date: "1111-11-11" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "업데이트에 성공하였습니다.",
    });
  });

  // 자격증 내역 삭제 테스트
  it("DELETE /certificates/:id - 자격증 내역 삭제", async () => {
    const response = await request(app).delete(`/certificates/${toDeletedId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "게시글이 성공적으로 삭제되었습니다.",
    });
  });
});
