# Reactのstate queueを理解した話

Reactの `setState` は、その場ですぐ値を書き換えるわけではないっす。

## なぜそうなるのか

更新はすぐに反映されるのではなく、キューに入れられて次のレンダーで処理されるっす。

## 例


```js
const [count, setCount] = useState(0);
```

```jsx
function App() {
  return &lt;h1&gt;Hello&lt;/h1&gt;;
}
```

# テスト1

テスト1

テスト1

テスト1

テスト1

テスト1

テスト1

## テスト2

テスト2

テスト2

テスト2

テスト2

テスト2

テスト2

