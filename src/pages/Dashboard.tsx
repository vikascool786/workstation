// src/pages/Dashboard.tsx
import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Spinner,
  Modal,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useBoards } from "../hooks/useBoards";
import styles from "./Dashboard.module.css";
import CustomModal from "../ui/CustomModal";

import { PencilSquare, Trash } from "react-bootstrap-icons";
import { FiEdit, FiTrash2 } from "react-icons/fi";


import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema for board name
const boardSchema = Yup.object({
  boardName: Yup.string().trim().required("Board name is required"),
});

const Dashboard: React.FC = () => {
  const { boards, loading, error, addBoard } = useBoards();
  const [showModal, setShowModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  // icons 
   // icons 
  const FiEditSvg = FiEdit as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  const FiTrash2Svg = FiTrash2 as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
  
  const handleCreateBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBoard(newBoardName);
    setNewBoardName("");
    setShowModal(false);
  };

  const handleEditBoard = (boardId: number) => {
    // Open an edit modal or navigate to edit page
    console.log("Edit board", boardId);
  };

  const handleDeleteBoard = async (boardId: number) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      // await deleteBoard(boardId);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Boards</h2>
        <Button onClick={() => setShowModal(true)}>+ Create Board</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          {boards.map((board) => (
            <Col key={board.id} sm={6} md={4} lg={3} className="mb-4">
              <Card
                className={`shadow-sm border-0 h-100 hover-effect ${styles.boardCard}`}
              >
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="align-center card-title d-flex fs-5 fw-semibold h5 item-center justify-content-between">
                      {board.name}
                     <div>
              <FiEditSvg
                role="button"
                className="text-primary mx-2"
                // size={20}
                // title="Edit Board"
                onClick={() => handleEditBoard(board.id)}
              />
              <FiTrash2Svg
                role="button"
                className="text-danger"
                // size={20}
                // title="Delete Board"
                onClick={() => handleDeleteBoard(board.id)}
              />
            </div>
                    </Card.Title>
                    <Card.Text
                      className="text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Last updated: 2 days ago{" "}
                      {/* Replace with real value later */}
                    </Card.Text>
                  </div>
                  <div className="mt-3">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      // as={Link}
                      // to={`/kanban/${board.id}`}
                      className="w-100"
                    >
                      Open Board
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Formik
        initialValues={{ boardName: "" }}
        validationSchema={boardSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await addBoard(values.boardName);
          setSubmitting(false);
          resetForm();
          setShowModal(false);
        }}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty }) => (
          <CustomModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            title="Create New Board"
            submitLabel="Create"
            submitDisabled={!isValid || !dirty || isSubmitting}
          >
            <Form.Group>
              <Form.Label>Board Name</Form.Label>
              {/* Use Formik's Field but render react-bootstrap Form.Control */}
              <Field name="boardName">
                {({ field }: any) => (
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Enter board name"
                    isInvalid={!!field.value && !field.value.trim()}
                  />
                )}
              </Field>
              <ErrorMessage
                name="boardName"
                component="div"
                className="text-danger mt-1"
              />
            </Form.Group>
          </CustomModal>
        )}
      </Formik>
    </div>
  );
};

export default Dashboard;
