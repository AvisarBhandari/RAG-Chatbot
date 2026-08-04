import React from "react";

const Message = (props) => {
  function breakText(str) {
    const chunkSize = 130;
    const chunks = [];
    let start = 0;

    while (start < str.length) {
      let end = start + chunkSize;

      if (end >= str.length) {
        chunks.push(str.slice(start));
        break;
      }

      // Find the last space before the limit
      let lastSpace = str.lastIndexOf(" ", end);

      // If there's no space, fall back to the fixed size
      if (lastSpace <= start) {
        lastSpace = end;
      }

      chunks.push(str.slice(start, lastSpace));
      start = lastSpace + 1; // Skip the space
    }

    return chunks;
  }
  const chunks = breakText(props.message.content);
  if (props.message.role === "user") {
    return (
      <div className="chat chat-end ">
        <div className="chat-bubble">
          {" "}
          <div>
            {chunks.map((chunk, index) => (
              <React.Fragment key={index}>
                {chunk}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="chat chat-start w-[80%]">
        <div className="chat-bubble">
          {chunks.map((chunk, index) => (
            <React.Fragment key={index}>
              {chunk}
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
};

export default Message;
