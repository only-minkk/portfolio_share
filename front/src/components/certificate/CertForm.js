import React, { useEffect, useState } from "react";
import { Button, Col, Row, Card } from "react-bootstrap";
import * as Api from "../../api";
import { EditCert } from "./CertCard";
import CertAddForm from "./CertAddForm";

function CertForm({ portfolioOwnerId, isEditable }) {
  const [certs, setCerts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("certificates", portfolioOwnerId).then((res) => setCerts(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body className="card-body">
        <Card.Title className="fw-bold">🧾자격증</Card.Title>
        {certs.map((cert) => (
          <EditCert
            key={cert.id}
            cert={cert}
            setCerts={setCerts}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <CertAddForm
            portfolioOwnerId={portfolioOwnerId}
            setCerts={setCerts}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default CertForm;
