# 現在の進捗状況
> 目標: 実務シニア＆フルスタック

## 現在地
- **Level**: 8 カリキュラム作成完了
- **状態**: 教科書作成待ち

## 教科書の確認方法
```powershell
cd textbook && python -m http.server 8080
# → http://localhost:8080/index.html
```

## 完了した作業（累計）

| Level | テーマ | セクション数 | 状態 |
|-------|--------|-------------|------|
| 0 | AI時代のエンジニア | 1 | ✅ 完了 |
| 1 | HTML/CSS | 18 | ✅ 完了 |
| 2 | JavaScript | 30 | ✅ 完了 |
| 3 | React/TypeScript | 24 | ✅ 完了 |
| 4 | Node.js/API/DB | 44 | ✅ 完了 |
| 5 | インフラ/DevOps | 56 | ✅ 完了 |
| 6 | 設計原則とパターン | 78 | ✅ 完了 |
| 7 | 実践設計とAI活用 | 80 | ✅ 完了 |
| 8 | テスト戦略・品質保証 | 80（予定） | 📋 カリキュラム完了 |
| **合計** | - | **411セクション（予定）** | - |

## 今回完了した作業（2026-02-04）

### Level 8 カリキュラム作成

**テーマ**: テスト戦略・品質保証

| Phase | テーマ | セクションID |
|-------|--------|-------------|
| Phase 1 | テスト基礎・マインドセット | test1-test10 |
| Phase 2 | 単体テスト | unit1-unit10 |
| Phase 3 | 結合テスト・APIテスト | int1-int10 |
| Phase 4 | E2Eテスト | e2e1-e2e10 |
| Phase 5 | テスト設計技法 | tech1-tech10 |
| Phase 6 | TDD/BDD | tdd1-tdd10 |
| Phase 7 | CI/CDとテスト自動化 | ci1-ci10 |
| Phase 8 | 品質保証・品質管理 | qa1-qa10 |

**作成ファイル**:
- `curriculum/level8.md` - カリキュラム

**関連資格**:
- JSTQB認定テスト技術者
- ISTQB Foundation Level

## 次回セッションでやること

### 1. Level 8 教科書作成
8つのPhaseの教科書HTMLを作成：
- `textbook/level8/phase1.html` 〜 `textbook/level8/phase8.html`
- `textbook/index.html` のナビ・ダッシュボード更新
- `textbook/js/main.js` のsectionMapping更新

### 2. 教科書に含める要素
- SVG図解: 各Phase 3個程度
- クイズ: 各セクション最低1問
- 実務でよくあるAIの間違い例
- 完了ボタン: 全セクション

## 参照ファイル
| ファイル | 内容 |
|----------|------|
| `curriculum/overview.md` | 全体ロードマップ |
| `curriculum/level8.md` | Level 8 カリキュラム |
| `textbook/index.html` | 教科書メイン |
| `CLAUDE.md` | プロジェクトルール |
