import { Card, Button, Container, Row, Col } from "react-bootstrap";
import orchids from "../data/orchids";
import OrchidDetailModal from "./OrchidDetailModal";
import { useState } from "react";
export default function Orchid() {
  const [show, setShow] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (orchid) => {
    setSelectedOrchid(orchid);
    setShow(true);
  };

  return (
    <Container>
      <Row>
        {orchids.map((orchid) => (
          <Col md={3} key={orchid.id}>
            <Card>
              <Card.Img
                variant="top"
                src={orchid.image}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{orchid.name}</Card.Title>
                <Card.Text>{orchid.category}</Card.Text>
                <Button variant="primary" onClick={() => handleShow(orchid)}>
                  Detail
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <OrchidDetailModal
        show={show}
        handleClose={handleClose}
        selectedOrchid={selectedOrchid}
      />
    </Container>
  );
}
