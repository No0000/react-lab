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
    // 配列だけコピーしている
    const nextList = [...changedRecipeList];

    // 中のオブジェクトは元と同じ参照
    const recipe = nextList.find((item) => item.id === recipeId);

    // ingredients配列も同じ参照なので、
    // 直接変更すると元のレシピにも影響する
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