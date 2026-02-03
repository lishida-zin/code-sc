# Level 5: インフラ / クラウド / DevOps

> **目標**: インフラ設定のセキュリティ問題、可用性リスク、運用コストの問題を検出できる

## 概要

| 項目 | 内容 |
|------|------|
| 期間目安 | 6-8週間 |
| 前提知識 | Level 4（Node.js/API/DB）完了 |
| 関連資格 | AWS認定（SAA/DVA）、GCP認定、CKA/CKAD |
| 主要技術 | Docker, Kubernetes, AWS, Terraform, GitHub Actions |

---

## Phase 1: Docker基礎（docker1-docker10）

### 学習目標
- Dockerfileのベストプラクティスを説明できる
- マルチステージビルドでイメージを軽量化できる
- コンテナセキュリティの基本を理解している

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| docker1 | コンテナとは | VM vs コンテナ、隔離レベル、用途 | - |
| docker2 | Dockerの仕組み | イメージ、レイヤー、レジストリ | - |
| docker3 | Dockerfile基礎 | FROM/RUN/COPY/CMD/ENTRYPOINT | 非効率な順序 |
| docker4 | イメージ最適化 | レイヤーキャッシュ、.dockerignore | キャッシュ無効化 |
| docker5 | マルチステージビルド | ビルド環境と実行環境の分離 | 単一ステージ肥大化 |
| docker6 | Docker Compose V2 | `docker compose`、サービス定義、ネットワーク | 旧V1記法 |
| docker7 | ボリュームとネットワーク | 永続化、サービス間通信 | データ消失リスク |
| docker8 | セキュリティ基礎 | 非rootユーザー、読み取り専用FS | root実行 |
| docker9 | 脆弱性スキャン | Trivy、Docker Scout、CI統合 | スキャンなし |
| docker10 | 本番運用 | ヘルスチェック、リソース制限、ログ | 制限なし |

### ベースイメージ選択ガイド（2026年版）

| イメージ | サイズ | 用途 |
|---------|-------|------|
| `node:22-alpine` | ~50MB | 軽量Node.js |
| `node:22-slim` | ~200MB | バランス |
| `gcr.io/distroless/nodejs22` | ~30MB | 最小・本番推奨 |
| `node:22` | ~1GB | 開発・フル機能 |

### コードレビューで見抜くべき問題

```dockerfile
# ❌ 非効率なDockerfile（キャッシュ無効化）
FROM node:22
COPY . .
RUN npm install

# ⭕ キャッシュを活かす順序
FROM node:22-alpine
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# ❌ 単一ステージで肥大化
FROM node:22
RUN npm install && npm run build
CMD ["node", "dist/index.js"]

# ⭕ マルチステージビルド
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs22
COPY --from=builder /app/dist /app
CMD ["/app/index.js"]

# ❌ rootユーザーで実行
FROM node:22-alpine
CMD ["node", "index.js"]

# ⭕ 非rootユーザー
FROM node:22-alpine
RUN addgroup -S app && adduser -S app -G app
USER app
CMD ["node", "index.js"]
```

