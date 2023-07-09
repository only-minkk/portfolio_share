import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
  const [title, setTitle] = useState(currentProject.title);
  const [description, setDescription] = useState(currentProject.description);
  const [fromDate, setFromDate] = useState(new Date(currentProject.from_date));
  const [toDate, setToDate] = useState(new Date(currentProject.to_date));

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 변경된 필드를 담을 빈 객체 생성
    const updatedProject = {};
    function dateFilter(date) {
      const filtered = date.toISOString().split("T")[0];
      return filtered;
    }

    if (title !== currentProject.title) {
      updatedProject.title = title;
    }

    if (description !== currentProject.description) {
      updatedProject.description = description;
    }

    if ((await dateFilter(fromDate)) !== currentProject.from_date) {
      updatedProject.from_date = await dateFilter(fromDate);
    }

    if ((await dateFilter(toDate)) !== currentProject.to_date) {
      updatedProject.to_date = await dateFilter(toDate);
    }

    if (Object.keys(updatedProject).length === 0) {
      console.log("변경사항 없습니다.");
      setIsEditing(false);
      return;
    }

    try {
      const user_id = currentProject.user_id;

      await Api.put(`projects/${currentProject.id}`, updatedProject);

      const res = await Api.get("projects", user_id);
      setProjects(res.data);
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
          placeholder="프로젝트 제목"
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

      <Form.Group as={Row} className="mt-3">
        <Col xs="auto">
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
          />
        </Col>
        <Col xs="auto">
          <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
        </Col>
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

export default ProjectEditForm;
