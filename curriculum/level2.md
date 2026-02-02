# Level 2: JavaScript カリキュラム

> **目標**: JavaScriptコードの問題点を見抜き、レビューで指摘できる

## 🎯 到達基準
- [ ] 型の暗黙変換によるバグを発見できる
- [ ] 非同期処理の問題（未処理のPromise、await忘れ）を指摘できる
- [ ] スコープ・クロージャの問題を見抜ける
- [ ] AIが書いたJavaScriptの改善点を提案できる

## 📚 ソース（ファクト根拠）
- [roadmap.sh/javascript](https://roadmap.sh/javascript) - 業界標準ロードマップ
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting) - Mozilla公式
- [MDN Curriculum - JavaScript fundamentals](https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/) - 公式カリキュラム

## 📜 関連資格
**[HTML5プロフェッショナル認定試験 レベル2](https://html5exam.jp/outline/lv2.html)**
- JavaScript、WebブラウザAPI、非同期通信、セキュリティモデルを問う
- 受験料: 16,500円
- 前提: レベル1認定が必要
- このカリキュラム完了で出題範囲の大部分をカバー

---

## 🔥 2026年の重要な変化

> **AIが書いたコードをレビューする時代**

(出典: [Medium - JavaScript in 2026](https://medium.com/front-end-weekly/javascript-in-2026-what-we-stopped-using-and-why-it-matters-da5664709c46))

```
2020年: 自分でコードを書く → レビューを受ける
2026年: AIがコードを書く → 自分がレビューする
```

**シニアに求められる力:**
- AIが書いたコードの「論理エラー」を見抜く
- セキュリティ脆弱性を発見する
- パフォーマンス問題を指摘する

**だからこそ「読む力」が最重要**

---

## Phase 1: JavaScript基礎（コードを読む力）

### 学習順序（MDN準拠）

| # | レッスン | 読めるようになること | ソース |
|---|----------|---------------------|--------|
| 01 | JavaScriptとは | JSの役割、実行環境を説明できる | MDN |
| 02 | 変数と定数 | let/const/varの違いを識別できる | MDN |
| 03 | データ型 | プリミティブ型と参照型を区別できる | MDN |
| 04 | 演算子 | 比較演算子(==/===)の違いを理解 | MDN |
| 05 | 制御構造 | if/switch/for/whileを読める | MDN |
| 06 | 関数 | 関数宣言/式/アロー関数を識別 | MDN |
| 07 | スコープ | グローバル/関数/ブロックスコープを理解 | MDN |
| 08 | 配列 | 配列メソッド(map/filter/reduce)を読める | MDN |
| 09 | オブジェクト | オブジェクトリテラル、プロパティアクセスを理解 | MDN |

### 重要ポイント（2026年の必須知識）

**var は使わない**（出典: [roadmap.sh](https://roadmap.sh/javascript)）
```javascript
// ❌ 古い書き方
var name = "太郎";

// ⭕ 現代の書き方
const name = "太郎";  // 再代入しない
let count = 0;        // 再代入する
```

**=== を使う**（型の厳密比較）
```javascript
// ❌ 危険（型変換が起きる）
if (value == "1") { }   // value が 1 でも true

// ⭕ 安全（型も比較）
if (value === "1") { }  // value が "1" の時だけ true
```

### ⚠️ レビューで指摘すべきPhase 1の問題

| 問題 | 指摘例 | 危険度 |
|------|--------|--------|
| var使用 | 「let/constを使うべき」 | 中 |
| ==使用 | 「===に変更すべき（型変換バグの温床）」 | 高 |
| マジックナンバー | 「定数化すべき」 | 中 |
| 巨大関数 | 「30行超は分割すべき」 | 中 |
| 不明確な命名 | 「data→userListなど意味のある名前に」 | 中 |

**完了時** → 教科書に Phase 1 セクション追加

---

## Phase 2: DOM操作・イベント（ブラウザJS）

### 学習順序

| # | レッスン | 読めるようになること | ソース |
|---|----------|---------------------|--------|
| 10 | DOMとは | DOMツリー構造を理解できる | MDN |
| 11 | 要素の取得 | querySelector系を読める | MDN |
| 12 | 要素の操作 | innerHTML/textContent/classList を理解 | MDN |
| 13 | イベント基礎 | addEventListener を読める | MDN |
| 14 | イベント伝播 | バブリング/キャプチャを理解 | MDN |
| 15 | フォーム操作 | フォームデータの取得・検証を読める | MDN |

### 重要ポイント

**innerHTML vs textContent**
```javascript
// ❌ XSS脆弱性（ユーザー入力をそのまま挿入）
element.innerHTML = userInput;

// ⭕ 安全（HTMLとして解釈されない）
element.textContent = userInput;
```

**イベント委譲**（出典: [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)）
```javascript
// ❌ 各要素にリスナー（メモリ消費大）
items.forEach(item => item.addEventListener('click', handler));

// ⭕ 親要素で委譲（効率的）
container.addEventListener('click', (e) => {
  if (e.target.matches('.item')) handler(e);
});
```

### ⚠️ レビューで指摘すべきPhase 2の問題

| 問題 | 指摘例 | 危険度 |
|------|--------|--------|
| innerHTML + ユーザー入力 | 「XSS脆弱性。textContentを使うべき」 | 🔴 最高 |
| ループ内addEventListener | 「イベント委譲を検討すべき」 | 中 |
| DOM操作の連続 | 「まとめて操作（リフロー削減）」 | 中 |
| getElementById | 「querySelectorで統一すべき」 | 低 |

**完了時** → 教科書に Phase 2 セクション追加

---

## Phase 3: 非同期処理（最重要）

> **2026年、最もバグが多い領域**
> (出典: [Medium - Async/Await Bugs](https://medium.com/@saneekadam1326/7-deadly-async-await-bugs-every-javascript-developer-must-face-in-2025-c135d787477d))

### 学習順序

| # | レッスン | 読めるようになること | ソース |
|---|----------|---------------------|--------|
| 16 | 同期と非同期 | ブロッキング/ノンブロッキングを理解 | MDN |
| 17 | コールバック | コールバック地獄を識別できる | MDN |
| 18 | Promise基礎 | then/catch/finallyを読める | MDN |
| 19 | Promiseチェーン | チェーンの流れを追える | MDN |
| 20 | async/await | 非同期コードを同期的に読める | MDN |
| 21 | エラーハンドリング | try/catch/finallyを理解 | MDN |
| 22 | 並列・直列実行 | Promise.all/allSettled/raceを読める | MDN |
| 23 | Fetch API | HTTPリクエストのコードを読める | MDN |

### 重要ポイント（7つの致命的バグ）

**1. await忘れ**
```javascript
// ❌ dataはPromiseオブジェクト（バグ）
const data = fetchData();
console.log(data.name);  // undefined

// ⭕ 正しい
const data = await fetchData();
console.log(data.name);
```

**2. forEach内でawait**
```javascript
// ❌ 動かない（forEachはawaitを待たない）
items.forEach(async (item) => {
  await processItem(item);
});

// ⭕ for...of を使う
for (const item of items) {
  await processItem(item);
}

// ⭕ または並列実行
await Promise.all(items.map(item => processItem(item)));
```

**3. エラーハンドリング漏れ**
```javascript
// ❌ エラーで落ちる
const data = await fetchData();

// ⭕ エラーをキャッチ
try {
  const data = await fetchData();
} catch (error) {
  console.error('取得失敗:', error);
}
```

**4. 不要な直列実行**
```javascript
// ❌ 遅い（1つずつ待つ）
const user = await fetchUser();
const posts = await fetchPosts();

// ⭕ 速い（並列実行）
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts()
]);
```

### ⚠️ レビューで指摘すべきPhase 3の問題

| 問題 | 指摘例 | 危険度 |
|------|--------|--------|
| await忘れ | 「Promiseが返る。awaitが必要」 | 🔴 最高 |
| forEach + async | 「for...ofまたはPromise.allを使うべき」 | 🔴 最高 |
| try/catch なし | 「エラーハンドリングが必要」 | 高 |
| 不要な直列実行 | 「Promise.allで並列化すべき」 | 中 |
| finally なし | 「クリーンアップ処理が必要」 | 中 |

**完了時** → 教科書に Phase 3 セクション追加

---

## Phase 4: モダンJS・実践

### 学習順序

| # | レッスン | 読めるようになること | ソース |
|---|----------|---------------------|--------|
| 24 | 分割代入 | オブジェクト/配列の分割代入を読める | MDN |
| 25 | スプレッド構文 | ...の使い方を理解 | MDN |
| 26 | テンプレートリテラル | バッククォート文字列を読める | MDN |
| 27 | モジュール | import/exportを理解 | MDN |
| 28 | クラス | class構文を読める | MDN |
| 29 | クロージャ | クロージャのコードを追える | MDN |
| 30 | this | thisの束縛を理解 | MDN |

### 重要ポイント

**分割代入**
```javascript
// オブジェクト
const { name, age } = user;

// 配列
const [first, second] = items;

// デフォルト値付き
const { name = "名無し" } = user;
```

**スプレッド構文**
```javascript
// 配列のコピー（シャローコピー）
const newArray = [...oldArray];

// オブジェクトのマージ
const merged = { ...obj1, ...obj2 };
```

**クロージャ**（面接頻出）
```javascript
function createCounter() {
  let count = 0;  // この変数が「閉じ込められる」
  return function() {
    return ++count;
  };
}
const counter = createCounter();
counter(); // 1
counter(); // 2
```

### ⚠️ レビューで指摘すべきPhase 4の問題

| 問題 | 指摘例 | 危険度 |
|------|--------|--------|
| オブジェクトの直接変更 | 「スプレッド構文でコピーすべき」 | 高 |
| 循環参照 | 「メモリリークの原因」 | 高 |
| thisの誤解 | 「アロー関数にすべき」 | 中 |
| 不要なクラス | 「関数で十分」 | 低 |

**完了時** → 教科書に Phase 4 セクション追加
→ **Level 2 完了 → Level 3: React/TypeScript へ**

---

## 📋 総合レビューチェックリスト

### セキュリティ
- [ ] innerHTML にユーザー入力を渡していないか
- [ ] eval() を使っていないか
- [ ] 信頼できないデータをそのまま使っていないか

### パフォーマンス
- [ ] ループ内で不要なDOM操作をしていないか
- [ ] 不要な直列await をしていないか
- [ ] 大きな配列を毎回コピーしていないか

### 保守性
- [ ] 関数が30行を超えていないか
- [ ] 変数名が意味を持っているか
- [ ] マジックナンバーがないか

### エラーハンドリング
- [ ] 非同期処理にtry/catchがあるか
- [ ] エラー時の挙動が定義されているか
- [ ] finallyでクリーンアップしているか

---

## 注意事項

**この段階ではAIにコードを書かせない**
(出典: [Bite of Code](https://biteofcode.com/web-dev-roadmap-2026/))
> "Do not use AI to write your code at this stage. It will generate code for you, but it will not make you a developer."

**TypeScriptは後で学ぶ**
(出典: [Scaler](https://www.scaler.com/blog/javascript-roadmap/))
> TypeScriptは基礎を習得してから。焦って学ぶと混乱する。
