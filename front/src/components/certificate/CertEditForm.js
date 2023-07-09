import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

const CertEditForm = ({ currentCert, setCerts, setIsEditing }) => {
  const [title, setTitle] = useState(currentCert.title);
  const [description, setDescription] = useState(currentCert.description);
  const [whenDate, setWhenDate] = useState(new Date(currentCert.when_date));

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 변경된 필드를 담을 빈 객체 생성
    const updatedCert = {};

    // 변경된 title 필드 추가
    if (title !== currentCert.title) {
      updatedCert.title = title;
    }

    // 변경된 description 필드 추가
    if (description !== currentCert.description) {
      updatedCert.description = description;
    }

    // 변경된 when_date 필드 추가
    if (whenDate.toISOString().split("T")[0] !== currentCert.when_date) {
      updatedCert.when_date = whenDate.toISOString().split("T")[0];
    }

    // 변경된 필드가 없는 경우 API 요청을 보내지 않음.
    if (Object.keys(updatedCert).length === 0) {
      console.log("변경사항 없습니다.");
      setIsEditing(false);
      return;
    }

    try {
      const user_id = currentCert.user_id;

      await Api.put(`certificates/${currentCert.id}`, updatedCert);

      const res = await Api.get("certificates", user_id);
      setCerts(res.data);
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
          placeholder="자격증 제목"
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

      <Form.Group className="mt-3">
        <DatePicker
          selected={whenDate}
          onChange={(date) => setWhenDate(date)}
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
};

export default CertEditForm;
