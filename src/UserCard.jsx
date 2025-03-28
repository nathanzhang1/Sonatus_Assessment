import React, { useState } from "react";
import "./UserCard.css";

export default function UserCard({user}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="user-card" onClick={toggleExpand}>
      <div className="user-header">
        <div className="user-name">{user.name}</div>
        <div className="user-email">{user.email}</div>
      </div>

      {/* Only show more details when card clicked on and expanded */}
      {expanded && (
        <div className="user-details">
          <div>Address: {user.address}</div>
          <div>Phone: {user.phone}</div>
          <div>Company: {user.company}</div>
        </div>
      )}
    </div>
  );
}
