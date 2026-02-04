# Level 7: 実践設計とAI活用（シニア→アーキテクト）

> **目標**: データモデリングからクラウド設計、要件定義、AI活用までを理解し、アーキテクトとして技術選定・設計判断ができる

## 概要

| 項目 | 内容 |
|------|------|
| 期間目安 | 12-16週間 |
| 前提知識 | Level 6（設計原則とパターン）完了 |
| 関連資格 | データベーススペシャリスト、システムアーキテクト、AWS認定ソリューションアーキテクト、GCP Professional Cloud Architect |
| 主要トピック | データモデリング、DB設計、クラウドアーキテクチャ、要件定義、非機能要件、AI/ML活用 |

---

## Phase 1: データモデリング基礎（data1-data10）

### 学習目標
- ER図を正しく読み書きできる
- 正規化の目的と各正規形を説明できる
- ビジネス要件からデータモデルを設計できる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| data1 | データモデリングとは | なぜモデリングが必要か、概念・論理・物理モデル | - |
| data2 | ER図の基礎 | エンティティ、属性、リレーション、カーディナリティ | 曖昧な関係定義 |
| data3 | ER図の記法 | IE記法、IDEF1X、UML、Mermaid記法 | - |
| data4 | 第1正規形（1NF） | 繰り返しグループの排除、原子値 | 配列カラム |
| data5 | 第2正規形（2NF） | 部分関数従属の排除 | 複合主キーの部分依存 |
| data6 | 第3正規形（3NF） | 推移的関数従属の排除 | 計算可能なカラム |
| data7 | BCNF・第4正規形 | 多値従属、より高次の正規形 | 過剰な正規化 |
| data8 | 非正規化とトレードオフ | パフォーマンスのための意図的な非正規化 | 無計画な非正規化 |
| data9 | ドメインモデルからデータモデルへ | DDDエンティティとDBテーブルのマッピング | ORM依存設計 |
| data10 | データモデリング実践 | 要件分析からER図作成、レビュー | - |

### 正規化の段階

| 正規形 | 条件 | 排除するもの |
|--------|------|-------------|
| **1NF** | 全属性が原子値 | 繰り返しグループ |
| **2NF** | 1NF + 部分関数従属なし | 複合キーの一部への依存 |
| **3NF** | 2NF + 推移的関数従属なし | 非キー属性間の依存 |
| **BCNF** | 全ての決定項が候補キー | 非キー属性からキーへの依存 |

### コードレビューで見抜くべき問題

```sql
-- ❌ 1NF違反：配列をカンマ区切りで格納
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  phone_numbers VARCHAR(500)  -- '090-1234-5678,080-9876-5432'
);

-- ⭕ 正規化：別テーブルに分離
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE user_phones (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id),
  phone_number VARCHAR(20)
);

-- ❌ 2NF違反：複合キーの一部への依存
CREATE TABLE order_items (
  order_id INT,
  product_id INT,
  product_name VARCHAR(100),  -- product_id のみに依存（部分関数従属）
  quantity INT,
  PRIMARY KEY (order_id, product_id)
);

-- ⭕ 正規化：商品情報を分離
CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE order_items (
  order_id INT,
  product_id INT REFERENCES products(id),
  quantity INT,
  PRIMARY KEY (order_id, product_id)
);

-- ❌ 3NF違反：推移的関数従属
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  department_id INT,
  department_name VARCHAR(100),  -- department_id → department_name（推移的）
  department_location VARCHAR(100)  -- これも推移的
);

-- ⭕ 正規化：部署テーブルを分離
CREATE TABLE departments (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  location VARCHAR(100)
);

CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  department_id INT REFERENCES departments(id)
);
```

### 実務での活用場面
- 新規システムのDB設計
- 既存システムのデータ構造分析
- データ移行計画の策定
- パフォーマンス問題の原因調査

