// シナリオデータ・ステージ設定

export const stages = [
  {
    id: 0,
    request: '初めての会話',
    requiredWins: 3,
    maxAttempts: 5,
    dialogue: [
      { speaker: 'player', text: 'あ…あのさ、なんの本読んでるの？' },
      { speaker: 'girl', text: 'ん？うーん。' },
      { speaker: 'girl', text: '教えない。' },
      { speaker: 'player', text: 'へ？' },
      { speaker: 'girl', text: 'じゃんけんに勝ったら教えてあげる。' },
      { speaker: 'player', text: 'じゃ、じゃんけん？' },
      { speaker: 'girl', text: 'そう、じゃんけん。' },
      { speaker: 'player', text: 'なんでじゃんけん？' },
      { speaker: 'girl', text: 'タダで教えるのが嫌だから。' },
      { speaker: 'player', text: '（想像した感じじゃなかった…。）' },
    ],
    successDialogue: [
      { speaker: 'girl', text: 'あー、負けちゃった。'},
    ],
    failDialogue: [
      { speaker: 'girl', text: '普通に背表紙見れば？' },
    ],
  },
  {
    id: 1,
    request: '',
    requiredWins: 1,
    maxAttempts: 5,
    dialogue: [
      { speaker: 'player', text: 'テキスト' },
    ],
    successDialogue: [
      { speaker: 'girl', text: '勝ち'},
    ],
    failDialogue: [
      { speaker: 'girl', text: '負け' },
    ],
  },
]