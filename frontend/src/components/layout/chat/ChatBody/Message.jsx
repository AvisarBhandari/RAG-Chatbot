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
const Message = ({ message }) => {
    console.log(message.role);
    console.log(message.content);
}
  // return (
  //   <div>
  //     <div className="chat chat-start">
  //       <div className="chat-bubble">
  //         It's over Anakin,
  //         <br />I have the high ground.
  //       </div>
  //     </div>
  //     <div className="chat chat-end">
  //       <div className="chat-bubble">You underestimate my power!</div>
  //     </div>
  //   </div>
  // );
};

export default Message;
