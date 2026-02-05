# Level 9: チーム開発・プロジェクト管理 - カリキュラム＆教科書作成プラン

## 概要

| 項目 | 内容 |
|------|------|
| **テーマ** | シニアエンジニアに必須のチーム開発力・プロジェクト推進力・技術リーダーシップ |
| **関連資格** | IPAプロジェクトマネージャ試験、PMP、認定スクラムマスター(CSM) |
| **セクション数** | 各Phase 10セクション × 8 Phase = **80セクション** |

---

## Phase構成

### Phase 1: アジャイル開発

| 項目 | 内容 |
|------|------|
| **セクションID** | agile1-10 |
| **ファイル** | `textbook/level9/phase1.html` |

**内容詳細:**
- スクラム
- カンバン
- スプリント計画
- バックログ管理
- ベロシティ
- 見積もり手法（ストーリーポイント、プランニングポーカー）
- レトロスペクティブ
- アジャイルマニフェスト
- ウォーターフォールとの比較
- SAFe概要

---

### Phase 2: Git運用とコードレビュー

| 項目 | 内容 |
|------|------|
| **セクションID** | gitrev1-10 |
| **ファイル** | `textbook/level9/phase2.html` |

**内容詳細:**
- ブランチ戦略（Git Flow, GitHub Flow, Trunk-based）
- PR運用
- レビュー観点の体系化
- コードレビューのベストプラクティス
- マージ戦略（Squash, Rebase, Merge）
- コンフリクト解決
- CI連携
- レビュー文化
- 自動レビューツール
- モブプログラミング

---

### Phase 3: チームコミュニケーション

| 項目 | 内容 |
|------|------|
| **セクションID** | comm1-10 |
| **ファイル** | `textbook/level9/phase3.html` |

**内容詳細:**
- 1on1ミーティング
- フィードバック技法
- ADR（Architecture Decision Records）
- RFC
- 技術ドキュメンテーション
- 知識共有（tech talk, wiki）
- 非同期コミュニケーション
- リモートワーク
- 心理的安全性
- ステークホルダー管理

---

### Phase 4: プロジェクト管理

| 項目 | 内容 |
|------|------|
| **セクションID** | proj1-10 |
| **ファイル** | `textbook/level9/phase4.html` |

**内容詳細:**
- リスク管理
- 依存関係管理
- スコープ管理
- WBS
- ガントチャート
- クリティカルパス
- 見積もり精度向上
- バッファ管理
- ステータスレポート
- プロジェクト振り返り

---

### Phase 5: インシデント管理 / SRE

| 項目 | 内容 |
|------|------|
| **セクションID** | sre1-10 |
| **ファイル** | `textbook/level9/phase5.html` |

**内容詳細:**
- 障害対応フロー
- War Room
- Post-mortem（ブレームレス）
- SLI / SLO / SLA
- エラーバジェット
- On-call運用
- 障害レベル分類
- DR / BCP
- カオスエンジニアリング（Chaos Monkey）
- SRE文化

---

### Phase 6: オブザーバビリティ

| 項目 | 内容 |
|------|------|
| **セクションID** | obs1-10 |
| **ファイル** | `textbook/level9/phase6.html` |

**内容詳細:**
- ログ・メトリクス・トレースの3本柱
- 構造化ログ
- Prometheus / Grafana
- Datadog
- OpenTelemetry
- アラート設計
- ダッシュボード設計
- APM
- 分散トレーシング
- 可観測性文化

---

### Phase 7: メンタリング・技術リーダーシップ

| 項目 | 内容 |
|------|------|
| **セクションID** | lead1-10 |
| **ファイル** | `textbook/level9/phase7.html` |

**内容詳細:**
- テックリードの役割
- 技術的意思決定
- ペアプロ / モブプロ
- メンタリング技法
- 技術戦略策定
- Build vs Buy判断
- 技術的負債管理
- アーキテクチャ審査会
- エンジニア評価・育成
- 影響力の行使

---

### Phase 8: キャリア・組織文化

| 項目 | 内容 |
|------|------|
| **セクションID** | career1-10 |
| **ファイル** | `textbook/level9/phase8.html` |

**内容詳細:**
- エンジニアキャリアパス（IC / Manager）
- エンジニアリング文化醸成
- 学習組織
- バーンアウト防止
- ダイバーシティ＆インクルージョン
- 採用・面接
- 技術コミュニティ参加
- OSS貢献
- 個人ブランディング
- これからのエンジニア像

---

## 作業手順

### Step 1: カリキュラム作成

`curriculum/level9.md` を新規作成

- roadmap.sh、公式ドキュメントを参照
- 各Phaseの詳細トピックと「見抜くべきこと」を明記

### Step 2: 教科書HTML作成

各Phaseファイルを作成: `textbook/level9/phase1.html` 〜 `phase8.html`

- 既存の教科書スタイル・構成を踏襲
- LD / ディスレクシア対応
- 1セクションにつき最低1問のクイズ
- セキュリティ関連・よくある間違いは2-3問

### Step 3: ナビゲーション更新

`textbook/index.html` を更新

- Level 9 アコーディオン＋リンク追加
- ダッシュボードのprogressカード更新

### Step 4: JavaScript更新

`textbook/js/main.js` を更新

- `sectionToFile` マッピング追加
- `updateProgress()` にセクションID追加

### Step 5: 進捗更新

- `progress/current.md` を更新
- `curriculum/overview.md` を更新

---

## 作業順序と依存関係

```
Step 1: curriculum/level9.md 作成
   |
   v
Step 2: textbook/level9/phase1-8.html 作成（並列可能）
   |
   v
Step 3: index.html, main.js 更新（並列可能）
   |
   v
Step 4: progress/current.md, overview.md 更新
   |
   v
Step 5: ブラウザで動作確認
   |
   v
Step 6: Git commit & push
```

---

## 品質チェックリスト

- [ ] 各セクションに最低1問のクイズがある
- [ ] セキュリティ関連は2-3問
- [ ] セクションIDが一意
- [ ] `sectionToFile` マッピングが正しい
- [ ] ダッシュボードのmax値が正しい
- [ ] ナビゲーションリンクが正しい
- [ ] 全セクションの完了ボタンが機能する
- [ ] LD / ディスレクシア対応（フォント、行間、色）

---

## ソース

- [roadmap.sh Engineering Manager](https://roadmap.sh/engineering-manager)
- [roadmap.sh Levels of Seniority](https://roadmap.sh/guides/levels-of-seniority)
- [IPA プロジェクトマネージャ試験](https://www.ipa.go.jp/shiken/kubun/pm.html)
- [Scrum Guide](https://scrumguides.org/)
- [Google SRE Books](https://sre.google/books/)
- [OpenTelemetry](https://opentelemetry.io/)
