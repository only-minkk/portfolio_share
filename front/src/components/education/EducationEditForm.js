import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({ currentEducation, setEducations, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [school, setSchool] = useState(currentEducation.school);
  //useState로 description 상태를 생성함.
  const [major, setMajor] = useState(currentEducation.major);

  const [position, setPosition] = useState(currentEducation.position);
  const [positionList, setPositionList] = useState([
    { label: "재학중", id: "radio1" },
    { label: "학사졸업", id: "radio2" },
    { label: "석사졸업", id: "radio3" },
    { label: "박사졸업", id: "radio4" },
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    //curruentEducation의 user_id를 user_id 변수에 할당함.
    const user_id = currentEducation.user_id;

    //"Educations/학력 id"엔드포인트로 PUT 요청함.
    await Api.put(`educations/${currentEducation.id}`, {
      user_id,
      school,
      major,
      position,
    });

    //"awardlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("educations", user_id);
    //awards를 response의 data로 세팅함.
    setEducations(res.data);
    //편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicSchool">
        <Form.Control
          type="text"
          placeholder="학교이름"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicMajor" className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <div key={`inline-radio`} className="mb-3 mt-3">
        {positionList.map((object) => (
          <Form.Check
            inline
            label={object.label}
            id={object.id}
            type="radio"
            value={object.label}
            checked={position === object.label}
            onChange={(e) => setPosition(e.target.value)}
          />
        ))}
      </div>

      <Form.Group as={Row} className="mt-3" text-center mb-4>
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

export default EducationEditForm;
