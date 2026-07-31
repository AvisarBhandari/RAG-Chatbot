import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const Layout = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-200">
      
      <div className="flex flex-row">
          <Sidebar />
          <MainContent />
      </div>
    </div>
  );
};

export default Layout;
