import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  //useState로 school 상태를 생성함.
  const [school, setSchool] = useState("");
  //useState로 major 상태를 생성함.
  const [major, setMajor] = useState("");

  const [position, setPosition] = useState("재학중");
  const [positionList, setPositionList] = useState([
    { label: "재학중", id: "radio1" },
    { label: "학사졸업", id: "radio2" },
    { label: "석사졸업", id: "radio3" },
    { label: "박사졸업", id: "radio4" },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault(); //고유 동작을 중단
    e.stopPropagation(); // 상위 엘리먼트들로의 이벤트 전파를 중단

    //portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    //"education/create" 엔드포인트로 post요청함.
    await Api.post("education", {
      user_id: portfolioOwnerId,
      school,
      major,
      position,
    });

    // "educationlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("educations", user_id);
    //educations를 response의 data로 세팅함.
    setEducations(res.data);
    //education을 추가하는 과정이 끝났으므로, is Adding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicSchool" className="mb-3">
        <Form.Control
          type="text"
          placeholder="학교이름"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicMajor" className="mb-3">
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

export default EducationAddForm;
