# Reactのstate queueを理解した話

Reactの `setState` は、その場ですぐ値を書き換えるわけではないっす。

## なぜそうなるのか

更新はすぐに反映されるのではなく、キューに入れられて次のレンダーで処理されるっす。

## 例

```js
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);