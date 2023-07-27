import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

describe("projectRouter 테스트", () => {
  let userId = "b0deebdf-8ea5-4d52-a398-e2db237b575f";
  let projectId = "c4031593-3824-4e9a-87ad-ffc406a70b0c";
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

  // 프로젝트 내역 추가 테스트
  it("POST /project - 프로젝트 내역 추가", async () => {
    const response = await request(app).post("/project").send({
      user_id: userId,
      title: "프로젝트 title",
      description: "프로젝트 description",
      from_date: "1111-11-11",
      to_date: "1212-12-12",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("user_id", userId);
    expect(response.body).toHaveProperty("title", "프로젝트 title");
    expect(response.body).toHaveProperty("description", "프로젝트 description");
    expect(response.body).toHaveProperty("from_date", "1111-11-11");
    expect(response.body).toHaveProperty("to_date", "1212-12-12");
    toDeletedId = response.body.id;
  });

  // 프로젝트 내역 추가 title 내역 없을 때
  it("POST /project - 프로젝트 내역 추가 title 내역 없을 때", async () => {
    const response = await request(app).post("/project").send({
      user_id: userId,
      description: "프로젝트 description",
      from_date: "1111-11-11",
      to_date: "1212-12-12",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        name: "ValidationError",
        message: "title 값을 입력해 주세요.",
      },
    });
  });

  // 프로젝트 내역 추가 description 내역 없을 때
  it("POST /project - 프로젝트 내역 추가 description 내역 없을 때", async () => {
    const response = await request(app).post("/project").send({
      user_id: userId,
      title: "프로젝트 title",
      from_date: "1111-11-11",
      to_date: "1212-12-12",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        name: "ValidationError",
        message: "description 값을 입력해 주세요.",
      },
    });
  });

  // 프로젝트 내역 추가 from_date 내역 없을 때
  it("POST /project - 프로젝트 내역 추가 from_date 내역 없을 때", async () => {
    const response = await request(app).post("/project").send({
      user_id: userId,
      title: "프로젝트 title",
      description: "프로젝트 description",
      to_date: "1212-12-12",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        name: "ValidationError",
        message: "from_date 값을 입력해 주세요.",
      },
    });
  });

  // 프로젝트 내역 추가 to_date 내역 없을 때
  it("POST /project - 프로젝트 내역 추가 to_date 내역 없을 때", async () => {
    const response = await request(app).post("/project").send({
      user_id: userId,
      title: "프로젝트 title",
      description: "프로젝트 description",
      from_date: "1111-11-11",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        name: "ValidationError",
        message: "to_date 값을 입력해 주세요.",
      },
    });
  });

  // 프로젝트 내역 조회 테스트
  it("GET /projects/:id - 프로젝트 내역 조회", async () => {
    const response = await request(app).get(`/projects/${userId}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // 프로젝트 내역 title 수정 테스트
  it("PUT /projects/:id - 프로젝트 내역 title 수정", async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      title: "수정 title",
    });
    expect(response.status).toBe(204);
  });

  // 프로젝트 내역 description 수정 테스트
  it("PUT /projects/:id - 프로젝트 내역 description 수정", async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      description: "수정 description",
    });
    expect(response.status).toBe(204);
  });

  // 프로젝트 내역 from_date 수정 테스트
  it("PUT /projects/:id - 프로젝트 내역 from_date 수정", async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      from_date: "2222-11-22",
    });
    expect(response.status).toBe(204);
  });

  // 프로젝트 내역 to_date 수정 테스트
  it("PUT /projects/:id - 프로젝트 내역 to_date 수정", async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      to_date: "2121-12-21",
    });
    expect(response.status).toBe(204);
  });

  // 프로젝트 내역 all 수정 테스트
  it("PUT /projects/:id - 프로젝트 내역 all 수정", async () => {
    const response = await request(app).put(`/projects/${projectId}`).send({
      title: "test",
      description: "test",
      from_date: "1111-11-11",
      to_date: "1212-12-12",
    });
    expect(response.status).toBe(204);
  });

  // 프로젝트 내역 삭제 테스트
  it("DELETE /projects/:id - 프로젝트 내역 삭제", async () => {
    const response = await request(app).delete(`/projects/${toDeletedId}`);
    expect(response.status).toBe(204);
  });
});
