import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {};

    if (name !== user.name) {
      updatedFields.name = name;
    }

    if (email !== user.email) {
      updatedFields.email = email;
    }

    if (description !== user.description) {
      updatedFields.description = description;
    }

    if (Object.keys(updatedFields).length === 0) {
      console.log("변경사항 없습니다.");
      setIsEditing(false);
      return;
    }

    try {
      // "users/유저id" 엔드포인트로 PUT 요청함.
      const res = await Api.put(`users/${user.id}`, updatedFields);
      // 유저 정보는 response의 data임.
      const updatedUser = res.data;
      // 해당 유저 정보로 user을 세팅함.
      setUser(updatedUser);

      // isEditing을 false로 세팅함.
      setIsEditing(false);
    } catch (error) {
      console.log("에러발생:", error);
    }
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
