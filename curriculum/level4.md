# Level 4: Node.js / API / Database

> **目標**: バックエンドのコードを読み、API設計ミス・SQLインジェクション・N+1問題を検出できる

## 概要

| 項目 | 内容 |
|------|------|
| 期間目安 | 4-6週間 |
| 前提知識 | Level 3（React/TypeScript）完了 |
| 関連資格 | データベーススペシャリスト、AWS認定 |
| 主要技術 | Node.js 24 LTS, PostgreSQL, Prisma/Drizzle |

---

## Phase 1: Node.js基礎（node1-node8）

### 学習目標
- ESMとCommonJSの違いを説明できる
- Node.jsのイベントループを理解している
- フレームワーク選択の判断基準を持てる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| node1 | Node.jsとは | サーバーサイドJS、V8エンジン、ノンブロッキングI/O | - |
| node2 | ESM vs CommonJS | `import`/`export` vs `require`/`module.exports`、移行方法 | CJS使用は古い |
| node3 | package.json | `"type": "module"`、scripts、dependencies | `"type"` 未設定 |
| node4 | イベントループ | コールスタック、タスクキュー、マイクロタスク | 同期的ブロッキング |
| node5 | 非同期パターン | Promise、async/await、エラーハンドリング | try-catch漏れ |
| node6 | ファイル操作 | fs/promises、ストリーム | 同期API使用 |
| node7 | 環境変数 | dotenv、process.env、機密情報管理 | ハードコード |
| node8 | フレームワーク比較 | Express / Fastify / Hono / NestJS | 用途不一致 |

### フレームワーク選択ガイド（2026年版）

| フレームワーク | 特徴 | 推奨シーン |
|--------------|------|-----------|
| **Express** | 安定・成熟・巨大エコシステム | 学習用、レガシー保守 |
| **Fastify** | 高性能・JSON最適化・スキーマ検証 | Node.js本番API |
| **Hono** | 超軽量・Edge対応・マルチランタイム | Serverless/Edge |
| **NestJS** | エンタープライズ・DI・構造化 | 大規模TypeScript |

### コードレビューで見抜くべき問題

```javascript
// ❌ 古い手法（CommonJS）
const express = require('express');
module.exports = router;

// ⭕ 2026年推奨（ESM）
import express from 'express';
export default router;

// ❌ 同期的ファイル読み込み（ブロッキング）
const data = fs.readFileSync('file.txt', 'utf8');

// ⭕ 非同期ファイル読み込み
const data = await fs.promises.readFile('file.txt', 'utf8');

// ❌ 環境変数ハードコード
const secret = 'my-secret-key';

// ⭕ 環境変数から取得
const secret = process.env.JWT_SECRET;
```

