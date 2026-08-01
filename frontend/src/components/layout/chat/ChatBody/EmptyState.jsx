import React from "react";
import img from "../../../../assets/bot.png";

const EmptyState = () => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center mb-50 min-h-full min-w-full">
      <div className="w-50 h-54 overflow-hidden">
        <img
          src={img}
          alt="img"
          className="w-full h-full object-cover object-right"
        />
      </div>
      <div className="capitalize font-bold text-5xl">
        <span className="text-rotate duration-5000">
          <span>
            <span className="bg-teal-400 text-teal-800 px-2">Hello</span>
            <span className="bg-red-400 text-red-800 px-2">مرحبًا</span>
            <span className="bg-blue-400 text-blue-800 px-2">Bonjour</span>
            <span className="bg-teal-400 text-teal-800 px-2">नमस्ते</span>
            <span className="bg-red-400 text-red-800 px-2">Ciao</span>
            <span className="bg-blue-400 text-blue-800 px-2">Olá</span>
            <span className="bg-teal-400 text-teal-800 px-2">Hola</span>
            <span className="bg-red-400 text-red-800 px-2">నమస్తే</span>
            <span className="bg-blue-400 text-blue-800 px-2">Tere</span>
          </span>
        </span>
        <span>User</span>
      </div>
      <div className="">
        <p className="capitalize font-bold text-3xl">
          How can I help you today?
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
