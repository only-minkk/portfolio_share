import { Card, Button, Row, Col } from "react-bootstrap";
import ModalAlert from "./ProjectDeleteModal";

function ProjectCard({ project, setProjects, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          <span className="text-muted">
            {`${new Date(project.from_date).toLocaleDateString()} ~ ${new Date(
              project.to_date
            ).toLocaleDateString()}`}
          </span>
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
            <ModalAlert currentProject={project} setProjects={setProjects} />
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;
