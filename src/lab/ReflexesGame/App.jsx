import { useState } from "react";
import TitleScreen from "./components/TitleScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";
import "./App.css";


export default function OneButtonGame() {
  const [screen, setScren] = useState("main");

  return (
    <div className="displaySize">
        {screen === "main" && (
          <TitleScreen onStart={() => setScren("game")} />
        )}
        {screen === "game" && (
          <GameScreen onStart={() => setScren("result")} />
        )}
        {screen == "result" && (
          <ResultScreen  onStart={() => setScren("main")} />
        )}
    </div>
  ); 
}