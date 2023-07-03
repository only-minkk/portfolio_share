import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import * as Api from "../../api";

const ModalAlert = ({ currentCert, setCerts }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(!openModal);

  const handleDelete = async () => {
    const user_id = currentCert.user_id;

    await Api.delete("certificates", currentCert.id);

    const res = await Api.get("certificates", user_id);
    setCerts(res.data);
  };

  return (
    <>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={handleClose}
        className="mr-3"
      >
        삭제
      </Button>

      <Modal show={openModal} onHide={handleClose} centered>
        <Modal.Body style={{ color: "black" }}>
          정말 삭제하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              handleClose();
              handleDelete();
            }}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAlert;
