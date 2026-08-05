import axios from "axios";

export const streamChatbot = async (userMassage, onTokenReceived) => {
  const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
  console.log("API URL:", apiUrl); 
  const response = await fetch(`${apiUrl}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: userMassage }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Server returned status ${response.status}: ${errorText}`);
  }

  // 2. Safely capture the body stream
  if (!response.body) {
    throw new Error("ReadableStream not supported or missing on response.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    // decode current chunk and add them to the buffer.

    buffer += decoder.decode(value, { stream: true });
    // split into new line as each JSON is its own line.
    const lines = buffer.split("\n");
    // kepping last partial line on buffer
    buffer = lines.pop();

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const parsed = JSON.parse(line);
        if (parsed.type === "token") {
          onTokenReceived(parsed.content);
        }
      } catch (err) {
        console.error("Error parsing stream line:", err);
      }
    }
  }
};