### 出典
- [データベーススペシャリスト試験 シラバス](https://www.ipa.go.jp/shiken/kubun/db.html)
- [Wikipedia - Database normalization](https://en.wikipedia.org/wiki/Database_normalization)
- [roadmap.sh - SQL](https://roadmap.sh/sql)

---

## Phase 2: DB設計応用（dba1-dba10）

### 学習目標
- インデックス設計の戦略を説明できる
- パーティショニングの使い分けができる
- NoSQLとRDBMSの適切な選択ができる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| dba1 | インデックス基礎 | B-Tree、ハッシュ、インデックスの仕組み | インデックスなしの検索 |
| dba2 | インデックス戦略 | 複合インデックス、カバリングインデックス | 過剰なインデックス |
| dba3 | クエリ最適化 | EXPLAIN、実行計画、スロークエリ分析 | N+1クエリ |
| dba4 | トランザクション設計 | ACID、分離レベル、デッドロック | 長時間トランザクション |
| dba5 | パーティショニング | 水平/垂直分割、シャーディング | - |
| dba6 | レプリケーション | マスター/スレーブ、マルチマスター | レプリカ遅延 |
| dba7 | NoSQL概論 | ドキュメント、KVS、グラフ、列指向 | RDBMSで十分なケース |
| dba8 | NoSQL設計パターン | 非正規化、埋め込み vs 参照 | RDBMSの設計をそのまま適用 |
| dba9 | ポリグロット永続化 | 用途に応じたDB選択 | 単一DB依存 |
| dba10 | DB設計レビュー | スキーマレビュー、移行計画 | - |

### インデックス戦略

| インデックスタイプ | 用途 | 注意点 |
|------------------|------|--------|
| **B-Tree** | 範囲検索、ORDER BY | デフォルト、汎用的 |
| **Hash** | 等価検索のみ | 範囲検索不可 |
| **GIN/GiST** | 全文検索、配列、JSON | PostgreSQL固有 |
| **複合インデックス** | 複数カラムの条件 | カラム順序が重要 |
| **カバリングインデックス** | インデックスのみで完結 | サイズ増大 |

### コードレビューで見抜くべき問題

```sql
-- ❌ インデックスが効かないクエリ
-- 関数適用でインデックス無効化
SELECT * FROM users WHERE YEAR(created_at) = 2024;

-- ⭕ インデックスが効くクエリ
SELECT * FROM users
WHERE created_at >= '2024-01-01'
  AND created_at < '2025-01-01';

-- ❌ 複合インデックスの順序を無視
CREATE INDEX idx_users ON users(last_name, first_name);
-- このインデックスは first_name 単体の検索には効かない
SELECT * FROM users WHERE first_name = 'John';

-- ⭕ クエリパターンに合わせたインデックス設計
-- first_name での検索が多い場合
CREATE INDEX idx_users_first ON users(first_name);
CREATE INDEX idx_users_full ON users(last_name, first_name);

-- ❌ N+1クエリ問題
-- ORM使用時によく発生
for order in orders:
    customer = order.customer  # 毎回クエリ発行
    print(customer.name)

-- ⭕ Eager Loading で解決
orders = Order.query.options(joinedload(Order.customer)).all()
for order in orders:
    print(order.customer.name)  # 既にロード済み
```

### NoSQL vs RDBMS選択基準

| 要件 | RDBMS | NoSQL |
|------|-------|-------|
| 複雑な結合が必要 | ✓ | - |
| ACID保証が必須 | ✓ | △（一部対応） |
| スキーマが頻繁に変更 | - | ✓ |
| 大量の書き込み | △ | ✓ |
| 水平スケーリング | △ | ✓ |
| 非構造化データ | - | ✓ |

### 実務での活用場面
- パフォーマンスチューニング
- スケーリング戦略の策定
- データベース技術選定
- レガシーDB移行計画

### 出典
- [Use The Index, Luke](https://use-the-index-luke.com/)
- [PostgreSQL Documentation - Indexes](https://www.postgresql.org/docs/current/indexes.html)
- [MongoDB - Data Modeling](https://www.mongodb.com/docs/manual/data-modeling/)

---

## Phase 3: クラウド基礎（cloud1-cloud10）

### 学習目標
- クラウドの主要サービスカテゴリを理解している
- IaaS/PaaS/SaaSの違いを説明できる
- 基本的なクラウドアーキテクチャを設計できる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| cloud1 | クラウドコンピューティング概論 | オンプレとの違い、メリット/デメリット | - |
| cloud2 | IaaS/PaaS/SaaS | サービスモデルの違い、責任共有モデル | 責任範囲の誤解 |
| cloud3 | コンピューティング | EC2、Lambda、ECS/EKS、Fargate | インスタンスサイズ過剰 |
| cloud4 | ストレージ | S3、EBS、EFS、Glacier | ストレージクラスの選択ミス |
| cloud5 | データベース | RDS、DynamoDB、Aurora、ElastiCache | マネージドサービス不使用 |
| cloud6 | ネットワーキング | VPC、サブネット、セキュリティグループ | パブリックサブネット過多 |
| cloud7 | IAM設計 | ポリシー、ロール、最小権限原則 | 過剰権限 |
| cloud8 | 監視とログ | CloudWatch、X-Ray、CloudTrail | 監視なし |
| cloud9 | コスト管理 | Cost Explorer、Reserved Instance、Spot | コスト意識の欠如 |
| cloud10 | Well-Architected Framework | 5つの柱、ベストプラクティス | - |

### AWS Well-Architected Framework 5つの柱

| 柱 | 概要 | 主な観点 |
|----|------|---------|
| **運用上の優秀性** | 運用のコード化、継続的改善 | IaC、監視、インシデント対応 |
| **セキュリティ** | データとシステムの保護 | IAM、暗号化、ネットワーク分離 |
| **信頼性** | 障害からの復旧、需要への対応 | 冗長化、自動復旧、バックアップ |
| **パフォーマンス効率** | リソースの効率的な使用 | 適切なサービス選択、スケーリング |
| **コスト最適化** | 不要なコストの排除 | 使用量に応じた課金、予約 |

### コードレビューで見抜くべき問題

```yaml
# ❌ セキュリティグループが全開放
SecurityGroup:
  Type: AWS::EC2::SecurityGroup
  Properties:
    GroupDescription: Allow all traffic
    SecurityGroupIngress:
      - IpProtocol: -1
        CidrIp: 0.0.0.0/0  # 全世界からの全ポートアクセス許可

# ⭕ 必要最小限のアクセス許可
SecurityGroup:
  Type: AWS::EC2::SecurityGroup
  Properties:
    GroupDescription: Allow HTTP/HTTPS only
    SecurityGroupIngress:
      - IpProtocol: tcp
        FromPort: 443
        ToPort: 443
        CidrIp: 0.0.0.0/0
      - IpProtocol: tcp
        FromPort: 80
        ToPort: 80
        CidrIp: 0.0.0.0/0

# ❌ IAMポリシーが過剰権限
{
  "Effect": "Allow",
  "Action": "*",
  "Resource": "*"
}

# ⭕ 最小権限原則に従う
{
  "Effect": "Allow",
  "Action": [
    "s3:GetObject",
    "s3:PutObject"
  ],
  "Resource": "arn:aws:s3:::my-bucket/*"
}
```

### 実務での活用場面
- 新規システムのインフラ設計
- オンプレミスからクラウドへの移行
- コスト最適化プロジェクト
- セキュリティ監査対応

### 出典
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [roadmap.sh - AWS](https://roadmap.sh/aws)
- [AWS認定ソリューションアーキテクト アソシエイト 公式ガイド](https://aws.amazon.com/certification/certified-solutions-architect-associate/)

---

## Phase 4: クラウド応用（cloud-a1 〜 cloud-a10）

### 学習目標
- マルチリージョン/マルチAZ設計ができる
- サーバーレスアーキテクチャの設計ができる
- インフラのコード化（IaC）を実践できる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| cloud-a1 | 高可用性設計 | マルチAZ、フェイルオーバー、ヘルスチェック | 単一障害点 |
| cloud-a2 | ディザスタリカバリ | RPO/RTO、バックアップ戦略、DR構成 | DR計画なし |
| cloud-a3 | サーバーレス基礎 | Lambda、API Gateway、Step Functions | コールドスタート |
| cloud-a4 | サーバーレス応用 | イベント駆動、非同期処理、エッジコンピューティング | 同期処理の乱用 |
| cloud-a5 | コンテナオーケストレーション | ECS、EKS、Fargate、サービスメッシュ | 過剰なコンテナ分割 |
| cloud-a6 | IaC基礎 | Terraform、CloudFormation、CDK | 手動変更 |
| cloud-a7 | IaC応用 | モジュール化、状態管理、ドリフト検出 | 状態ファイル共有 |
| cloud-a8 | マルチクラウド | AWS + GCP + Azure、ポータビリティ | ベンダーロックイン |
| cloud-a9 | FinOps | コスト可視化、最適化、予算管理 | コスト無視の設計 |
| cloud-a10 | クラウドアーキテクチャレビュー | 設計レビュー、アセスメント | - |

### ディザスタリカバリ戦略

| 戦略 | RPO | RTO | コスト | 説明 |
|------|-----|-----|--------|------|
| **バックアップ&リストア** | 数時間 | 数時間〜日 | 低 | 定期バックアップから復元 |
| **パイロットライト** | 数分 | 数十分 | 中 | 最小構成を常時起動 |
| **ウォームスタンバイ** | 数分 | 数分 | 高 | 縮小版を常時稼働 |
| **マルチサイトアクティブ** | ほぼ0 | ほぼ0 | 最高 | 複数リージョンでアクティブ |

### コードレビューで見抜くべき問題

```hcl
# ❌ Terraform: 状態ファイルをローカル管理
terraform {
  # バックエンド設定なし = ローカル保存
}

# ⭕ 状態ファイルをリモート管理
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "ap-northeast-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

# ❌ ハードコードされた値
resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t3.large"

  tags = {
    Environment = "production"
  }
}

# ⭕ 変数化とモジュール化
variable "environment" {
  type = string
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

module "web_server" {
  source = "./modules/ec2"

  environment   = var.environment
  instance_type = var.environment == "production" ? "t3.large" : var.instance_type
}
```

### サーバーレス設計のベストプラクティス

| 観点 | 推奨 | 避けるべき |
|------|------|-----------|
| 関数の粒度 | 単一責務 | モノリシックLambda |
| コールドスタート | プロビジョニング済み同時実行 | 重い初期化処理 |
| タイムアウト | 適切な値設定 | デフォルト値のまま |
| 状態管理 | 外部化（DynamoDB等） | 関数内で状態保持 |

### 実務での活用場面
- 可用性要件の高いシステム設計
- サーバーレスアーキテクチャへの移行
- インフラ自動化の導入
- クラウドコスト削減プロジェクト

### 出典
- [AWS Disaster Recovery](https://aws.amazon.com/disaster-recovery/)
- [Terraform Best Practices](https://www.terraform-best-practices.com/)
- [AWS Serverless Application Lens](https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/welcome.html)

---

## Phase 5: 要件定義（req1-req10）

### 学習目標
- ステークホルダーから要件を引き出す技法を使える
- 機能要件を適切に文書化できる
- 要件の優先順位付けができる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| req1 | 要件定義とは | なぜ重要か、失敗の原因 | - |
| req2 | ステークホルダー分析 | 関係者の特定、利害関係の把握 | 重要ステークホルダーの漏れ |
| req3 | 要件の引き出し技法 | インタビュー、ワークショップ、観察 | 思い込みによる要件定義 |
| req4 | ユーザーストーリー | As a...I want...So that...形式 | 曖昧なストーリー |
| req5 | ユースケース | アクター、シナリオ、代替フロー | 例外フローの漏れ |
| req6 | 機能要件の文書化 | 要件仕様書、受け入れ基準 | テスト不可能な要件 |
| req7 | 要件の優先順位付け | MoSCoW法、価値/コスト分析 | 全て優先度「高」 |
| req8 | 要件のトレーサビリティ | 追跡可能性、変更管理 | 要件と実装の乖離 |
| req9 | アジャイルでの要件管理 | バックログリファインメント、スプリント計画 | スコープクリープ |
| req10 | 要件定義レビュー | レビュー技法、合意形成 | - |

### MoSCoW法による優先順位付け

| 分類 | 意味 | 割合目安 |
|------|------|---------|
| **Must have** | 必須、これがないとリリースできない | 60% |
| **Should have** | 重要、できれば実装したい | 20% |
| **Could have** | あると良い、時間があれば | 15% |
| **Won't have** | 今回は実装しない | 5% |

### ユーザーストーリーの書き方

```
良いユーザーストーリーの例:
----------------------------------------
As a 顧客
I want to 商品をカートに追加できる
So that 後でまとめて購入できる

受け入れ基準:
- 商品詳細ページから「カートに追加」ボタンで追加できる
- 同じ商品を複数回追加すると数量が増える
- カートには最大99個まで追加できる
- 在庫数を超える数量は追加できない

❌ 悪いユーザーストーリーの例:
----------------------------------------
As a ユーザー
I want to システムを使いやすくしてほしい
So that 便利だから

問題点:
- 「ユーザー」が曖昧（誰？）
- 「使いやすく」が主観的で測定不能
- 受け入れ基準が定義できない
```

### 要件の品質特性（SMART）

| 特性 | 意味 | 悪い例 | 良い例 |
|------|------|-------|-------|
| **Specific** | 具体的 | 高速に動作 | 3秒以内にレスポンス |
| **Measurable** | 測定可能 | 使いやすい | 3クリック以内で完了 |
| **Achievable** | 達成可能 | 100%稼働 | 99.9%稼働率 |
| **Relevant** | 関連性がある | 最新技術を使用 | ユーザー登録機能 |
| **Time-bound** | 期限がある | いつか実装 | 第2四半期末までに |

### 実務での活用場面
- 新規プロジェクトの立ち上げ
- 既存システムの改修計画
- 受託開発の見積もり
- プロダクトバックログの整備

### 出典
- [IPA - 要件定義ガイド](https://www.ipa.go.jp/archive/digital/iot-en-ci/jyouryuu/guideline.html)
- [システムアーキテクト試験 シラバス](https://www.ipa.go.jp/shiken/kubun/sa.html)
- [User Stories Applied - Mike Cohn](https://www.mountaingoatsoftware.com/books/user-stories-applied)

---

## Phase 6: 非機能要件（nfr1-nfr10）

### 学習目標
- 主要な非機能要件カテゴリを説明できる
- 具体的な数値目標を設定できる
- 非機能要件のテスト方法を理解している

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| nfr1 | 非機能要件とは | 機能要件との違い、重要性 | 非機能要件の軽視 |
| nfr2 | 可用性 | SLA、稼働率、MTBF/MTTR | 可用性目標なし |
| nfr3 | 性能・パフォーマンス | レスポンスタイム、スループット | 性能目標が曖昧 |
| nfr4 | スケーラビリティ | 垂直/水平スケーリング、弾力性 | スケール計画なし |
| nfr5 | セキュリティ | 機密性、完全性、可用性（CIA） | セキュリティ要件漏れ |
| nfr6 | 保守性 | 変更容易性、テスト容易性 | 技術的負債の蓄積 |
| nfr7 | 移植性 | プラットフォーム独立性 | ベンダーロックイン |
| nfr8 | 運用性 | 監視、ログ、デプロイ | 運用設計の欠如 |
| nfr9 | 非機能要件のテスト | 負荷テスト、セキュリティテスト | テスト計画なし |
| nfr10 | 非機能要件レビュー | アセスメント、トレードオフ分析 | - |

### 可用性と稼働率

| 稼働率 | 年間ダウンタイム | 用途例 |
|--------|-----------------|--------|
| 99% | 87.6時間 | 社内システム |
| 99.9% | 8.76時間 | 一般的なWebサービス |
| 99.95% | 4.38時間 | ECサイト |
| 99.99% | 52.6分 | 金融システム |
| 99.999% | 5.26分 | 基幹インフラ |

### 非機能要件の定義例

```yaml
# 非機能要件定義書の例

可用性:
  目標稼働率: 99.9%
  計画停止: 月1回、深夜2時間以内
  MTTR: 30分以内

性能:
  レスポンスタイム:
    - 検索: 95%タイルで3秒以内
    - 一覧表示: 95%タイルで2秒以内
    - 詳細表示: 95%タイルで1秒以内
  スループット:
    - 通常時: 100リクエスト/秒
    - ピーク時: 500リクエスト/秒

スケーラビリティ:
  ユーザー数: 初年度10万人、3年後50万人
  データ量: 年間30%増加を想定

セキュリティ:
  認証: 多要素認証必須
  通信: TLS 1.3以上
  データ暗号化: AES-256
  監査ログ: 1年間保持

保守性:
  デプロイ頻度: 週1回以上
  テストカバレッジ: 80%以上
  技術的負債: スプリント20%を改善に充当
```

### 非機能要件のトレードオフ

| 要件A | 要件B | トレードオフ |
|-------|-------|-------------|
| 高可用性 | コスト | 冗長化でコスト増 |
| 高性能 | 一貫性 | キャッシュで一貫性低下 |
| セキュリティ | 利便性 | 認証強化で手間増 |
| 柔軟性 | 性能 | 抽象化でオーバーヘッド |

### 実務での活用場面
- SLA策定
- インフラ設計の根拠
- 負荷テスト計画
- セキュリティ監査対応

### 出典
- [IPA - 非機能要求グレード](https://www.ipa.go.jp/digital/architecture/nonfunctional-requirements.html)
- [ISO 25010 - Software Quality Model](https://www.iso.org/standard/35733.html)
- [Site Reliability Engineering - Google](https://sre.google/sre-book/table-of-contents/)

---

## Phase 7: AI基礎（ai1-ai10）

### 学習目標
- 機械学習の基本概念を説明できる
- AI/MLプロジェクトの進め方を理解している
- LLMの特性と限界を説明できる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| ai1 | AI/ML概論 | AI、ML、DLの違い、歴史 | - |
| ai2 | 機械学習の種類 | 教師あり、教師なし、強化学習 | 問題に合わない手法選択 |
| ai3 | ML開発ライフサイクル | データ収集、前処理、学習、評価、デプロイ | データ品質の軽視 |
| ai4 | データエンジニアリング | 特徴量エンジニアリング、データパイプライン | データリーケージ |
| ai5 | モデル評価 | 精度、再現率、F1、AUC、過学習 | 評価指標の不適切な選択 |
| ai6 | MLOps基礎 | モデル管理、実験追跡、CI/CD for ML | 再現性の欠如 |
| ai7 | LLM概論 | Transformer、GPT、ファインチューニング | - |
| ai8 | プロンプトエンジニアリング | 効果的なプロンプト設計、Few-shot | プロンプトインジェクション |
| ai9 | RAG基礎 | 検索拡張生成、ベクトルDB、Embedding | ハルシネーション |
| ai10 | AI倫理と制約 | バイアス、説明可能性、規制 | 倫理的考慮の欠如 |

### 機械学習の種類

| 種類 | 説明 | 用途例 |
|------|------|--------|
| **教師あり学習** | 正解ラベル付きデータで学習 | 分類、回帰、予測 |
| **教師なし学習** | ラベルなしデータで構造発見 | クラスタリング、異常検出 |
| **強化学習** | 報酬を最大化する行動を学習 | ゲームAI、ロボット制御 |

### LLMの特性と限界

| 特性 | 内容 | 対策 |
|------|------|------|
| **ハルシネーション** | 事実でない情報を生成 | RAG、ファクトチェック |
| **知識カットオフ** | 学習時点以降の情報なし | RAG、Web検索連携 |
| **プロンプト依存** | 入力の書き方で結果が変わる | プロンプトエンジニアリング |
| **コンテキスト長制限** | 入力できるトークン数に上限 | チャンキング、要約 |

### プロンプト設計のベストプラクティス

```markdown
# ❌ 悪いプロンプト
コードをレビューして

# ⭕ 良いプロンプト
以下のTypeScriptコードをセキュリティの観点でレビューしてください。

観点:
1. SQLインジェクションの可能性
2. XSSの脆弱性
3. 認証/認可の問題

出力形式:
- 問題点: [説明]
- 該当箇所: [コードの行番号]
- 修正案: [改善コード]

コード:
```typescript
// レビュー対象のコード
```
```

### 実務での活用場面
- AIを活用した機能の企画・設計
- MLプロジェクトのマネジメント
- LLMを組み込んだシステム開発
- AI製品の評価・選定

### 出典
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
- [MLOps.org](https://ml-ops.org/)
- [OpenAI - GPT Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)

---

## Phase 8: AI応用（ai-a1 〜 ai-a10）

### 学習目標
- LLMを活用したアプリケーション設計ができる
- AIエージェントの設計パターンを理解している
- AI活用の費用対効果を評価できる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| ai-a1 | LLMアプリケーション設計 | アーキテクチャパターン、API設計 | LLMの過剰な使用 |
| ai-a2 | RAG応用 | ハイブリッド検索、リランキング、評価 | 検索品質の軽視 |
| ai-a3 | ファインチューニング | いつ使うか、データ準備、評価 | 不要なファインチューニング |
| ai-a4 | AIエージェント基礎 | 自律エージェント、ツール使用、ReAct | 無制限の実行 |
| ai-a5 | AIエージェント設計 | マルチエージェント、オーケストレーション | エラーハンドリング不足 |
| ai-a6 | AI安全性 | ガードレール、コンテンツフィルター | 安全対策なし |
| ai-a7 | AIコスト最適化 | トークン削減、キャッシュ、モデル選択 | コスト意識の欠如 |
| ai-a8 | AI評価と改善 | A/Bテスト、ユーザーフィードバック、継続的改善 | 評価なしの本番投入 |
| ai-a9 | AIガバナンス | ポリシー、監査、コンプライアンス | ガバナンス未整備 |
| ai-a10 | AI活用の将来 | トレンド、技術選定、戦略 | - |

### LLMアプリケーションアーキテクチャ

```
┌─────────────────────────────────────────────────┐
│                   User Interface                │
└─────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────┐
│              Application Layer                  │
│  ┌─────────────┐  ┌─────────────┐              │
│  │   Router    │  │  Guardrail  │              │
│  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────┐
│              Orchestration Layer                │
│  ┌─────────────┐  ┌─────────────┐              │
│  │   Agent     │  │   Chain     │              │
│  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────┘
                        │
┌─────────────────────────────────────────────────┐
│              Foundation Layer                   │
│  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐   │
│  │  LLM  │  │ Vector│  │ Tools │  │Memory │   │
│  │  API  │  │  DB   │  │       │  │       │   │
│  └───────┘  └───────┘  └───────┘  └───────┘   │
└─────────────────────────────────────────────────┘
```

### AIエージェント設計パターン

| パターン | 説明 | 用途 |
|---------|------|------|
| **ReAct** | Reasoning + Acting、思考と行動の交互 | ツール使用タスク |
| **Plan-and-Execute** | 計画を立ててから実行 | 複雑なタスク |
| **Multi-Agent** | 複数エージェントの協調 | 専門領域の分担 |
| **Hierarchical** | 階層的な指示と実行 | 大規模タスク |

### AI安全性のガードレール

```typescript
// ❌ ガードレールなしの実装
async function chat(userInput: string): Promise<string> {
  const response = await llm.generate(userInput);
  return response;
}

// ⭕ ガードレール付きの実装
async function chat(userInput: string): Promise<string> {
  // 入力フィルタリング
  const sanitizedInput = await inputGuardrail.filter(userInput);
  if (sanitizedInput.blocked) {
    return "申し訳ありませんが、そのご質問にはお答えできません。";
  }

  // レート制限
  await rateLimiter.check(userId);

  // LLM呼び出し
  const response = await llm.generate(sanitizedInput.text, {
    maxTokens: 1000,  // トークン制限
    temperature: 0.7,  // ランダム性制限
  });

  // 出力フィルタリング
  const filteredOutput = await outputGuardrail.filter(response);
  if (filteredOutput.blocked) {
    return "回答を生成できませんでした。別の質問をお試しください。";
  }

  // 監査ログ
  await auditLog.record({
    userId,
    input: userInput,
    output: filteredOutput.text,
    timestamp: new Date(),
  });

  return filteredOutput.text;
}
```

### AIコスト最適化戦略

| 戦略 | 効果 | 実装方法 |
|------|------|---------|
| **プロンプトキャッシュ** | 50-90%削減 | 同一プロンプトの再利用 |
| **モデル選択** | 70-95%削減 | 用途に応じた小型モデル |
| **トークン削減** | 20-50%削減 | 簡潔なプロンプト設計 |
| **バッチ処理** | 30-50%削減 | リアルタイム不要な処理 |

### 実務での活用場面
- AIを活用した新規サービス開発
- 社内業務のAI自動化
- AIチャットボットの構築
- AI製品の技術評価・導入判断

### 出典
- [LangChain Documentation](https://python.langchain.com/docs/get_started/introduction)
- [OpenAI - Production Best Practices](https://platform.openai.com/docs/guides/production-best-practices)
- [Anthropic - Claude Documentation](https://docs.anthropic.com/)
- [Building LLM Applications for Production](https://huyenchip.com/2023/04/11/llm-engineering.html)

---

## 総合レビューチェックリスト

### データモデリング
- [ ] ER図が正しく描けているか
- [ ] 正規化が適切に行われているか（過不足なく）
- [ ] 非正規化が意図的で文書化されているか
- [ ] カーディナリティが正しく定義されているか

### DB設計
- [ ] インデックス戦略が適切か
- [ ] クエリの実行計画を確認しているか
- [ ] N+1問題が発生していないか
- [ ] トランザクション分離レベルが適切か
- [ ] NoSQL/RDBMSの選択理由が明確か

### クラウド設計
- [ ] Well-Architected Frameworkに準拠しているか
- [ ] 単一障害点がないか
- [ ] DR計画があるか
- [ ] IAMが最小権限原則に従っているか
- [ ] コスト最適化されているか
- [ ] IaCで管理されているか

### 要件定義
- [ ] ステークホルダーが網羅されているか
- [ ] 要件が測定可能か（SMART）
- [ ] 優先順位が明確か
- [ ] 受け入れ基準が定義されているか
- [ ] トレーサビリティが確保されているか

### 非機能要件
- [ ] SLA目標が数値で定義されているか
- [ ] 性能要件がテスト可能か
- [ ] セキュリティ要件が網羅されているか
- [ ] 運用設計が考慮されているか
- [ ] トレードオフが文書化されているか

### AI活用
- [ ] AI利用の妥当性が検討されているか
- [ ] ハルシネーション対策があるか
- [ ] ガードレールが実装されているか
- [ ] コスト見積もりがされているか
- [ ] 評価指標が定義されているか
- [ ] 倫理的考慮がされているか

---

## 参考資料

### 書籍
- [データベース設計入門](https://gihyo.jp/book/series/DB)
- [達人に学ぶDB設計](https://www.shoeisha.co.jp/book/detail/9784798124704)
- [AWS認定ソリューションアーキテクト教科書](https://www.shoeisha.co.jp/book/series/AWS)
- [要件定義のセオリーと実践](https://gihyo.jp/book/2023/978-4-297-13459-8)

### オンラインリソース
- [roadmap.sh - Software Architect](https://roadmap.sh/software-architect)
- [roadmap.sh - AI/Data Scientist](https://roadmap.sh/ai-data-scientist)
- [AWS Architecture Center](https://aws.amazon.com/architecture/)
- [GCP Architecture Framework](https://cloud.google.com/architecture/framework)

### 資格試験
- [データベーススペシャリスト試験](https://www.ipa.go.jp/shiken/kubun/db.html)
- [システムアーキテクト試験](https://www.ipa.go.jp/shiken/kubun/sa.html)
- [AWS認定ソリューションアーキテクト](https://aws.amazon.com/certification/)
- [GCP Professional Cloud Architect](https://cloud.google.com/certification/cloud-architect)

### コミュニティ
- [DB設計 - Qiita](https://qiita.com/tags/db%E8%A8%AD%E8%A8%88)
- [AWS Japan User Group](https://jaws-ug.jp/)
- [AI/ML Japan Community](https://www.meetup.com/ja-JP/Machine-Learning-Tokyo/)
