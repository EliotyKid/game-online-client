"use client";

const Game = () => {
  const srcUrl = `/game/index.html`;

  return (
    <div className="w-full h-screen flex justify-center items-center bg-amber-400">
      <div
        className="bg-black flex justify-center items-center overflow-hidden"
        style={{ width: 1280, height: 720 }}
      >
        <iframe
          key={srcUrl}
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
