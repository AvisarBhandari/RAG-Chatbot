import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import TheamController from "./components/ThemeController";
const App = () => {
  const [theme, settheme] = useState("garden");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-200">
      <div className="flex justify-end mr-5 mt-3">
        <TheamController />
      </div>
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
    </div>
  );
};

export default App;
