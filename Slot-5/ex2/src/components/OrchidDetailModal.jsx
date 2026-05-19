import { Modal, Button } from "react-bootstrap";

export default function OrchidDetailModal({
  show,
  handleClose,
  selectedOrchid,
}) {
  if (!selectedOrchid) return null;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedOrchid ? selectedOrchid.orchidName : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedOrchid ? (
          <>
            <div
              className="text-center rounded overflow-hidden mb-3"
              style={{ height: "300px" }}
            >
              <img
                src={selectedOrchid.image}
                alt={selectedOrchid.orchidName}
                className="w-100 h-100"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <div className="orchid-info">
              <p>
                <strong>Description:</strong>{" "}
                {selectedOrchid.description || "No description available."}
              </p>
            </div>
          </>
        ) : (
          <p>Loading details...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