### 出典
- [Docker Best Practices](https://docs.docker.com/build/building/best-practices/)
- [Docker Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [Google Distroless](https://github.com/GoogleContainerTools/distroless)

---

## Phase 2: Kubernetes基礎（k8s1-k8s10）

### 学習目標
- Kubernetesの基本オブジェクトを説明できる
- Pod/Deployment/Serviceの関係を理解している
- ConfigMap/Secretの使い分けができる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| k8s1 | Kubernetesとは | コンテナオーケストレーション、なぜ必要か | - |
| k8s2 | アーキテクチャ | Control Plane/Worker Node、etcd | - |
| k8s3 | Pod | 最小単位、ライフサイクル、マルチコンテナ | 直接Pod作成 |
| k8s4 | Deployment | レプリカ管理、ローリングアップデート | replicas: 1 |
| k8s5 | Service | ClusterIP/NodePort/LoadBalancer、DNS | 直接Pod IP参照 |
| k8s6 | Ingress | HTTPルーティング、TLS終端 | Service直接公開 |
| k8s7 | ConfigMap/Secret | 設定外部化、機密情報管理 | ハードコード |
| k8s8 | ストレージ | PV/PVC、StorageClass | ephemeralストレージ |
| k8s9 | RBAC | Role/RoleBinding、最小権限 | cluster-admin多用 |
| k8s10 | ヘルスチェック | liveness/readiness/startup Probe | Probe未設定 |

### Kubernetes vs Docker Compose

| 観点 | Docker Compose | Kubernetes |
|------|---------------|------------|
| 用途 | 開発環境、小規模 | 本番環境、大規模 |
| スケーリング | 手動 | 自動（HPA） |
| 高可用性 | なし | 自己修復機能 |
| 学習曲線 | 低い | 高い |

### コードレビューで見抜くべき問題

```yaml
# ❌ 直接Podを作成（再起動しない）
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: app
    image: my-app:latest

# ⭕ Deploymentで管理（自己修復）
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: my-app:1.0.0

# ❌ latestタグ（追跡不可）
image: my-app:latest

# ⭕ 明示的バージョン
image: my-app:1.0.0

# ❌ ハードコードされた設定
env:
- name: DATABASE_URL
  value: "postgres://user:pass@db:5432/app"

# ⭕ Secretから取得
env:
- name: DATABASE_URL
  valueFrom:
    secretKeyRef:
      name: db-secret
      key: url

# ❌ ヘルスチェックなし
containers:
- name: app
  image: my-app:1.0.0

# ⭕ ヘルスチェック設定
containers:
- name: app
  image: my-app:1.0.0
  livenessProbe:
    httpGet:
      path: /health
      port: 8080
    initialDelaySeconds: 10
  readinessProbe:
    httpGet:
      path: /ready
      port: 8080

# ❌ リソース制限なし（ノード枯渇リスク）
containers:
- name: app
  image: my-app:1.0.0

# ⭕ リソース制限
containers:
- name: app
  image: my-app:1.0.0
  resources:
    requests:
      memory: "256Mi"
      cpu: "250m"
    limits:
      memory: "512Mi"
      cpu: "500m"
```

### 出典
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [roadmap.sh/kubernetes](https://roadmap.sh/kubernetes)
- [Kubernetes Kickstart 2026](https://medium.com/devops-ai-decoded/kubernetes-kickstart-2026-the-ultimate-beginner-to-expert-roadmap-66710ad63434)

---

## Phase 3: クラウド入門 AWS（aws1-aws10）

### 学習目標
- AWSの主要サービスの用途を説明できる
- IAMの最小権限原則を理解している
- サーバーレス vs コンテナの使い分けができる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| aws1 | AWSの全体像 | リージョン/AZ、主要サービス分類 | - |
| aws2 | IAM基礎 | ユーザー/グループ/ロール/ポリシー | root使用 |
| aws3 | IAMベストプラクティス | 最小権限、MFA、アクセスキー管理 | 過剰な権限 |
| aws4 | EC2基礎 | インスタンスタイプ、AMI、セキュリティグループ | 全ポート開放 |
| aws5 | VPC基礎 | サブネット、ルートテーブル、NAT | パブリックDB |
| aws6 | S3 | バケット、アクセス制御、暗号化 | パブリックバケット |
| aws7 | RDS/Aurora | マネージドDB、Multi-AZ、リードレプリカ | Single-AZ |
| aws8 | Lambda | サーバーレス、イベント駆動、制限事項 | 15分超過処理 |
| aws9 | ECS/Fargate | コンテナオーケストレーション、タスク定義 | EC2 vs Fargate |
| aws10 | コスト管理 | 料金モデル、Cost Explorer、予算アラート | 野放し |

### サーバーレス vs コンテナ（2026年版）

| 観点 | サーバーレス（Lambda） | コンテナ（ECS/Fargate） |
|------|---------------------|---------------------|
| スケーリング | 自動（ゼロから） | 事前設定必要 |
| コールドスタート | あり（数百ms〜） | なし |
| 最大実行時間 | 15分 | 制限なし |
| コスト（低負荷） | 安い（使った分だけ） | 固定費あり |
| コスト（高負荷） | 高くなりがち | 予測しやすい |
| ベンダーロックイン | 高い | 低い（ポータブル） |

### コードレビューで見抜くべき問題

```json
// ❌ 過剰な権限（AdministratorAccess）
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "*",
    "Resource": "*"
  }]
}

// ⭕ 最小権限
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "s3:GetObject",
      "s3:PutObject"
    ],
    "Resource": "arn:aws:s3:::my-bucket/*"
  }]
}
```

```hcl
# ❌ セキュリティグループ全開放
resource "aws_security_group" "bad" {
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]  # 全世界からアクセス可能
  }
}

# ⭕ 必要なポートのみ
resource "aws_security_group" "good" {
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]  # 社内ネットワークのみ
  }
}

# ❌ S3バケットをパブリックに
resource "aws_s3_bucket_public_access_block" "bad" {
  bucket                  = aws_s3_bucket.main.id
  block_public_acls       = false
  block_public_policy     = false
}

# ⭕ パブリックアクセスをブロック
resource "aws_s3_bucket_public_access_block" "good" {
  bucket                  = aws_s3_bucket.main.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
```

### 出典
- [AWS Documentation](https://docs.aws.amazon.com/)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/)
- [roadmap.sh/aws](https://roadmap.sh/aws)

---

## Phase 4: IaC Terraform（tf1-tf10）

### 学習目標
- Infrastructure as Codeの利点を説明できる
- Terraform状態管理のベストプラクティスを理解している
- モジュール化で再利用可能なコードを書ける

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| tf1 | IaCとは | 手動管理の問題、コード化の利点 | - |
| tf2 | Terraform基礎 | provider、resource、data | - |
| tf3 | HCL構文 | 変数、locals、出力、条件式 | ハードコード |
| tf4 | 状態管理 | tfstate、リモートバックエンド | ローカル状態 |
| tf5 | 状態ロック | DynamoDB、同時実行防止 | ロックなし |
| tf6 | モジュール | 再利用可能なコード、Registry | コピペ |
| tf7 | ワークスペース | 環境分離（dev/stg/prod） | 環境混在 |
| tf8 | シークレット管理 | 環境変数、Vault、sensitive | 平文保存 |
| tf9 | 静的解析 | tfsec、checkov、tflint | 分析なし |
| tf10 | CI/CD統合 | plan/apply自動化、承認フロー | 手動apply |

### Terraform状態管理（2026年推奨構成）

```hcl
# backend.tf - リモート状態管理
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "ap-northeast-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"  # 状態ロック
  }
}
```

### コードレビューで見抜くべき問題

```hcl
# ❌ ハードコードされた値
resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t3.micro"
  subnet_id     = "subnet-abc123"
}

# ⭕ 変数化
variable "environment" {
  type = string
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = var.instance_type
  subnet_id     = var.subnet_id

  tags = {
    Environment = var.environment
  }
}

# ❌ シークレットが平文
resource "aws_db_instance" "db" {
  password = "my-secret-password"
}

# ⭕ 環境変数から取得
variable "db_password" {
  type      = string
  sensitive = true  # ログに出力されない
}

resource "aws_db_instance" "db" {
  password = var.db_password
}

# ❌ ローカル状態ファイル（チーム開発不可）
# terraform.tfstate がローカルに存在

# ⭕ リモートバックエンド + ロック
terraform {
  backend "s3" {
    bucket         = "terraform-state"
    key            = "state.tfstate"
    region         = "ap-northeast-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

# ❌ コピペされたリソース
resource "aws_security_group" "web_dev" { ... }
resource "aws_security_group" "web_stg" { ... }
resource "aws_security_group" "web_prod" { ... }

# ⭕ モジュール化
module "security_group" {
  source      = "./modules/security-group"
  environment = var.environment
  port        = 443
}
```

### 出典
- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
- [Terraform Best Practices](https://spacelift.io/blog/terraform-best-practices)
- [AWS Prescriptive Guidance - Terraform](https://docs.aws.amazon.com/prescriptive-guidance/latest/terraform-aws-provider-best-practices/)

---

## Phase 5: CI/CD GitHub Actions（cicd1-cicd8）

### 学習目標
- GitHub Actionsのワークフロー構文を理解している
- セキュアなCI/CDパイプラインを構築できる
- 再利用可能なワークフローを設計できる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| cicd1 | CI/CDとは | 継続的インテグレーション/デリバリー | - |
| cicd2 | GitHub Actions基礎 | workflow、job、step、トリガー | - |
| cicd3 | ワークフロー構文 | matrix、環境変数、シークレット | ハードコード |
| cicd4 | 再利用可能ワークフロー | composite action、workflow_call | コピペ |
| cicd5 | アクションのセキュリティ | バージョン固定、最小権限 | @main参照 |
| cicd6 | OIDC認証 | シークレットレスAWS認証 | 長期キー |
| cicd7 | キャッシュ戦略 | npm/pnpmキャッシュ、ビルドキャッシュ | キャッシュなし |
| cicd8 | 環境とデプロイ | environment、protection rules | 承認なし |

### GitHub Actions セキュリティ（2026年版）

| 対策 | 危険 | 安全 |
|------|------|------|
| アクションバージョン | `@main`、`@v1` | `@v1.2.3`（具体的バージョン） |
| 権限 | `permissions: write-all` | 必要な権限のみ |
| AWS認証 | アクセスキー | OIDC（シークレットレス） |
| シークレット | コード内記述 | GitHub Secrets |

### コードレビューで見抜くべき問題

```yaml
# ❌ 不安定なアクションバージョン
- uses: actions/checkout@main

# ⭕ 具体的バージョン固定
- uses: actions/checkout@v4.1.0

# ❌ 過剰な権限
permissions: write-all

# ⭕ 最小権限
permissions:
  contents: read
  packages: write

# ❌ 長期アクセスキー
- name: Configure AWS
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

# ⭕ OIDC認証（シークレットレス）
permissions:
  id-token: write
  contents: read

- name: Configure AWS
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789:role/deploy
    aws-region: ap-northeast-1

# ❌ キャッシュなし（毎回npm install）
- run: npm ci

# ⭕ キャッシュ活用
- uses: actions/setup-node@v4
  with:
    node-version: '22'
    cache: 'pnpm'

- run: pnpm install --frozen-lockfile

# ❌ 本番デプロイに承認なし
deploy:
  runs-on: ubuntu-latest
  steps:
    - run: ./deploy.sh

# ⭕ 環境保護ルール
deploy:
  runs-on: ubuntu-latest
  environment:
    name: production
    url: https://example.com
  steps:
    - run: ./deploy.sh
```

### 出典
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Security Best Practices](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [GitHub Blog - Actions Security](https://github.blog/2021-04-22-github-actions-update-helping-maintain-security/)

---

## Phase 6: 可観測性 Observability（obs1-obs8）

### 学習目標
- ログ/メトリクス/トレースの違いを説明できる
- OpenTelemetryの基本を理解している
- アラート設計のベストプラクティスを知っている

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| obs1 | 可観測性とは | ログ/メトリクス/トレース、監視との違い | - |
| obs2 | 構造化ログ | JSON形式、ログレベル、相関ID | console.log |
| obs3 | メトリクス | カウンター/ゲージ/ヒストグラム、Prometheus | カスタムメトリクスなし |
| obs4 | 分散トレーシング | スパン、トレースID、伝搬 | トレースなし |
| obs5 | OpenTelemetry | 計装、SDK、Collector | ベンダーロックイン |
| obs6 | Grafana/Prometheus | ダッシュボード、PromQL | 可視化なし |
| obs7 | アラート設計 | SLI/SLO/SLA、アラート疲れ対策 | 過剰アラート |
| obs8 | インシデント対応 | ランブック、ポストモーテム | 手順なし |

### 可観測性の3本柱

| 種類 | 用途 | ツール例 |
|------|------|---------|
| **ログ** | 何が起きたか | Loki、CloudWatch Logs |
| **メトリクス** | どれくらい | Prometheus、CloudWatch |
| **トレース** | どこで | Jaeger、X-Ray |

### OpenTelemetry（2026年デファクト標準）

```typescript
// ⭕ OpenTelemetry自動計装
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'http://otel-collector:4318/v1/traces',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```

### コードレビューで見抜くべき問題

```typescript
// ❌ 非構造化ログ
console.log('User ' + userId + ' logged in');

// ⭕ 構造化ログ（JSON）
import pino from 'pino';
const logger = pino();

logger.info({ userId, action: 'login' }, 'User logged in');

// ❌ トレースIDなし（問題追跡困難）
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ⭕ 相関IDを含む
app.use((req, res, next) => {
  const traceId = req.headers['x-trace-id'] || crypto.randomUUID();
  req.traceId = traceId;
  res.setHeader('x-trace-id', traceId);

  logger.info({ traceId, method: req.method, url: req.url }, 'Request');
  next();
});

// ❌ エラーログが不十分
catch (error) {
  console.error('Error occurred');
}

// ⭕ コンテキスト付きエラーログ
catch (error) {
  logger.error({
    err: error,
    traceId: req.traceId,
    userId: req.user?.id,
    operation: 'createOrder'
  }, 'Failed to create order');
}
```

### 出典
- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Grafana Labs - Observability Trends 2026](https://grafana.com/blog/2026-observability-trends-predictions-from-grafana-labs-unified-intelligent-and-open/)
- [Google SRE Book - Monitoring](https://sre.google/sre-book/monitoring-distributed-systems/)

---

## 総合レビューチェックリスト

### Docker
- [ ] マルチステージビルドを使用しているか
- [ ] 軽量ベースイメージ（alpine/distroless）か
- [ ] 非rootユーザーで実行しているか
- [ ] 脆弱性スキャンがCI/CDに組み込まれているか
- [ ] .dockerignoreでビルドコンテキストを最小化しているか

### Kubernetes
- [ ] Deploymentで管理しているか（直接Pod作成していないか）
- [ ] 明示的なイメージタグを使用しているか（latestでない）
- [ ] ConfigMap/Secretで設定を外部化しているか
- [ ] liveness/readinessProbeを設定しているか
- [ ] リソース制限（requests/limits）を設定しているか

### AWS
- [ ] IAMは最小権限原則に従っているか
- [ ] セキュリティグループは必要最小限のポートのみか
- [ ] S3バケットはパブリックアクセスをブロックしているか
- [ ] RDSはMulti-AZを有効にしているか（本番環境）
- [ ] 暗号化（at rest/in transit）を有効にしているか

### Terraform
- [ ] リモートバックエンド + 状態ロックを使用しているか
- [ ] 変数化されているか（ハードコードしていないか）
- [ ] シークレットはsensitiveマークされているか
- [ ] モジュール化で再利用性を確保しているか
- [ ] tfsec/checkovで静的解析しているか

### CI/CD
- [ ] アクションバージョンを固定しているか
- [ ] 最小権限のpermissionsを設定しているか
- [ ] OIDC認証を使用しているか（長期キーでない）
- [ ] 本番デプロイに承認フローがあるか
- [ ] キャッシュを活用しているか

### 可観測性
- [ ] 構造化ログを出力しているか
- [ ] トレースID/相関IDを含めているか
- [ ] カスタムメトリクスを定義しているか
- [ ] ダッシュボードで可視化しているか
- [ ] アラートが適切に設定されているか

---

## 参考資料

### 公式ドキュメント
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)

### ロードマップ
- [roadmap.sh/devops](https://roadmap.sh/devops)
- [roadmap.sh/kubernetes](https://roadmap.sh/kubernetes)
- [roadmap.sh/aws](https://roadmap.sh/aws)
- [roadmap.sh/docker](https://roadmap.sh/docker)

### ベストプラクティス
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/)
- [Google SRE Books](https://sre.google/books/)
- [Terraform Best Practices](https://spacelift.io/blog/terraform-best-practices)

### セキュリティ
- [OWASP Container Security](https://owasp.org/www-project-container-security/)
- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks)
- [Trivy](https://github.com/aquasecurity/trivy)
