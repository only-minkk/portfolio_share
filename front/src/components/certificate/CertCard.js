import React, { useState } from "react";
import CertEditForm from "./CertEditForm";
import { Card, Button, Row, Col } from "react-bootstrap";
import ModalAlert from "./CertDeleteModal";

const EditCert = ({ cert, setCerts, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <CertEditForm
          currentCert={cert}
          setCerts={setCerts}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CertCard
          cert={cert}
          setCerts={setCerts}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
};

const CertCard = ({ cert, setCerts, isEditable, setIsEditing }) => {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{cert.title}</span>
          <br />
          <span className="text-muted">{cert.description}</span>
          <br />
          <span className="text-muted">
            {new Date(cert.when_date).toLocaleDateString()}
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
            <ModalAlert currentCert={cert} setCerts={setCerts} />
          </Col>
        )}
      </Row>
    </Card.Text>
  );
};

export { CertCard, EditCert };
