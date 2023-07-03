import { Card, Button, Row, Col } from "react-bootstrap";
import ModalAlert from "./EduDeleteModal";

function EducationCard({ education, setEducations, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{education.school}</span>
          <br />
          <span className="text-muted">{`${education.major} (${education.position})`}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
            <ModalAlert
              currentEducation={education}
              setEducations={setEducations}
            />
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard;
