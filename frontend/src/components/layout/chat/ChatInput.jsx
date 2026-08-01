import React from "react";
import { useState } from "react";
import { Send } from "lucide-react";
const ChatInput = () => {
  const [text, setText] = useState("");
  return (
    <div className="flex min-w-full h-20  items-center justify-center">
      <div class="absolute bottom-10 w-full max-w-[50%] px-4">
        <div className="flex items-end gap-2 p-2 border rounded-xl bg-accent-content shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <textarea
            name="massage"
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask Anything..."
            id=""
            className="float w-full min-h-11 max-h-40 field-sizing-content rounded-xl p-2 text-xl text-base-content outline-none resize-none overflow-auto"
          ></textarea>
          <button className="btn btn-square bg-base-content rounded-4xl">
            <Send className="text-base-100"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
