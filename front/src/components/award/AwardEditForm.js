import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ currentAward, setAwards, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentAward.title);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(currentAward.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 변경사항을 담을 빈 객체 생성
    const updatedAward = {};

    // 변경된 title 필드 추가
    if (title.trim() !== currentAward.title) {
      updatedAward.title = title.trim();
    }

    // 변경된 description 필드 추가
    if (description.trim() !== currentAward.description) {
      updatedAward.description = description.trim();
    }

    // 변경된 필드가 없는 경우 API 요청을 보내지 않음.
    if (Object.keys(updatedAward).length === 0) {
      console.log("변경사항이 없습니다.");
      setIsEditing(false);
      return;
    }

    try {
      // currentAward의 user_id를 user_id 변수에 할당함.
      const user_id = currentAward.user_id;

      // "awards/수상 id" 엔드포인트로 PUT 요청함.
      await Api.put(`awards/${currentAward.id}`, updatedAward);

      // "awardlist/유저id" 엔드포인트로 GET 요청함.
      const res = await Api.get("awards", user_id);
      // awards를 response의 data로 세팅함.
      setAwards(res.data);
      // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
      setIsEditing(false);
    } catch (error) {
      console.log("에러발생", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
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
  );
}

export default AwardEditForm;
