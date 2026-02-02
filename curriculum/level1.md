# Level 1: Web基礎 カリキュラム

> **目標**: HTML/CSSコードを見て、構造と意図を即座に理解できる

## 📚 ソース（ファクト根拠）
- [roadmap.sh/frontend](https://roadmap.sh/frontend) - GitHub 6位、最も参照されるロードマップ
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn_web_development) - Mozilla公式、Web標準の権威
- [MDN Curriculum](https://developer.mozilla.org/en-US/curriculum/) - 業界と教育者の知見を統合

---

## Phase 1: HTML基礎（コードを読む力）

### 学習順序（MDN準拠）

| # | レッスン | 読めるようになること | ソース |
|---|----------|---------------------|--------|
| 01 | HTMLとは | HTMLの役割を説明できる | MDN |
| 02 | タグ構造 | 開始/終了タグを識別できる | MDN |
| 03 | 文書構造 | html/head/body の役割がわかる | MDN |
| 04 | テキスト要素 | h1-h6, p, strong, em を読める | MDN |
| 05 | リンク・画像 | a, img と属性を理解できる | MDN |
| 06 | リスト | ul/ol/li の入れ子を追える | MDN |
| 07 | **セマンティックHTML** | header/nav/main/article/section/aside/footer を識別 | MDN, roadmap.sh |

### 重要ポイント（2026年の必須知識）

**セマンティックHTMLは「基準」** (出典: [DEV Community](https://dev.to/gerryleonugroho/semantic-html-in-2025-the-bedrock-of-accessible-seo-ready-and-future-proof-web-experiences-2k01))
- `<div>` だらけのコードは古い書き方
- `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>` を使うのが現代の標準
- 理由: アクセシビリティ、SEO、AIの読み取り精度向上

**完了時** → `textbook/level1/phase1-html.html` 作成

---

## Phase 2: CSS基礎（コードを読む力）

### 学習順序（MDN準拠）

| # | レッスン | 読めるようになること | ソース |
|---|----------|---------------------|--------|
| 08 | CSSとは | CSSの役割と適用方法がわかる | MDN |
| 09 | セレクタ | 要素/クラス/ID/子孫セレクタを読める | MDN |
| 10 | 色・背景 | color, background 系を理解 | MDN |
| 11 | テキスト装飾 | font-*, text-* を理解 | MDN |
| 12 | ボックスモデル | margin/padding/border の関係を理解 | MDN |
| 13 | **Flexbox** | display: flex のコードを読める | MDN, roadmap.sh |
| 14 | **Grid** | display: grid のコードを読める | MDN, roadmap.sh |

### 重要ポイント（2026年の必須知識）

**Flexbox と Grid は必須** (出典: [roadmap.sh](https://roadmap.sh/frontend), [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core))
- 現代のレイアウトの90%以上がこれ
- float や position での複雑なレイアウトは古い

**CSS変数（カスタムプロパティ）** (出典: [Frontend Masters](https://frontendmasters.com/blog/what-you-need-to-know-about-modern-css-2025-edition/))
```css
:root {
  --primary-color: #3498db;
}
.button {
  background: var(--primary-color);
}
```

**完了時** → `textbook/level1/phase2-css.html` 作成

---

## Phase 3: 実践（実コードを読む）

| # | レッスン | 習得すること |
|---|----------|-------------|
| 15 | DevTools | Chrome DevToolsで要素を検証できる |
| 16 | 実サイト読解 | 実際のWebサイトのHTML/CSSを読む |
| 17 | パターン認識 | よくあるUI（ヘッダー、カード、フォーム）のコードパターンを識別 |

### ベテランの読み方（目指すレベル）

(出典: [DEV Community - Full Stack Roadmap](https://dev.to/thebitforge/the-complete-full-stack-developer-roadmap-for-2026-2i0j))
> "Read other people's code and understand it quickly"

1. **全体構造を先に把握** - html > body > 主要セクションの構造
2. **セマンティックタグで役割を推測** - `<nav>` → ナビゲーションだな
3. **CSSクラス名から意図を読む** - `.card-title` → カードのタイトルだな
4. **パターンを認識** - 「あ、これFlexboxで横並びにしてる」

**完了時** → `textbook/level1/phase3-practice.html` 作成
→ **Level 1 完了 → Level 2: JavaScript へ**

---

## 2026年のCSS新機能（知っておくべき）

(出典: [2026 CSS Features](https://blog.riadkilani.com/2026-css-features-you-must-know/))

| 機能 | 説明 | 読めるレベル目標 |
|------|------|-----------------|
| `:has()` | 親要素を子要素で選択 | 見たら意味がわかる |
| Container Queries | コンテナサイズでスタイル変更 | 見たら意味がわかる |
| CSS Nesting | ネストしたセレクタ記法 | 見たら意味がわかる |
| CSS Variables | カスタムプロパティ | 実際に読める |

これらはPhase 2完了後の「発展」として扱う。

---

## 注意事項

**AIでコードを書かせない（この段階では）**
(出典: [Bite of Code](https://biteofcode.com/web-dev-roadmap-2026/))
> "Do not use AI to write your code at this stage. At all. It will generate code for you, but it will not make you a developer."

読む力をつける段階では、自分で理解することが最重要。
