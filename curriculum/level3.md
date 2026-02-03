# Level 3: React/TypeScript カリキュラム

> **目標**: React/TypeScriptコードの問題点を見抜き、レビューで指摘できる

## 🎯 到達基準
- [ ] コンポーネント設計の問題（責務過多、props drilling）を指摘できる
- [ ] Hooksの誤用（依存配列の欠落、useEffect濫用）を発見できる
- [ ] TypeScriptの型エラー・any濫用を見抜ける
- [ ] パフォーマンス問題（不要な再レンダリング）を特定できる
- [ ] Server/Client Componentsの境界の問題を指摘できる

## 📚 ソース（ファクト根拠）
- [react.dev](https://react.dev/) - React公式ドキュメント
- [roadmap.sh/react](https://roadmap.sh/react) - 業界標準ロードマップ
- [typescriptlang.org](https://www.typescriptlang.org/) - TypeScript公式
- [React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/) - コミュニティベストプラクティス
- [Next.js App Router](https://nextjs.org/docs/app) - Next.js公式

## 📜 関連資格
**現時点でReact/TypeScript専用の資格は存在しない**

代わりに実務で評価されるもの：
- GitHubでのOSSコントリビューション
- 技術ブログでのアウトプット
- 実プロジェクトでのコードレビュー実績

---

## 🔥 2026年の重要な変化

> **Reactは大きく進化した。2022年の知識は古い**

(出典: [react.dev](https://react.dev/), [Next.js Blog](https://nextjs.org/blog))

| 項目 | 古い（〜2022） | 新しい（2026） |
|------|---------------|---------------|
| ルーティング | Pages Router | **App Router** |
| データ取得 | useEffect + fetch | **Server Components** |
| 状態管理 | Redux一強 | **Zustand + TanStack Query** |
| メモ化 | 手動useMemo/useCallback | **React Compiler自動化** |
| 型付け | 任意 | **TypeScript必須** |
| フォーム | useState連打 | **React Hook Form / Server Actions** |

**シニアに求められる力:**
- 古いパターンと新しいパターンの違いを説明できる
- 「なぜ変わったか」の理由を理解している
- AIが古いパターンで書いたコードを指摘できる

---

## Phase 1: TypeScript基礎（型を読む力）

> **なぜTypeScriptから始めるか？**
> ReactコードのほぼすべてがTypeScriptで書かれる2026年。
> 型が読めないと、Reactコードも読めない。

### 学習順序

| # | レッスン | 読めるようになること | ソース |
|---|----------|---------------------|--------|
| 01 | TypeScriptとは | JSとの違い、型システムの意義を説明できる | TS公式 |
| 02 | 基本の型 | string/number/boolean/null/undefinedを識別できる | TS公式 |
| 03 | 型推論 | 明示的型注釈と推論の違いを理解できる | TS公式 |
| 04 | Union型・リテラル型 | `"success" \| "error"` のような型を読める | TS公式 |
| 05 | interface と type | 使い分けの基準を説明できる | TS公式 |
| 06 | ジェネリクス | `Array<T>`, `Promise<T>` を読める | TS公式 |
| 07 | 型ガード・Narrowing | `if (x !== null)` で型が絞られることを理解 | TS公式 |
| 08 | ユーティリティ型 | Partial/Pick/Omit/Recordを読める | TS公式 |

### 重要ポイント

**any は「型を諦めた」サイン**
```typescript
// ❌ any = 型チェック無効化（バグの温床）
function process(data: any) {
  return data.name.toUpperCase(); // 実行時エラーの可能性
}

// ⭕ 具体的な型を定義
interface User {
  name: string;
}
function process(data: User) {
  return data.name.toUpperCase(); // 型安全
}
```

**as アサーションは「嘘をつく」可能性**
```typescript
// ❌ 危険（実際はnullかもしれない）
const element = document.getElementById("app") as HTMLDivElement;
element.innerHTML = "Hello"; // nullなら実行時エラー

// ⭕ 型ガードで安全に
const element = document.getElementById("app");
if (element instanceof HTMLDivElement) {
  element.innerHTML = "Hello";
}
```

**ジェネリクスは「型の引数」**
```typescript
// T は型のプレースホルダー（変数のようなもの）
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello"); // T = string
identity<number>(42);      // T = number
```

### ⚠️ レビューで指摘すべきPhase 1の問題

| 問題 | 指摘例 | 危険度 |
|------|--------|--------|
| any使用 | 「具体的な型を定義すべき」 | 🔴 最高 |
| asアサーション乱用 | 「型ガードで安全に絞り込むべき」 | 高 |
| 型注釈の欠落（関数引数） | 「引数の型を明示すべき」 | 高 |
| @ts-ignore | 「根本的な型エラーを修正すべき」 | 🔴 最高 |
| 複雑すぎる型 | 「型を分割して可読性を上げるべき」 | 中 |

**完了時** → 教科書に Phase 1 セクション追加

---

## Phase 2: React基礎（コンポーネントを読む力）

> **コンポーネント = UIの部品**
> Reactは「UIを部品に分けて組み立てる」考え方

### 学習順序

| # | レッスン | 読めるようになること | ソース |
|---|----------|---------------------|--------|
| 09 | Reactとは | 宣言的UI、仮想DOMを説明できる | react.dev |
| 10 | JSXの仕組み | JSXがJavaScriptに変換されることを理解 | react.dev |
| 11 | コンポーネントとProps | 親→子のデータの流れを追える | react.dev |
| 12 | useState | 状態の読み書きを追える | react.dev |
| 13 | イベントハンドリング | onClick等のイベント処理を読める | react.dev |
| 14 | 条件付きレンダリング | 三項演算子、&&での出し分けを読める | react.dev |
| 15 | リストとkey | map()でのリスト描画、keyの意味を理解 | react.dev |
| 16 | コンポーネント設計 | 責務分離、再利用性の判断ができる | react.dev |

### 重要ポイント

**Reactは「宣言的」**
```tsx
// ❌ 命令的（DOM操作を直接指示）
document.getElementById("count").textContent = count;

// ⭕ 宣言的（UIの「状態」を宣言）
<span>{count}</span>  // countが変わればUIも自動で変わる
```

**Propsは「読み取り専用」**
```tsx
// ❌ Propsを直接変更（Reactのルール違反）
function Child({ user }) {
  user.name = "変更"; // 絶対ダメ！
}

// ⭕ 親に変更を依頼
function Child({ user, onUpdate }) {
  const handleClick = () => onUpdate({ ...user, name: "変更" });
}
```

**key={index} は危険**
```tsx
// ❌ indexをkeyに使う（並び替え・削除でバグる）
items.map((item, index) => <Item key={index} data={item} />)

// ⭕ 一意のIDをkeyに
items.map((item) => <Item key={item.id} data={item} />)
```

**コンポーネントの型定義**
```tsx
// Propsの型を定義
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean; // ?は省略可能
}

// 関数コンポーネント
function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

### ⚠️ レビューで指摘すべきPhase 2の問題

| 問題 | 指摘例 | 危険度 |
|------|--------|--------|
| key={index} | 「一意のIDをkeyにすべき」 | 🔴 最高 |
| Props型定義なし | 「interfaceでPropsの型を定義すべき」 | 高 |
| 巨大コンポーネント | 「責務を分割すべき（100行超）」 | 高 |
| Propsの直接変更 | 「イミュータブルに扱うべき」 | 🔴 最高 |
| props drilling（深いバケツリレー） | 「Context または状態管理ライブラリを検討」 | 中 |

**完了時** → 教科書に Phase 2 セクション追加

---

## Phase 3: Hooks深掘り（★最重要）

> **Hooksはバグの宝庫**
> 最もレビューで指摘が多い領域。徹底的に理解する。

(出典: [react.dev/learn/synchronizing-with-effects](https://react.dev/learn/synchronizing-with-effects))

### 学習順序

| # | レッスン | 読めるようになること | ソース |
|---|----------|---------------------|--------|
| 17 | useEffect基礎 | 副作用の実行タイミングを理解 | react.dev |
| 18 | useEffect実践 | データフェッチ、購読の書き方を読める | react.dev |
| 19 | useEffectの罠 | 無限ループ、依存配列問題を発見できる | react.dev |
| 20 | useRef | DOMアクセス、値の保持を理解 | react.dev |
| 21 | useContext | グローバル状態共有を読める | react.dev |
| 22 | useReducer | 複雑な状態更新を追える | react.dev |
| 23 | useMemo/useCallback | メモ化の意図を理解できる | react.dev |
| 24 | カスタムHooks | ロジックの再利用パターンを読める | react.dev |

### 重要ポイント

**依存配列の欠落 = バグ**
```tsx
// ❌ userIdが変わっても再実行されない（古いデータ）
useEffect(() => {
  fetchUser(userId);
}, []); // 依存配列が空！

// ⭕ userIdを依存配列に追加
useEffect(() => {
  fetchUser(userId);
}, [userId]); // userIdが変わったら再実行
```

**クリーンアップ忘れ = メモリリーク**
```tsx
// ❌ イベントリスナーが溜まる
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);

// ⭕ クリーンアップ関数で解除
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

**条件の中でHooksは禁止**
```tsx
// ❌ 条件の中でHooks（Reactのルール違反）
if (isLoggedIn) {
  const [user, setUser] = useState(null); // エラー！
}

// ⭕ Hooksはトップレベルで呼ぶ
const [user, setUser] = useState(null);
if (isLoggedIn) {
  // userを使う処理
}
```

**useEffectの濫用に注意**
```tsx
// ❌ useEffectで派生値を計算（不要）
const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);
useEffect(() => {
  setTotal(items.reduce((sum, item) => sum + item.price, 0));
}, [items]);

// ⭕ 直接計算（派生状態はuseMemoで）
const [items, setItems] = useState([]);
const total = useMemo(
  () => items.reduce((sum, item) => sum + item.price, 0),
  [items]
);
```

### ⚠️ レビューで指摘すべきPhase 3の問題

| 問題 | 指摘例 | 危険度 |
|------|--------|--------|
| 依存配列の欠落 | 「〇〇を依存配列に追加すべき」 | 🔴 最高 |
| クリーンアップなし | 「return文でクリーンアップすべき」 | 🔴 最高 |
| 条件内でHooks | 「Hooksはトップレベルで呼ぶべき」 | 🔴 最高 |
| useEffect濫用 | 「派生値は直接計算またはuseMemoで」 | 高 |
| 不要なuseCallback | 「メモ化が不要な場合は削除すべき」 | 中 |
| useEffectでデータフェッチ | 「TanStack Query検討」 | 中 |

**完了時** → 教科書に Phase 3 セクション追加

---

## Phase 4: 実践パターン（2026年のモダンReact）

> **2026年のReact = Server Components + TypeScript**
> Next.js App Routerが事実上の標準

(出典: [nextjs.org/docs/app](https://nextjs.org/docs/app), [react.dev/reference/react/use-server](https://react.dev/reference/rsc/server-components))

### 学習順序

| # | レッスン | 読めるようになること | ソース |
|---|----------|---------------------|--------|
| 25 | Server Components | "use client"の意味、境界を理解 | react.dev |
| 26 | データフェッチング | Server Componentsでのfetch, TanStack Query | react.dev |
| 27 | 状態管理選択 | Zustand, Jotai, Context使い分け | roadmap.sh |
| 28 | フォーム管理 | React Hook Form, Server Actions | react.dev |
| 29 | Error Boundary | エラーハンドリングUIを読める | react.dev |
| 30 | パフォーマンス最適化 | React DevTools、再レンダリング検出 | react.dev |
| 31 | テスト | Testing Library, Jest でのテストを読める | testing-library |
| 32 | 総合レビュー演習 | 実務レベルのコードレビューができる | - |

### 重要ポイント

**Server Components vs Client Components**
```tsx
// server-component.tsx（デフォルト）
// ✅ サーバーで実行、JSバンドルに含まれない
async function UserList() {
  const users = await db.query('SELECT * FROM users'); // DB直アクセスOK
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// client-component.tsx
'use client'; // ← この宣言が必要
// ✅ ブラウザで実行、インタラクティブ
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Client ComponentでDBアクセスはNG**
```tsx
'use client';
// ❌ Client Componentでサーバー専用コードを呼べない
async function UserList() {
  const users = await db.query('...'); // エラー！
}

// ⭕ Server Componentでデータ取得 → Client Componentに渡す
// page.tsx (Server Component)
async function Page() {
  const users = await db.query('...');
  return <UserListClient users={users} />;
}
```

**状態管理の選び方（2026年）**
```
グローバル状態が必要？
  ├─ No → useState / useReducer
  └─ Yes → サーバー状態？
              ├─ Yes → TanStack Query
              └─ No → Zustand (シンプル) / Jotai (atom単位)
```

**React Hook Formでフォーム管理**
```tsx
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>必須項目です</span>}
      <button type="submit">送信</button>
    </form>
  );
}
```

### ⚠️ レビューで指摘すべきPhase 4の問題

| 問題 | 指摘例 | 危険度 |
|------|--------|--------|
| Client ComponentでDB直アクセス | 「Server Componentに移動すべき」 | 🔴 最高 |
| 不要な"use client" | 「Server Componentで十分」 | 中 |
| Contextで高頻度更新状態 | 「Zustand等の状態管理ライブラリを検討」 | 高 |
| useEffect内でfetch（新規） | 「Server Components/TanStack Query検討」 | 中 |
| Error Boundaryなし | 「エラーUIを用意すべき」 | 中 |
| テストなし | 「最低限のテストを追加すべき」 | 中 |

**完了時** → 教科書に Phase 4 セクション追加
→ **Level 3 完了 → Level 4: API/DB へ**

---

## 📋 総合レビューチェックリスト

### TypeScript
- [ ] any / @ts-ignore を使っていないか
- [ ] 関数の引数・戻り値に型があるか
- [ ] asアサーションを乱用していないか
- [ ] 型定義が適切に分割されているか

### コンポーネント設計
- [ ] 1コンポーネント1責務になっているか
- [ ] Propsの型が定義されているか
- [ ] key に一意のIDを使っているか
- [ ] props drilling が深くなりすぎていないか

### Hooks
- [ ] useEffectの依存配列は正しいか
- [ ] クリーンアップが必要な処理にreturnがあるか
- [ ] 条件の中でHooksを呼んでいないか
- [ ] 不要なuseEffect（派生状態の計算）がないか

### パフォーマンス
- [ ] 不要な再レンダリングがないか
- [ ] 巨大なコンポーネントがないか
- [ ] メモ化が適切か（過剰でも不足でもない）

### Server/Client境界
- [ ] "use client"が必要最小限か
- [ ] Client ComponentでDB/fsアクセスしていないか
- [ ] サーバー状態はTanStack Query等で管理しているか

---

## 注意事項

**基礎なくして応用なし**
> TypeScript、React基礎を飛ばしてNext.jsを学んでも混乱する。
> Phase 1-3を確実に理解してからPhase 4に進むこと。

**AIが書くコードは「古いパターン」が多い**
> 2026年のベストプラクティスを知っていれば、AIの出力を正しくレビューできる。

**実務では「読む力」が9割**
> 自分で書くより、他人（やAI）のコードを読んでレビューする時間の方が長い。
