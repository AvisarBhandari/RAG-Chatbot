import React,{ useState } from "react";
import { Send } from "lucide-react";
const ChatInput = ({onSend}) => {
  const [text, setText] = useState("");
  const handleSubmit = (e) =>{
    // If called 'handelKeyDown' 'e' will not be define.(Learn the hard way)
    if (e) e.preventDefault();
    // prevent empty message
    if (!text.trim){return}
    else{
      onSend(text)
      setText("");
    }
  }
 const handleKeyDown = (e) => {
    // Check if Enter was pressed without Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex min-w-full h-20  items-center justify-center">
      <div class="absolute bottom-10 w-full max-w-[50%] px-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-2 p-2 border rounded-xl bg-accent-content shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
        >
          <textarea
            name="massage"
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask Anything..."
            value={text}
            onKeyDown={handleKeyDown}
            className="float w-full min-h-11 max-h-40 field-sizing-content rounded-xl p-2 text-xl text-base-content outline-none resize-none overflow-auto"
          ></textarea>
          <button
            type="submit"
            className="btn btn-square bg-base-content rounded-4xl"
          >
            <Send className="text-base-100" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
