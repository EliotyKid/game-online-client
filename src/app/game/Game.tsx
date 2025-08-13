"use client";
import { useEffect, useState } from "react";

const Game = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const res = await fetch("http://localhost:3000/api/session-token", {
          credentials: "include", // ⚠ envia cookies httpOnly junto
        });
        const data = await res.json();
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("authToken", data.token);
        }
      } catch (err) {
        console.error("Failed to fetch token:", err);
      }
    }

    fetchToken();
  }, []);

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
