---
title: 配列のコピー
slug: array-copy-post
date: "2026-03-12"
category: React
summary: なぜmap()やスプレッド構文をわざわざ使うのか？
tags:
  - JavaScript
  - React
---

# わざわざ配列をコピーする理由

Reactでよく配列を扱うとき

```jsx
list.map()
[...list]
```

のように配列をコピーしてから操作するコードをよく見かけます。

でも普通に考えると、

> `a = b` と書いたら b は a のコピーになるのでは？

と思いませんか？

私も最初はそう思いました。  
しかし調べてみると、どうやらプログラムの世界では少し事情が違うようです。

ということで、自分なりに調べて整理してみました。

もし間違っていたらすみません！

---

# 実験してみる

まずは配列を表示する簡単なコードです。

```jsx
const greetingList = [
  {id:0, title: "Hello."},
  {id:1, title: "Nice to meet you."},
  {id:2, title: "Good evening."},
  {id:3, title: "See you again!"}
];

export default function Test() {
  return (
    <ul>
      {greetingList.map((g) => (
        <li key={g.id}>
          id：{g.id}
          <br />
          title：{g.title}
        </li>
      ))}
    </ul>
  );
}
```

結果

```text
・id：0
　title：Hello.
・id：1
　title：Nice to meet you.
・id：2
　title：Good evening.
・id：3
　title：See you again!
```

しっかり表示されました。

ではこの配列を `reverse()` を使って逆順にしてみます。

---

# reverse() を使ってみる

```jsx
const greetingList = [
  {id:0, title: "Hello."},
  {id:1, title: "Nice to meet you."},
  {id:2, title: "Good evening."},
  {id:3, title: "See you again!"}
];

export default function Test() {
  const reverseGreetingList = greetingList.reverse();

  return (
    <ul>
      {reverseGreetingList.map((g) => (
        <li key={g.id}>
          id：{g.id}
          <br />
          title：{g.title}
        </li>
      ))}
    </ul>
  );
}
```

予想では

```text
・id：3
　title：See you again!
・id：2
　title：Good evening.
・id：1
　title：Nice to meet you.
・id：0
　title：Hello.
```

になるはずですが、結果は…

```text
・id：0
　title：Hello.
・id：1
　title：Nice to meet you.
・id：2
　title：Good evening.
・id：3
　title：See you again!
```

変わっていません。

なぜでしょうか？

---

# スプレッド構文を使う

こういうときは、配列をコピーしてから `reverse()` を使うと動きます。

```jsx
const reverseGreetingList = [...greetingList].reverse();
```

コード

```jsx
const greetingList = [
  {id:0, title: "Hello."},
  {id:1, title: "Nice to meet you."},
  {id:2, title: "Good evening."},
  {id:3, title: "See you again!"}
];

export default function Test() {
  const reverseGreetingList = [...greetingList].reverse();

  return (
    <ul>
      {reverseGreetingList.map((g) => (
        <li key={g.id}>
          id：{g.id}
          <br />
          title：{g.title}
        </li>
      ))}
    </ul>
  );
}
```

結果

```text
・id：3
　title：See you again!
・id：2
　title：Good evening.
・id：1
　title：Nice to meet you.
・id：0
　title：Hello.
```

ちゃんと逆順になりました。

---

# なぜコピーする必要があるのか

ここで疑問です。

```jsx
const reverseGreetingList = greetingList.reverse();
```

と

```jsx
const reverseGreetingList = [...greetingList].reverse();
```

この2つの違いは何でしょう？

実は JavaScript では

> 配列やオブジェクトは「値」ではなく「参照」がコピーされる

という特徴があります。

---

# 値のコピー

例えば普通の変数です。

```js
let a = 1;
let b = a;

b += 5;

console.log(a);
console.log(b);
```

結果

```text
1
6
```

これは

- `a`
- `b`

が **別の値**として保存されているからです。

---

# 配列は参照コピーになる

配列の場合は違います。

```js
const a = [1,2,3];
const b = a;
```

これは

```
a ----\
       → [1,2,3]
b ----/
```

のように

**同じデータを参照する変数が2つある状態**になります。

つまり

```js
b.push(4);
```

とすると

```text
a = [1,2,3,4]
b = [1,2,3,4]
```

両方変わります。

---

# なぜこんな仕様なのか

理由は **パフォーマンス**です。

もし配列が代入のたびにコピーされるとします。

例えば

```text
1000万件のデータ
```

が入った配列をコピーするプログラムを想像してください。

```js
const b = a;
```

のたびに

```text
1000万件コピー
```

されていたら

- メモリ
- 処理時間

が大変なことになります。

そのため JavaScript では

```
配列 = 参照コピー
```

という仕組みになっています。

---

# Reactのルール

ここで React のルールが関係してきます。

Reactでは

> state と props は直接変更してはいけない

というルールがあります。

なぜかというと

> Reactは参照の変化で更新を判断するから

です。

例えば

```js
arr.push(4);
setArr(arr);
```

これは

```
同じ参照
```

なので React は

```
変化なし
```

と判断する可能性があります。

---

# 正しい書き方

そのため React では

```js
setArr([...arr, 4]);
```

のように

```
新しい配列
```

を作って更新します。

これで

```
古い配列 !== 新しい配列
```

となり、Reactが変更を検知できます。

---

# まとめ

今回の話をまとめると

### JavaScript

- 配列は値コピーではない  
- 参照コピーになる  

### React

- stateは直接変更してはいけない  
- Reactは参照の変化で更新を判断する  

そのため

> 配列を書き換えるときはコピーしてから変更する

という書き方になります。

---

# おわりに

最初は

```
なんでわざわざコピーするの？
```

と思っていましたが

- JavaScriptの仕様
- Reactの仕組み

を知ると理由が見えてきました。

Reactでは

> 配列を書き換えるときは直接変更せず、新しい配列を作る

という認識を持っておけば良さそうです。

もしかしたらこの考え方は **シャローコピー** を理解するときにも役立つかもしれません。