// src/game/components/BattleScreen.jsx
import { useEffect, useState } from "react";

const HANDS = ['グー', 'チョキ', 'パー']

const loseAgainstPlayer = {
  グー: "チョキ",
  チョキ: "パー",
  パー: "グー",
};

function getHints() {
  const probability = 40;
  const randHand = Math.floor(Math.random() * 3); 
  const hands = { グー: 0, チョキ: 0, パー: 0 };
  // 相手が出す手にランダムで確率に数値分プラスする（Max+50）
  for (const [index, hand] of HANDS.entries()) {
    if (randHand === index) {
      hands[hand] += probability;
    } else {
      hands[hand] += Math.floor((100 - probability) / 2);
    }
  }
  return hands;
}

function nomalize(hands) {
  const total = Object.values(hands).reduce((a, b) => a + b, 0);

  if (total === 0) {
    return { グー: 33, チョキ: 33, パー: 34};
  }

  const result = {};

  for(const hand of HANDS) {
    result[hand] = (hands[hand] / total) * 100;
  }

  return result;
}

function getEnemyRates(affection, skillPoint, judgeLog, hints, playerHand) {
  const weights = {...hints};
  const addSkillPoint = skillPoint >= 15 && judgeLog === "win" ? 10 : 0;
  const targetHand = loseAgainstPlayer[playerHand];
  
  weights[targetHand] += affection;
  weights[targetHand] += addSkillPoint;

  return nomalize(weights);
}

function getEnemyHand(affection, skillPoint, judgeLog, hints, playerHand) {
  const rates = getEnemyRates(
    affection,
    skillPoint,
    judgeLog,
    hints,
    playerHand
  );

  const rand = Math.random() * 100;
  let cumulative = 0;

  for (const hand of HANDS) {
    cumulative += rates[hand];

    if (rand < cumulative) {
      return hand;
    }
  }
  return HANDS[0];
}

function judgeResult(player, enemy) {
  if (player === enemy) return 'draw'
  if (
    (player === 'グー' && enemy === 'チョキ') ||
    (player === 'チョキ' && enemy === 'パー') ||
    (player === 'パー' && enemy === 'グー')
  ) return 'win'
  return 'lose'
}

function picRandom(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function BattleScreen({
  currentStage,
  affection,
  skillPoint,
  wins,
  attempts,
  judgeLog,
  handleWin,
  handleLose,
  handleDraw,
}) {
  const [enemyHand, setEnemyHand] = useState(null)
  const [playerHand, setPlayerHand] = useState(null)
  const [result, setResult] = useState(null)
  const [hints, setHints] = useState(getHints());
  const [visibleHands, setVisibleHands] = useState([]);
  
  useEffect(() => {
    const count = skillPoint >= 20 ? 2 : skillPoint >= 5 ? 1 : 0;
    setVisibleHands(picRandom(HANDS, count));
  }, [skillPoint]);

  function handleSelect(hand, hints) {

    const enemy = getEnemyHand(affection, skillPoint, judgeLog, hints, hand)
    const judge = judgeResult(hand, enemy)
    setPlayerHand(hand)
    setEnemyHand(enemy)
    setResult(judge)

    if (judge === 'win') handleWin()
    else if (judge === 'lose') handleLose()
    else handleDraw()
  }

  function resetRound() {
    setPlayerHand(null)
    setEnemyHand(null)
    setResult(null)
    setHints(getHints());
  }

  return (
    <div>
      <p>{currentStage.request}</p>
      <p>{wins} / {currentStage.requiredWins} 勝|残り {currentStage.maxAttempts - attempts} 回</p>

      <div>
        <p>彼女が出す確率：</p>
        {HANDS.map(hand => (
          <span key={hand}>
            {hand}: {visibleHands.includes(hand) ? `${hints[hand]}%` : "???"}
          </span>
        ))}
        <p>好感度：{affection}</p>
      </div>

      {!playerHand && (
        <div>
          {HANDS.map(hand => (
            <button key={hand} onClick={() => handleSelect(hand, hints)}>{hand}</button>
          ))}
        </div>
      )}

      {playerHand && (
        <div>
          <p>あなた：{playerHand}彼女：{enemyHand}</p>
          <p>{result === 'win' ? '勝ち！' : result === 'lose' ? '負け…' : '引き分け'}</p>
          <button onClick={resetRound}>もう一度</button>
        </div>
      )}
    </div>
  )
}