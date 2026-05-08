import { useState } from "react";
import TitleScreen from "./components/TitleScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";
import "./App.css";


export default function OneButtonGame() {
  const [screen, setScren] = useState("main");
  const [volume, setVolume] = useState(0.3);

  return (
    <div className="displaySize">
        {screen === "main" && (
          <TitleScreen
            onStart={() => setScren("game")}
            volume={volume}
            onVolumeChange={setVolume}
          />
        )}
        {screen === "game" && (
          <GameScreen
            onStart={() => setScren("result")}
            volume={volume}
          />
        )}
        {screen == "result" && (
          <ResultScreen  onStart={() => setScren("main")} />
        )}
    </div>
  ); 
}
