import React from "react";

const Message = (props) => {
  if (props.message.role === "user") {
    return (
      <div className="chat chat-end">
        <div className="chat-bubble">{props.message.content}</div>
      </div>
    );
  } else {
    return (
      <div className="chat chat-start">
        <div className="chat-bubble">{props.message.content}</div>
      </div>
    );
  }


};

export default Message;
