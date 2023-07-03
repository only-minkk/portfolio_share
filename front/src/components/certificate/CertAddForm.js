import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function CertAddForm({ portfolioOwnerId, setCerts, setIsAdding }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [whenDate, setWhenDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = portfolioOwnerId;
    const when_date = whenDate.toISOString().split("T")[0];

    await Api.post("certificate", {
      user_id: portfolioOwnerId,
      title,
      description,
      when_date,
    });

    const res = await Api.get("certificates", user_id);
    setCerts(res.data);
    setIsAdding(false);
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

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertAddForm;
