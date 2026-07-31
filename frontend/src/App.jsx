import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ChatPage from "./pages/ChatPage";
import TheamController from "./components/ThemeController";
const App = () => {
  const [theme, settheme] = useState("garden");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-200">
        <Routes>
          <Route path="/" element={<ChatPage />} />
        </Routes>
    </div>
  );
};

export default App;
