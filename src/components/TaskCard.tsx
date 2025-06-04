import React from "react";
import { Card, Button, Image, Row, Col } from "react-bootstrap";
import { BsExclamationCircle, BsClock } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";

const BsExclamationCircleSvg = BsExclamationCircle as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
const BsClockSvg = BsClock as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
const FaRegCalendarAltSvg = FaRegCalendarAlt as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
interface TaskCardProps {
//   id: string;
  title: string;
  userAvatar: string;
  dueDate: string;
  timeSpent: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
//   id,
  title,
  userAvatar,
  dueDate,
  timeSpent,
}) => {
  return (
    <Card className="mb-3 shadow-sm border">
      <div className="border-top border-4" style={{ borderColor: "#f00" }} />
      <Card.Body className="p-3">
        {/* <div className="text-muted fw-bold small">#{id}</div> */}
        <Card.Title className="fs-6 mb-1">{title}</Card.Title>
        <Card.Text className="text-muted small mb-2">
          short description of the task goes here. It should be concise and
          informative.
        </Card.Text>

        <Row className="align-items-center mb-2">
          <Col xs="auto">
            <Image src={userAvatar} roundedCircle width={28} height={28} />
          </Col>
          <Col className="d-flex align-items-center gap-1 text-muted small">
            <FaRegCalendarAltSvg />
            <span>{dueDate}</span>
            {<BsExclamationCircleSvg color="orange" />}
          </Col>
        </Row>

        <Row className="justify-content-between align-items-center">
          <Col xs="auto">
            <Button variant="light" size="sm" disabled>
              Apply
            </Button>
          </Col>
          <Col
            xs="auto"
            className="d-flex align-items-center gap-1 text-muted small"
          >
            <BsClockSvg />
            <span>{timeSpent}</span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
