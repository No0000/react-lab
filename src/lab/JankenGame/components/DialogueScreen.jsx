// 会話シーン
// src/game/components/DialogueScreen.jsx
export default function DialogueScreen({
  currentStage,
  dialogueIndex,
  battleResult,
  advanceDialogue,
}) {
  const lines = battleResult === 'success'
    ? currentStage.successDialogue
    : battleResult === 'fail'
    ? currentStage.failDialogue
    : currentStage.dialogue

  const currentLine = lines[dialogueIndex]

  return (
    <div>
      <p>{currentLine.speaker === 'player' ? 'あなた' : '彼女'}</p>
      <p>{currentLine.text}</p>
      <button onClick={advanceDialogue}>次へ</button>
    </div>
  )
}