import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface CustomModalProps {
  show: boolean;
  onClose: () => void;
  // onSubmit: (e: React.FormEvent) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  children: React.ReactNode;
  submitLabel?: string;
  submitDisabled?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  show,
  onClose,
  onSubmit,
  title,
  children,
  submitLabel = "Submit",
  submitDisabled = false,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{children}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {submitLabel}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CustomModal;
