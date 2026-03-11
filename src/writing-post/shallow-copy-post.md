---
title: 配列のコピー
slug: shallow-copy-post
date: "2026-03-11"
category: React
summary: なぜmap()やスプレッド構文をわざわざ使うのか？
tags:
  - JavaScript
  - React
---

# シャローコピー(Shallow copy) ＝ 浅いコピー

では本題のシャローコピーです。

たとえばこんなサンドイッチのレシピを表示するプログラムがあったとしましょう。

```jsx
let sandwichRecipeList = [
  {
    id: 0,
    title: "vegetable",
    ingredients: ["tomato", "lettuce", "ham"],
  },
  {
    id: 1,
    title: "fruit",
    ingredients: ["cream", "orange", "strawberry"],
  }
];

export default function Test() {
  return (
    <ul>
      {sandwichRecipeList.map((s) => (
        <li key={s.id}>
          id：{s.id}
          <br></br>
          title：{s.title}
          <br></br>
          ingredients：
          {s.ingredients.map((i) =>
            <Fragment key={i}>
              ・{i}
            </Fragment>
          )}
        </li>
      ))}
    </ul>
  );
}
```

表示結果は

```md
・id：0
　title：vegetable
　ingredients：・tomato・lettuce・ham
・id：1
　title：fruit
　ingredients：・cream・orange・strawberry
```

配列の中に配列があるのでmap()メソッドを入れ子の形で表示させるようにしました。

ちゃんと表示されていますね。

あら大変。なんとお客さんから嫌いな具材を聞いて書き換えたレシピを表示するよう言われてしまいました。という事でこんな感じで実装してみました。

```jsx
import { useState } from "react";

const originalRecipeList = [
  {
    id: 0,
    title: "vegetable",
    ingredients: ["tomato", "lettuce", "ham"],
  },
  {
    id: 1,
    title: "fruit",
    ingredients: ["cream", "orange", "strawberry"],
  },
];

export default function Test() {
  const [changedRecipeList, setChangedRecipeList] = useState(originalRecipeList);

  function handleRemoveIngredient(recipeId, ingredient) {
    const nextList = [...changedRecipeList];
    const recipe = nextList.find((item) => item.id === recipeId);
    recipe.ingredients.splice(recipe.ingredients.indexOf(ingredient), 1);

    setChangedRecipeList(nextList);
  }

  return (
    <div>
      <h3>元のレシピ</h3>
      <ul>
        {originalRecipeList.map((recipe) => (
          <li key={recipe.id}>
            id：{recipe.id}
            <br />
            title：{recipe.title}
            <br />
            ingredients：
            {recipe.ingredients.map((ingredient) => (
              <button
                key={ingredient}
                style={{ marginLeft: "10px" }}
                onClick={() => handleRemoveIngredient(recipe.id, ingredient)}
              >
                {ingredient}
              </button>
            ))}
          </li>
        ))}
      </ul>

      <h3>書き換えたレシピ</h3>
      <ul>
        {changedRecipeList.map((recipe) => (
          <li key={recipe.id}>
            id：{recipe.id}
            <br />
            title：{recipe.title}
            <br />
            ingredients：
            {recipe.ingredients.map((ingredient) => (
              <span key={ingredient} style={{ marginLeft: "10px" }}>
                ・{ingredient}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
```