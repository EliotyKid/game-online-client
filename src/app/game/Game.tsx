"use client";

import { use, useEffect, useState } from "react";

const Game = ({ token }: { token?: string }) => {
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    }
  }, [token]);

  const srcUrl = token
    ? `/game/index.html?token=${token}`
    : `/game/index.html`;

  return (
    <div className="w-full h-screen flex justify-center items-center bg-amber-400">
      <div
        className="bg-black flex justify-center items-center overflow-hidden"
        style={{ width: 1280, height: 720 }}
      >
        <iframe
          key={srcUrl} // força recarregar quando o token muda
          src={srcUrl}
          width="1280"
          height="720"
          style={{ border: "none", overflow: "hidden" }}
        />
      </div>
    </div>
  );
};

export default Game;
