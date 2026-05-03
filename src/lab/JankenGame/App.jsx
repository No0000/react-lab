// src/game/Game.jsx
import { useGameState } from './hooks/useGameState'
import TitleScreen from './components/TitleScreen'
import DialogueScreen from './components/DialogueScreen'
import BattleScreen from './components/BattleScreen'
import ShopScreen from './components/ShopScreen'
import EndingScreen from './components/EndingScreen'

export default function Game() {
  const gameState = useGameState()
  const { phase } = gameState

  return (
    <div>
      {phase === 'title' && <TitleScreen onStart={gameState.startGame} />}
      {phase === 'dialogue' && <DialogueScreen {...gameState} />}
      {phase === 'battle' && <BattleScreen {...gameState} />}
      {phase === 'shop' && <ShopScreen {...gameState} />}
      {phase === 'ending' && <EndingScreen resetGame={gameState.resetGame} />}
    </div>
  )
}