### 出典
- [Node.js ESM Documentation](https://nodejs.org/api/esm.html)
- [Node.js Releases](https://nodejs.org/en/about/previous-releases)
- [Fastify vs Express vs Hono](https://medium.com/@arifdewi/fastify-vs-express-vs-hono-choosing-the-right-node-js-framework-for-your-project-da629adebd4e)

---

## Phase 2: API設計（api1-api8）

### 学習目標
- RESTful設計の原則を説明できる
- OpenAPI仕様書を読み書きできる
- REST/GraphQL/tRPCの使い分けができる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| api1 | REST原則 | リソース指向、HTTPメソッド、ステートレス | 動詞エンドポイント |
| api2 | URLエンドポイント設計 | 命名規則、階層構造、クエリパラメータ | 一貫性のなさ |
| api3 | HTTPステータスコード | 2xx/3xx/4xx/5xx、適切な使い分け | 全部200返却 |
| api4 | リクエスト/レスポンス設計 | JSON構造、ページネーション、エラー形式 | 不統一な形式 |
| api5 | APIバージョニング | URL/Header/Query方式、破壊的変更 | バージョンなし |
| api6 | OpenAPI/Swagger | 仕様書作成、コード生成、バリデーション | ドキュメント不在 |
| api7 | GraphQL概要 | Query/Mutation/Subscription、N+1問題 | Over-fetching |
| api8 | tRPC概要 | 型安全RPC、TypeScript Monorepo | 用途の誤解 |

### REST vs GraphQL vs tRPC（2026年版）

| 方式 | 強み | 弱み | 推奨シーン |
|-----|-----|-----|----------|
| **REST** | 標準的・キャッシュ容易・シンプル | Over/Under-fetching | 公開API、CRUD |
| **GraphQL** | 柔軟なデータ取得・型安全 | 学習曲線・N+1対策必須 | 複雑なUI、モバイル |
| **tRPC** | 最高の型安全・高DX | TypeScript限定 | Monorepo内部API |

### コードレビューで見抜くべき問題

```javascript
// ❌ 動詞ベースのエンドポイント
GET /getUserById?id=1
POST /createUser
DELETE /removeUser

// ⭕ RESTfulなリソース指向
GET /users/1
POST /users
DELETE /users/1

// ❌ すべて200を返す
app.post('/users', (req, res) => {
  if (!req.body.name) {
    res.status(200).json({ error: 'Name required' });  // ❌
  }
});

// ⭕ 適切なステータスコード
app.post('/users', (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: 'Name required' });  // ⭕
  }
});

// ❌ バージョニングなし
app.get('/users', ...);

// ⭕ URLバージョニング
app.get('/v1/users', ...);
```

### 出典
- [REST API Tutorial](https://restfulapi.net/)
- [OpenAPI Best Practices](https://learn.openapis.org/best-practices.html)
- [roadmap.sh/backend](https://roadmap.sh/backend)

---

## Phase 3: データベース（db1-db10）

### 学習目標
- 正規化（1NF〜3NF）を説明できる
- インデックスの仕組みと使い分けができる
- N+1問題を検出・解決できる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| db1 | RDBの基本 | テーブル、行、列、主キー、外部キー | キー設計ミス |
| db2 | SQL基礎 | SELECT/INSERT/UPDATE/DELETE、JOIN | 非効率なクエリ |
| db3 | 正規化（1NF） | 原子値、繰り返しグループ排除 | カンマ区切り格納 |
| db4 | 正規化（2NF/3NF） | 部分/推移的関数従属の排除 | 冗長データ |
| db5 | インデックス基礎 | B-tree、作成/削除、EXPLAIN | インデックス不足 |
| db6 | インデックス戦略 | 複合インデックス、部分インデックス、GIN | 過剰インデックス |
| db7 | トランザクション | ACID、分離レベル、デッドロック | トランザクション漏れ |
| db8 | ORM概要 | Prisma vs Drizzle、選択基準 | ORM誤用 |
| db9 | Prisma実践 | スキーマ定義、マイグレーション、クエリ | N+1問題 |
| db10 | パフォーマンス | クエリ最適化、コネクションプール | スロークエリ |

### 正規化の基本

| 正規形 | ルール | 違反例 |
|-------|-------|-------|
| **1NF** | 原子値のみ | `products: "apple,banana"` |
| **2NF** | 部分関数従属なし | 複合キーの一部への依存 |
| **3NF** | 推移的関数従属なし | A→B→C の間接依存 |

### Prisma vs Drizzle（2026年版）

| 項目 | Prisma | Drizzle |
|-----|--------|---------|
| アプローチ | Schema-first | Code-first |
| バンドルサイズ | 重い（Rustエンジン） | 超軽量（〜7KB） |
| 学習曲線 | 低い | 高い（SQL知識必要） |
| Serverless | 改善中 | 最適 |
| 推奨シーン | SaaS/MVP/初心者 | Edge/パフォーマンス重視 |

### コードレビューで見抜くべき問題

```sql
-- ❌ 1NF違反（カンマ区切り）
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  products VARCHAR(255)  -- "apple,banana,orange"
);

-- ⭕ 正規化（中間テーブル）
CREATE TABLE orders (id SERIAL PRIMARY KEY);
CREATE TABLE order_items (
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES products(id)
);

-- ❌ インデックスなしの外部キー
ALTER TABLE posts ADD COLUMN user_id INT REFERENCES users(id);

-- ⭕ 外部キー + インデックス
ALTER TABLE posts ADD COLUMN user_id INT REFERENCES users(id);
CREATE INDEX idx_posts_user_id ON posts(user_id);
```

```typescript
// ❌ N+1問題（ループ内でクエリ）
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({
    where: { userId: user.id }
  });
}

// ⭕ Eager Loading（1クエリで取得）
const users = await prisma.user.findMany({
  include: { posts: true }
});
```

### 出典
- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [roadmap.sh/postgresql-dba](https://roadmap.sh/postgresql-dba)

---

## Phase 4: 認証・セキュリティ（sec1-sec10）

### 学習目標
- JWT/OAuth2/Passkeyの違いを説明できる
- OWASP Top 10の脆弱性を検出できる
- セキュアなコードパターンを識別できる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| sec1 | 認証 vs 認可 | Authentication vs Authorization | 混同 |
| sec2 | パスワード管理 | bcrypt、ソルト、ストレッチング | 平文保存 |
| sec3 | JWT基礎 | 構造、署名、検証 | 署名なしdecode |
| sec4 | JWTベストプラクティス | 有効期限、Refresh Token、保存場所 | localStorage保存 |
| sec5 | OAuth2/OIDC | 認可コードフロー、IDaaS活用 | 自前実装 |
| sec6 | Passkey概要 | WebAuthn、パスワードレス | - |
| sec7 | SQLインジェクション | 攻撃手法、パラメータ化クエリ | 文字列結合SQL |
| sec8 | XSS対策 | 出力エスケープ、CSP | innerHTML直接代入 |
| sec9 | CSRF対策 | トークン、SameSite Cookie | 対策なし |
| sec10 | セキュリティヘッダー | helmet、CORS、HTTPS | ヘッダー未設定 |

### OWASP Top 10（2025年版）

| 順位 | 脆弱性 | Node.jsでの対策 |
|-----|-------|----------------|
| A01 | Broken Access Control | RBAC実装、最小権限原則 |
| A02 | Cryptographic Failures | HTTPS必須、bcrypt使用 |
| A03 | Injection | パラメータ化クエリ、ORM使用 |
| A05 | Security Misconfiguration | helmet、環境変数管理 |
| A07 | XSS | 出力エスケープ、CSP設定 |

### JWTベストプラクティス

| 項目 | 推奨 | 危険 |
|-----|------|------|
| 有効期限 | Access: 15分、Refresh: 7日 | 無期限 |
| 保存場所 | HttpOnly Cookie | localStorage |
| アルゴリズム | RS256（非対称） | none、HS256 |
| ペイロード | 最小限（IDのみ） | 機密情報含む |

### コードレビューで見抜くべき問題

```typescript
// ❌ SQLインジェクション脆弱
const query = `SELECT * FROM users WHERE name = '${userInput}'`;

// ⭕ パラメータ化クエリ
const query = 'SELECT * FROM users WHERE name = $1';
await pool.query(query, [userInput]);

// ❌ JWTをlocalStorageに保存（XSS脆弱）
localStorage.setItem('token', token);

// ⭕ HttpOnly Cookieで送信
res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
});

// ❌ トークン検証なし（署名無視）
const decoded = jwt.decode(token);

// ⭕ 署名検証あり
const decoded = jwt.verify(token, process.env.JWT_SECRET);

// ❌ セキュリティヘッダーなし
app.listen(3000);

// ⭕ helmet使用
import helmet from 'helmet';
app.use(helmet());
```

### 出典
- [OWASP Top 10](https://owasp.org/Top10/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [JWT Best Practices](https://curity.io/resources/learn/jwt-best-practices/)

---

## Phase 5: テスト・品質（test1-test8）

### 学習目標
- テストピラミッドを説明できる
- Vitest + SupertestでAPIテストを書ける
- モック/スタブの使い分けができる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| test1 | テストピラミッド | ユニット/統合/E2E、比率 | E2E過多 |
| test2 | Vitest基礎 | describe/it/expect、セットアップ | Jest記法混在 |
| test3 | モックとスタブ | vi.fn()、vi.mock()、使い分け | 過剰モック |
| test4 | APIテスト | supertest、HTTPリクエスト | 外部依存 |
| test5 | DBテスト | テスト用DB、トランザクション | 本番DB使用 |
| test6 | エラーケース | 境界値、異常系、エッジケース | 正常系のみ |
| test7 | テストカバレッジ | c8、カバレッジ目標 | 数値目標のみ |
| test8 | CI/CD統合 | GitHub Actions、自動テスト | 手動実行のみ |

### テストピラミッド

```
       /\
      /E2E\        ← 少量（クリティカルパスのみ）
     /──────\
    / 統合   \     ← 中程度（API + DB）
   /──────────\
  /  ユニット   \   ← 多量（ビジネスロジック）
 /──────────────\
```

### Vitest vs Jest（2026年版）

| 項目 | Vitest | Jest |
|-----|--------|------|
| 速度 | 約1.5-2倍高速 | 標準 |
| ESM対応 | ネイティブ | 設定必要 |
| 設定 | ほぼゼロコンフィグ | 設定多め |
| 互換性 | Jest互換API | - |

### コードレビューで見抜くべき問題

```typescript
// ❌ 外部依存をモックしていない
test('should fetch user', async () => {
  const user = await fetchUser(1);  // 実際のAPIを叩いている
});

// ⭕ モック使用
vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'Test' })
}));

// ❌ 正常系のみテスト
test('should create user', async () => {
  const res = await request(app).post('/users').send({ name: 'Test' });
  expect(res.status).toBe(201);
});

// ⭕ エラーケースも網羅
test('should return 400 for invalid input', async () => {
  const res = await request(app).post('/users').send({});
  expect(res.status).toBe(400);
});

// ❌ 本番DBに接続
const db = new Pool({ connectionString: process.env.DATABASE_URL });

// ⭕ テスト用DB
const db = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
```

### 出典
- [Vitest Documentation](https://vitest.dev/)
- [Node.js Testing Best Practices](https://github.com/goldbergyoni/nodejs-testing-best-practices)
- [Supertest GitHub](https://github.com/ladjs/supertest)

---

## 総合レビューチェックリスト

### Node.js
- [ ] ESM（`import`/`export`）を使用しているか
- [ ] 非同期処理が適切か（async/await、Promise）
- [ ] 環境変数で機密情報を管理しているか
- [ ] 適切なフレームワークを選択しているか

### API設計
- [ ] RESTful原則に従っているか
- [ ] 適切なHTTPステータスコードを返しているか
- [ ] APIバージョニングがあるか
- [ ] エラーレスポンスが統一されているか

### データベース
- [ ] 正規化されているか（カンマ区切りなし）
- [ ] 外部キーにインデックスがあるか
- [ ] N+1問題がないか
- [ ] トランザクションが適切か

### セキュリティ
- [ ] SQLインジェクション対策（パラメータ化）
- [ ] XSS対策（出力エスケープ、CSP）
- [ ] JWTが適切に検証されているか
- [ ] 機密情報がコードにハードコードされていないか
- [ ] helmetなどセキュリティヘッダーがあるか

### テスト
- [ ] ユニットテストがあるか
- [ ] エラーケースをテストしているか
- [ ] 外部依存がモックされているか
- [ ] テスト用DBを使用しているか

---

## 参考資料

### 公式ドキュメント
- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vitest Documentation](https://vitest.dev/)

### ロードマップ
- [roadmap.sh/nodejs](https://roadmap.sh/nodejs)
- [roadmap.sh/backend](https://roadmap.sh/backend)
- [roadmap.sh/postgresql-dba](https://roadmap.sh/postgresql-dba)

### セキュリティ
- [OWASP Top 10](https://owasp.org/Top10/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)

### ベストプラクティス
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Node.js Testing Best Practices](https://github.com/goldbergyoni/nodejs-testing-best-practices)
