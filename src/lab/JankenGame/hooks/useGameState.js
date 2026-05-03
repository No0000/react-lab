// ゲーム全体の状態管理
// src/game/hooks/useGameState.js
import { useState } from 'react'
import { stages } from '../data/scenes'

export function useGameState() {
  const [phase, setPhase] = useState('battle')
  const [stageIndex, setStageIndex] = useState(0)
  const [points, setPoints] = useState(20)
  const [affection, setAffection] = useState(20)
  const [skillPoint, setSkillPoint] = useState(15)
  const [wins, setWins] = useState(0)
  const [judgeLog, setJudgeLog] = useState(null);
  const [attempts, setAttempts] = useState(0)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [battleResult, setBattleResult] = useState(null) // 'success' | 'fail' | null

  const currentStage = stages[stageIndex]

  // タイトル→ゲーム開始
  function startGame() {
    setPhase('dialogue')
  }

  // 会話を1行進める
  function advanceDialogue() {
    const lines = battleResult === 'success'
      ? currentStage.successDialogue
      : battleResult === 'fail'
      ? currentStage.failDialogue
      : currentStage.dialogue

    if (dialogueIndex < lines.length - 1) {
      setDialogueIndex(i => i + 1)
    } else {
      setDialogueIndex(0)
      if (battleResult === 'success') {
        if (stageIndex >= stages.length - 1) {
          setPhase('ending')
        } else {
          setPhase('shop')
        }
      } else if (battleResult === 'fail') {
        setBattleResult(null)
        setWins(0)
        setAttempts(0)
        setPhase('battle')
      } else {
        setPhase('battle')
      }
    }
  }

  // じゃんけんに勝ったとき
  function handleWin() {
    const newWins = wins + 1
    const newAttempts = attempts + 1
    setWins(newWins)
    setAttempts(newAttempts)
    setPoints(p => p + 10)
    setJudgeLog("win");

    if (newWins >= currentStage.requiredWins) {
      setBattleResult('success')
      setPhase('dialogue')
    }
  }

  // じゃんけんに負けたとき
  function handleLose() {
    const newAttempts = attempts + 1
    setAttempts(newAttempts)
    setJudgeLog("lose");

    if (newAttempts >= currentStage.maxAttempts) {
      setBattleResult('fail')
      setPhase('dialogue')
    }
  }

  // 引き分け
  function handleDraw() {
    // 何もしない（試行回数も消費しない）
  }

  // ショップでアイテム購入
  function buyItem(cost, affectionGain) {
    if (points >= cost) {
      setPoints(p => p - cost)
      setAffection(a => a + affectionGain)
    }
  }

  // ショップを抜けて次のステージへ
  function goNextStage() {
    setStageIndex(i => i + 1)
    setWins(0)
    setAttempts(0)
    setBattleResult(null)
    setJudgeLog(null);
    setPhase('dialogue')
  }

  // エンディング画面でタイトルに戻る
  function resetGame() {
    setPhase('title');
    setStageIndex(0);
    // setPoints(20);
    setAffection(0);
    setWins(0);
    setAttempts(0);
    setDialogueIndex(0);
    setBattleResult(null);
    setJudgeLog(null);
  }

  return {
    phase,
    currentStage,
    points,
    affection,
    skillPoint,
    wins,
    attempts,
    dialogueIndex,
    battleResult,
    judgeLog,
    startGame,
    advanceDialogue,
    handleWin,
    handleLose,
    handleDraw,
    buyItem,
    goNextStage,
    resetGame,
  }
}