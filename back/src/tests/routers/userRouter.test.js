import request from "supertest";
import { app } from "../../app";
import { UserModel } from "../../db/schemas/user";
import mongoose from "mongoose";

describe("userRouter 테스트", () => {
  let userId;
  let token;

  // 테스트 시작 전에 수행되는 부분
  beforeAll(async () => {
    // 테스트용 데이터베이스 설정 등 필요한 작업 수행
  });

  // 테스트 종료 후에 수행되는 부분
  afterAll(async () => {
    //테스트용 데이터베이스 등 정리 작업을 수행
    try {
      const user = await UserModel.deleteOne({ id: userId });
      await mongoose.disconnect();
      return console.log("삭제완료");
    } catch {
      await mongoose.disconnect();
      return console.log("삭제실패");
    }
  });

  // 회원가입(유저등록) 테스트
  it("POST /user/register - 회원가입", async () => {
    const response = await request(app).post("/user/register").send({
      name: "testCode",
      email: "testCode@testCode.com",
      password: "testCode",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email", "testCode@testCode.com");
    expect(response.body).toHaveProperty("name", "testCode");
    expect(response.body).toHaveProperty("password");
    expect(response.body).toHaveProperty(
      "description",
      "설명이 아직 없습니다. 추가해 주세요."
    );

    userId = response.body.id;
  });

  // 회원가입(유저등록) 이메일 중복
  it("POST /user/register - 회원가입 이메일 중복", async () => {
    const response = await request(app).post("/user/register").send({
      name: "testCode",
      email: "testCode@testCode.com",
      password: "testCode",
    });
    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      error: {
        name: "BeingEmail",
        message: "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.",
      },
    });
  });

  // 로그인 테스트
  it("POST /user/login - 로그인", async () => {
    const response = await request(app).post("/user/login").send({
      email: "testCode@testCode.com",
      password: "testCode",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    token = response.body.token;
    expect(response.body).toHaveProperty("id", userId);
    expect(response.body).toHaveProperty("name", "testCode");
    expect(response.body).toHaveProperty("email", "testCode@testCode.com");
    expect(response.body).toHaveProperty(
      "description",
      "설명이 아직 없습니다. 추가해 주세요."
    );
  });

  // 로그인 실패 (가입 내역 없을 때)
  it("POST /user/login - 로그인 실패 (가입 내역 없을 때)", async () => {
    const response = await request(app).post("/user/login").send({
      email: "loginFail@testCode.com",
      password: "testCode",
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: {
        name: "NoneUser",
        message: "존재하지 않는 유저입니다. 다시 한 번 확인해 주세요.",
      },
    });
  });

  // 로그인 실패 (비밀번호 불일치)
  it("POST /user/login - 로그인 실패 (비밀번호 불일치)", async () => {
    const response = await request(app).post("/user/login").send({
      email: "testCode@testCode.com",
      password: "비밀번호에러",
    });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: {
        name: "Unauthorized",
        message: "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.",
      },
    });
  });

  // 모든 유저 조회 테스트
  it("GET /userlist - 모든 유저 조회", async () => {
    const response = await request(app)
      .get("/userlist")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  // 유저 정보 수정 (로그인 상태가 아닐 때)
  it("PUT /user/:id - 유저 정보 수정 (로그인 상태가 아닐 때)", async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .send({ name: "testCode 수정" });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: {
        name: "TokenNotFoundError",
        message: "정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.",
      },
    });
  });

  // 유저 정보 수정 (토큰이 잘못됐을 때)
  it("PUT /user/:id - 유저 정보 수정 (토큰이 잘못됐을 때)", async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}23232`)
      .send({ name: "testCode 수정" });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: {
        name: "TokenNotFoundError",
        message: "정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.",
      },
    });
  });

  // 유저 정보 name 수정
  it("PUT /user/:id - 유저 정보 name 수정", async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "testCode 수정" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "testCode 수정");
    expect(response.body).toHaveProperty("email", "testCode@testCode.com");
    expect(response.body).toHaveProperty(
      "description",
      "설명이 아직 없습니다. 추가해 주세요."
    );
  });

  // 유저 정보 email 수정
  it("PUT /user/:id - 유저 정보 email 수정", async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "update@update.com" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "testCode 수정");
    expect(response.body).toHaveProperty("email", "update@update.com");
    expect(response.body).toHaveProperty(
      "description",
      "설명이 아직 없습니다. 추가해 주세요."
    );
  });

  // 유저 정보 description 수정
  it("PUT /user/:id - 유저 정보 description 수정", async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ description: "testCode 수정" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "testCode 수정");
    expect(response.body).toHaveProperty("email", "update@update.com");
    expect(response.body).toHaveProperty("description", "testCode 수정");
  });
});
