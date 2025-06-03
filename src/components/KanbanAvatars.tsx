import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

type User = {
  id: string;
  name: string;
  avatar: string;
  selected: boolean;
};

type KanbanAvatarsProps = {
  users: User[];
  visibleCount?: number;
  onSelect: (user: User) => void;
};

const KanbanAvatars: React.FC<KanbanAvatarsProps> = ({
  users,
  visibleCount = 3,
  onSelect,
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleSelect = (user: User) => {
    setSelectedUserId(user.id);
    onSelect(user);
  };

  const visibleUsers = users.slice(0, visibleCount);
  const hiddenUsers = users.slice(visibleCount);

  return (
    <>
      <div className="avatars-stack">
        {visibleUsers.map((user) => (
          <div
            key={user.id}
            className={`avatar ${user.selected ? "selected" : ""}`}
            onClick={() => handleSelect(user)}
          >
            <img className="avatar-img" src={user.avatar} alt={user.name} />
          </div>
        ))}
        {hiddenUsers.length > 0 && (
          <Dropdown>
            <Dropdown.Toggle className="avatar bg-secondary text-white" size="sm">
              +{hiddenUsers.length}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {hiddenUsers.map((user) => (
                <Dropdown.Item key={user.id} onClick={() => handleSelect(user)}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: 24, height: 24, borderRadius: "50%", marginRight: 8 }}
                  />
                  {user.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
        {/* <div className="avatar">
          <img className="avatar-img" src="https://coreui.io/bootstrap/docs/assets/img/avatars/1.jpg" alt="user@email.com" />
        </div>
        <div className="avatar">
          <img className="avatar-img" src="https://coreui.io/bootstrap/docs/assets/img/avatars/2.jpg" alt="user@email.com" />
        </div>
        <div className="avatar">
          <img className="avatar-img" src="https://coreui.io/bootstrap/docs/assets/img/avatars/3.jpg" alt="user@email.com" />
        </div>
        <div className="avatar bg-secondary">
          +2
        </div> */}
      </div>
    </>
  );
};

export default KanbanAvatars;
