import { Card, Button, Row, Col } from "react-bootstrap";
import ModalAlert from "./AwardDeleteModal";

function AwardCard({ award, setAwards, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{award.title}</span>
          <br />
          <span className="text-muted">{award.description}</span>
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
            <ModalAlert currentAward={award} setAwards={setAwards} />
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
