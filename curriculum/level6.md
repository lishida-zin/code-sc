# Level 6: 設計原則とパターン

> **目標**: 設計の良し悪しを判断し、アーキテクチャの問題点を指摘・改善提案できる

## 概要

| 項目 | 内容 |
|------|------|
| 期間目安 | 8-10週間 |
| 前提知識 | Level 5（インフラ/DevOps）完了 |
| 関連資格 | 応用情報技術者、システムアーキテクト |
| 主要トピック | OOP、SOLID、GoFパターン、クリーンアーキテクチャ、DDD |

---

## Phase 1: オブジェクト指向の本質（oop1-oop8）

### 学習目標
- OOPの4つの柱（カプセル化・抽象化・継承・ポリモーフィズム）を説明できる
- 継承よりコンポジションを優先すべき理由を理解している
- オブジェクト指向設計の落とし穴を見抜ける

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| oop1 | OOPとは何か | パラダイムの歴史、なぜOOPが生まれたか | - |
| oop2 | カプセル化 | 情報隠蔽、public/private、getter/setter | 全フィールドpublic |
| oop3 | 抽象化 | 本質の抽出、インターフェース、抽象クラス | 実装詳細の露出 |
| oop4 | 継承 | is-a関係、オーバーライド、super | 深い継承階層 |
| oop5 | ポリモーフィズム | 多態性、ダックタイピング、ジェネリクス | switch文での型判定 |
| oop6 | 継承 vs コンポジション | has-a関係、委譲、継承の問題点 | 継承の乱用 |
| oop7 | 凝集度と結合度 | 高凝集・疎結合、モジュール設計 | 神クラス |
| oop8 | OOPの限界と代替 | 関数型との融合、データ指向設計 | OOP原理主義 |

### OOPの4つの柱

| 原則 | 意味 | 実現方法 |
|------|------|---------|
| **カプセル化** | データと振る舞いを一つにまとめ、内部を隠す | private + メソッド |
| **抽象化** | 複雑な詳細を隠し、本質的な機能のみを公開 | インターフェース |
| **継承** | 既存クラスの特性を引き継ぐ | extends/implements |
| **ポリモーフィズム** | 同じインターフェースで異なる振る舞い | オーバーライド |

### コードレビューで見抜くべき問題

```typescript
// ❌ カプセル化違反：全フィールドがpublic
class User {
  public id: string;
  public email: string;
  public password: string;  // パスワードが外部から見える！
}

// ⭕ 適切なカプセル化
class User {
  private readonly id: string;
  private email: string;
  private passwordHash: string;

  constructor(id: string, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.passwordHash = this.hashPassword(password);
  }

  changeEmail(newEmail: string): void {
    // バリデーションを含む
    if (!this.isValidEmail(newEmail)) {
      throw new Error('Invalid email');
    }
    this.email = newEmail;
  }

  private hashPassword(password: string): string {
    // ハッシュ化ロジック
  }
}

// ❌ 深い継承階層（Fragile Base Class問題）
class Animal {}
class Mammal extends Animal {}
class Carnivore extends Mammal {}
class Feline extends Carnivore {}
class DomesticCat extends Feline {}  // 5階層！変更が波及する

// ⭕ コンポジションで柔軟に
interface Behavior {
  act(): void;
}

class HuntingBehavior implements Behavior {
  act(): void { /* 狩りの振る舞い */ }
}

class Cat {
  constructor(private behavior: Behavior) {}

  performBehavior(): void {
    this.behavior.act();
  }
}

// ❌ ポリモーフィズムの不使用（switch文で型判定）
function calculateArea(shape: Shape): number {
  switch (shape.type) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    default:
      throw new Error('Unknown shape');
  }
}

// ⭕ ポリモーフィズムの活用
interface Shape {
  calculateArea(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  calculateArea(): number {
    return this.width * this.height;
  }
}

// ❌ 神クラス（低凝集）
class UserManager {
  createUser() {}
  deleteUser() {}
  sendEmail() {}        // メール送信は別の責務
  generateReport() {}   // レポート生成も別の責務
  validateInput() {}    // バリデーションも別
  connectDatabase() {}  // DB接続も別
}

// ⭕ 高凝集なクラス設計
class UserRepository {
  create(user: User): void {}
  delete(id: string): void {}
}

class EmailService {
  send(to: string, subject: string, body: string): void {}
}

class UserReportGenerator {
  generate(users: User[]): Report {}
}
```

### 出典
- [MDN - Object-oriented programming](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object-oriented_programming)
- [Wikipedia - Object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming)
- [Effective Java 3rd Edition - Item 18: Favor composition over inheritance](https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/)

---

## Phase 2: SOLID原則（solid1-solid10）

### 学習目標
- 5つのSOLID原則を具体例で説明できる
- SOLID違反のコードを発見し、改善提案できる
- 関数型プログラミングでのSOLIDの解釈を理解している

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| solid1 | SOLID概要 | なぜ原則が必要か、歴史的背景 | - |
| solid2 | 単一責任の原則（SRP） | 1つの理由でのみ変更される | 複数の責務 |
| solid3 | SRP実践 | クラス分割、責務の見極め方 | 責務の混在 |
| solid4 | 開放閉鎖の原則（OCP） | 拡張に開き、修正に閉じる | 既存コード修正 |
| solid5 | OCP実践 | Strategy、Template Method | if文の追加 |
| solid6 | リスコフの置換原則（LSP） | 派生型は基底型と置換可能 | 契約違反 |
| solid7 | インターフェース分離（ISP） | クライアントに必要なものだけ | 肥大インターフェース |
| solid8 | 依存性逆転の原則（DIP） | 抽象に依存、具象に依存しない | 具象クラス直接参照 |
| solid9 | DIP実践 | DI、IoC、コンストラクタ注入 | newの直接呼び出し |
| solid10 | SOLIDと関数型 | 純粋関数、イミュータビリティ | - |

### SOLID原則一覧

| 原則 | 英語 | 意味 | 違反の兆候 |
|------|------|------|-----------|
| **S** | Single Responsibility | 1クラス1責務 | クラスが500行超 |
| **O** | Open/Closed | 拡張に開き修正に閉じる | 新機能追加時に既存コード修正 |
| **L** | Liskov Substitution | 派生型は基底型と置換可能 | オーバーライドで例外 |
| **I** | Interface Segregation | インターフェースを小さく | 不要なメソッドの実装 |
| **D** | Dependency Inversion | 抽象に依存 | import具象クラス |

### コードレビューで見抜くべき問題

```typescript
// ========================================
// 単一責任の原則（SRP）
// ========================================

// ❌ 複数の責務が混在
class UserService {
  async createUser(data: UserData): Promise<User> {
    // バリデーション（責務1）
    if (!data.email.includes('@')) throw new Error('Invalid email');

    // 永続化（責務2）
    const user = await db.users.create(data);

    // メール送信（責務3）
    await sendEmail(user.email, 'Welcome!');

    // ログ出力（責務4）
    console.log(`User created: ${user.id}`);

    return user;
  }
}

// ⭕ 責務を分離
class UserValidator {
  validate(data: UserData): ValidationResult { /* ... */ }
}

class UserRepository {
  async create(data: UserData): Promise<User> { /* ... */ }
}

class WelcomeEmailSender {
  async send(user: User): Promise<void> { /* ... */ }
}

class UserService {
  constructor(
    private validator: UserValidator,
    private repository: UserRepository,
    private emailSender: WelcomeEmailSender,
    private logger: Logger
  ) {}

  async createUser(data: UserData): Promise<User> {
    this.validator.validate(data);
    const user = await this.repository.create(data);
    await this.emailSender.send(user);
    this.logger.info(`User created: ${user.id}`);
    return user;
  }
}

// ========================================
// 開放閉鎖の原則（OCP）
// ========================================

// ❌ 新しい支払い方法を追加するたびに修正が必要
class PaymentProcessor {
  process(payment: Payment): void {
    if (payment.type === 'credit') {
      // クレジットカード処理
    } else if (payment.type === 'paypal') {
      // PayPal処理
    } else if (payment.type === 'crypto') {
      // 暗号通貨処理 ← 追加のたびにここを修正
    }
  }
}

// ⭕ 拡張に開いている設計
interface PaymentStrategy {
  process(amount: number): Promise<PaymentResult>;
}

class CreditCardPayment implements PaymentStrategy {
  async process(amount: number): Promise<PaymentResult> { /* ... */ }
}

class PayPalPayment implements PaymentStrategy {
  async process(amount: number): Promise<PaymentResult> { /* ... */ }
}

// 新しい支払い方法は新クラスを追加するだけ
class CryptoPayment implements PaymentStrategy {
  async process(amount: number): Promise<PaymentResult> { /* ... */ }
}

class PaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}

  async process(amount: number): Promise<PaymentResult> {
    return this.strategy.process(amount);
  }
}

// ========================================
// リスコフの置換原則（LSP）
// ========================================

// ❌ LSP違反：派生クラスが基底クラスの契約を破る
class Rectangle {
  constructor(protected width: number, protected height: number) {}

  setWidth(width: number): void { this.width = width; }
  setHeight(height: number): void { this.height = height; }
  getArea(): number { return this.width * this.height; }
}

class Square extends Rectangle {
  setWidth(width: number): void {
    this.width = width;
    this.height = width;  // 予期しない副作用！
  }
  setHeight(height: number): void {
    this.width = height;
    this.height = height;  // 予期しない副作用！
  }
}

// クライアントコードが壊れる
function testRectangle(rect: Rectangle): void {
  rect.setWidth(5);
  rect.setHeight(4);
  console.assert(rect.getArea() === 20);  // Squareでは16になり失敗
}

// ⭕ 継承関係を見直す
interface Shape {
  getArea(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  getArea(): number { return this.width * this.height; }
}

class Square implements Shape {
  constructor(private side: number) {}
  getArea(): number { return this.side * this.side; }
}

// ========================================
// インターフェース分離の原則（ISP）
// ========================================

// ❌ 肥大なインターフェース
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
  code(): void;
  manage(): void;
}

// ロボットはeat/sleepできないのに実装を強制される
class Robot implements Worker {
  work(): void { /* OK */ }
  eat(): void { throw new Error('Robots cannot eat'); }  // 無意味
  sleep(): void { throw new Error('Robots cannot sleep'); }  // 無意味
  code(): void { /* OK */ }
  manage(): void { throw new Error('Not applicable'); }
}

// ⭕ インターフェースを分離
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}

interface Codeable {
  code(): void;
}

class Human implements Workable, Eatable, Sleepable, Codeable {
  work(): void { /* ... */ }
  eat(): void { /* ... */ }
  sleep(): void { /* ... */ }
  code(): void { /* ... */ }
}

class Robot implements Workable, Codeable {
  work(): void { /* ... */ }
  code(): void { /* ... */ }
}

// ========================================
// 依存性逆転の原則（DIP）
// ========================================

// ❌ 具象クラスに直接依存
class OrderService {
  private emailSender = new GmailSender();  // 具象クラスをnew
  private repository = new MySQLOrderRepository();  // 具象クラスをnew

  async createOrder(data: OrderData): Promise<Order> {
    const order = await this.repository.save(data);
    await this.emailSender.send(order.userEmail, 'Order confirmed');
    return order;
  }
}

// テストでGmailやMySQLをモックできない！

// ⭕ 抽象に依存（依存性注入）
interface EmailSender {
  send(to: string, message: string): Promise<void>;
}

interface OrderRepository {
  save(data: OrderData): Promise<Order>;
}

class OrderService {
  constructor(
    private emailSender: EmailSender,      // インターフェースに依存
    private repository: OrderRepository    // インターフェースに依存
  ) {}

  async createOrder(data: OrderData): Promise<Order> {
    const order = await this.repository.save(data);
    await this.emailSender.send(order.userEmail, 'Order confirmed');
    return order;
  }
}

// テスト時はモックを注入できる
const mockEmailSender: EmailSender = { send: jest.fn() };
const mockRepository: OrderRepository = { save: jest.fn() };
const service = new OrderService(mockEmailSender, mockRepository);
```

### SOLID原則と関数型プログラミング

| SOLID原則 | 関数型での解釈 |
|-----------|--------------|
| SRP | 1関数1責務、純粋関数 |
| OCP | 高階関数、関数合成 |
| LSP | 型の置換性、ジェネリクス |
| ISP | 小さな関数シグネチャ |
| DIP | 関数を引数で受け取る（コールバック） |

### 出典
- [Stack Overflow - Why SOLID principles are still the foundation](https://stackoverflow.blog/2021/11/01/why-solid-principles-are-still-the-foundation-for-modern-software-architecture/)
- [DEV Community - SOLID in Functional Programming](https://dev.to/rosselli00/solid-principles-in-functional-programming-fp-with-examples-4bj4)
- [Wikipedia - SOLID](https://en.wikipedia.org/wiki/SOLID)
- [Robert C. Martin - Clean Architecture](https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/)

---

## Phase 3: デザインパターン - 生成・構造（pattern1-pattern10）

### 学習目標
- GoFの生成パターン5つを説明できる
- GoFの構造パターン7つを説明できる
- パターンの過剰適用を見抜ける

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| pattern1 | デザインパターン概要 | GoF、パターンの目的、カタログ | パターン乱用 |
| pattern2 | Singleton | 唯一のインスタンス、グローバル状態 | 隠れた依存性 |
| pattern3 | Factory Method | オブジェクト生成のカプセル化 | switch文での生成 |
| pattern4 | Abstract Factory | 関連オブジェクト群の生成 | 複雑すぎる階層 |
| pattern5 | Builder | 複雑なオブジェクトの段階的構築 | 長いコンストラクタ |
| pattern6 | Prototype | オブジェクトのクローン | 深いコピー漏れ |
| pattern7 | Adapter | インターフェースの変換 | - |
| pattern8 | Decorator | 動的な機能追加 | 継承での機能追加 |
| pattern9 | Facade | 複雑なサブシステムの単純化 | 薄すぎるFacade |
| pattern10 | Composite | 部分-全体の階層構造 | - |

### 生成パターン（Creational Patterns）

| パターン | 目的 | 使用場面 |
|---------|------|---------|
| **Singleton** | インスタンスを1つに制限 | 設定、ログ、DB接続プール |
| **Factory Method** | 生成をサブクラスに委譲 | フレームワーク、プラグイン |
| **Abstract Factory** | 関連オブジェクト群の生成 | UIテーマ、DBドライバ |
| **Builder** | 複雑な構築プロセス | オプション多数のオブジェクト |
| **Prototype** | 既存オブジェクトの複製 | コストの高い初期化 |

### 構造パターン（Structural Patterns）

| パターン | 目的 | 使用場面 |
|---------|------|---------|
| **Adapter** | 互換性のないインターフェースを変換 | レガシー統合 |
| **Bridge** | 抽象と実装を分離 | プラットフォーム非依存 |
| **Composite** | ツリー構造で部分と全体を同一視 | ファイルシステム、メニュー |
| **Decorator** | 動的に責務を追加 | ストリーム、ミドルウェア |
| **Facade** | 複雑なサブシステムを単純化 | ライブラリAPI |
| **Flyweight** | 共有による効率化 | 文字、アイコン |
| **Proxy** | 代理でアクセス制御 | キャッシュ、遅延読み込み |

### コードレビューで見抜くべき問題

```typescript
// ========================================
// Singleton：隠れた依存性に注意
// ========================================

// ❌ グローバルなSingletonは依存関係を隠す
class ConfigManager {
  private static instance: ConfigManager;
  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }
}

class UserService {
  getUser(id: string): User {
    const config = ConfigManager.getInstance();  // 隠れた依存性！
    // テストでモックできない
  }
}

// ⭕ DIで明示的に依存を注入
class UserService {
  constructor(private config: Config) {}  // 依存が明示的

  getUser(id: string): User {
    // configをテストでモック可能
  }
}

// ========================================
// Factory Method：柔軟なオブジェクト生成
// ========================================

// ❌ switch文でオブジェクト生成（OCP違反）
function createNotification(type: string): Notification {
  switch (type) {
    case 'email': return new EmailNotification();
    case 'sms': return new SMSNotification();
    case 'push': return new PushNotification();  // 追加のたびに修正
    default: throw new Error('Unknown type');
  }
}

// ⭕ Factory Methodパターン
interface NotificationFactory {
  create(): Notification;
}

class EmailNotificationFactory implements NotificationFactory {
  create(): Notification {
    return new EmailNotification();
  }
}

class SMSNotificationFactory implements NotificationFactory {
  create(): Notification {
    return new SMSNotification();
  }
}

// 新しい通知タイプは新Factoryを追加するだけ
class PushNotificationFactory implements NotificationFactory {
  create(): Notification {
    return new PushNotification();
  }
}

// ========================================
// Builder：複雑なオブジェクト構築
// ========================================

// ❌ 引数が多すぎるコンストラクタ
class HttpRequest {
  constructor(
    method: string,
    url: string,
    headers: Record<string, string>,
    body: string | null,
    timeout: number,
    retries: number,
    auth: AuthConfig | null,
    proxy: ProxyConfig | null
  ) {}
}

// 使う側が混乱する
new HttpRequest('GET', '/api', {}, null, 5000, 3, null, null);

// ⭕ Builderパターン
class HttpRequestBuilder {
  private method = 'GET';
  private url = '';
  private headers: Record<string, string> = {};
  private body: string | null = null;
  private timeout = 30000;
  private retries = 0;

  setMethod(method: string): this {
    this.method = method;
    return this;
  }

  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  setHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  setTimeout(timeout: number): this {
    this.timeout = timeout;
    return this;
  }

  build(): HttpRequest {
    return new HttpRequest(
      this.method,
      this.url,
      this.headers,
      this.body,
      this.timeout,
      this.retries
    );
  }
}

// 読みやすい構築
const request = new HttpRequestBuilder()
  .setMethod('POST')
  .setUrl('/api/users')
  .setHeader('Content-Type', 'application/json')
  .setTimeout(5000)
  .build();

// ========================================
// Decorator：動的な機能追加
// ========================================

// ❌ 継承で機能を追加（組み合わせ爆発）
class BasicLogger {}
class TimestampLogger extends BasicLogger {}
class JsonLogger extends BasicLogger {}
class TimestampJsonLogger extends BasicLogger {}  // 組み合わせが増える

// ⭕ Decoratorパターン
interface Logger {
  log(message: string): void;
}

class BasicLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

class TimestampDecorator implements Logger {
  constructor(private logger: Logger) {}

  log(message: string): void {
    this.logger.log(`[${new Date().toISOString()}] ${message}`);
  }
}

class JsonDecorator implements Logger {
  constructor(private logger: Logger) {}

  log(message: string): void {
    this.logger.log(JSON.stringify({ message }));
  }
}

// 自由に組み合わせ可能
const logger = new TimestampDecorator(
  new JsonDecorator(
    new BasicLogger()
  )
);
```

### 出典
- [Refactoring Guru - Design Patterns in TypeScript](https://refactoring.guru/design-patterns/typescript)
- [Patterns.dev](https://www.patterns.dev/)
- [Design Patterns: Elements of Reusable Object-Oriented Software (GoF Book)](https://www.oreilly.com/library/view/design-patterns-elements/0201633612/)
- [GitHub - Sean-Bradley/Design-Patterns-In-TypeScript](https://github.com/Sean-Bradley/Design-Patterns-In-TypeScript)

---

## Phase 4: デザインパターン - 振る舞い（behavior1-behavior10）

### 学習目標
- GoFの振る舞いパターン11個を説明できる
- 適切なパターン選択ができる
- 現代的な代替手段（関数型、Reactフック）を理解している

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| behavior1 | Strategy | アルゴリズムの切り替え | if文の条件分岐 |
| behavior2 | Observer | 状態変化の通知 | 密結合な通知 |
| behavior3 | Command | 操作のオブジェクト化 | Undo実装漏れ |
| behavior4 | State | 状態による振る舞い変更 | 巨大なswitch文 |
| behavior5 | Template Method | アルゴリズムの骨格定義 | コピペコード |
| behavior6 | Iterator | 集合の走査を抽象化 | インデックス直接操作 |
| behavior7 | Chain of Responsibility | 処理の連鎖 | 責務不明確 |
| behavior8 | Mediator | オブジェクト間の調整 | 多対多の依存 |
| behavior9 | Memento | 状態のスナップショット | 内部状態の露出 |
| behavior10 | Visitor/Modern Patterns | 新しい操作の追加、現代的代替 | - |

### 振る舞いパターン（Behavioral Patterns）

| パターン | 目的 | 現代的な代替 |
|---------|------|-------------|
| **Strategy** | アルゴリズムを交換可能に | 関数を引数で渡す |
| **Observer** | イベント通知 | EventEmitter、RxJS |
| **Command** | 操作をオブジェクト化 | Redux Action |
| **State** | 状態マシン | XState、useReducer |
| **Template Method** | アルゴリズムの骨格 | 高階関数 |
| **Iterator** | 集合の走査 | for...of、ジェネレーター |
| **Chain of Responsibility** | 処理の連鎖 | ミドルウェア |
| **Mediator** | 相互作用の集約 | イベントバス、Redux |
| **Memento** | 状態の保存/復元 | 不変データ構造 |
| **Visitor** | 新操作の追加 | パターンマッチング |

### コードレビューで見抜くべき問題

```typescript
// ========================================
// Strategy：アルゴリズムの交換
// ========================================

// ❌ 条件分岐でアルゴリズム選択
class ShippingCalculator {
  calculate(order: Order, method: string): number {
    if (method === 'standard') {
      return order.weight * 1.5;
    } else if (method === 'express') {
      return order.weight * 3.0 + 500;
    } else if (method === 'overnight') {
      return order.weight * 5.0 + 1000;
    }
    throw new Error('Unknown method');
  }
}

// ⭕ Strategyパターン
interface ShippingStrategy {
  calculate(order: Order): number;
}

class StandardShipping implements ShippingStrategy {
  calculate(order: Order): number {
    return order.weight * 1.5;
  }
}

class ExpressShipping implements ShippingStrategy {
  calculate(order: Order): number {
    return order.weight * 3.0 + 500;
  }
}

// 現代的な代替：関数で渡す
type ShippingCalculator = (order: Order) => number;

const standardShipping: ShippingCalculator = (order) => order.weight * 1.5;
const expressShipping: ShippingCalculator = (order) => order.weight * 3.0 + 500;

function calculateShipping(order: Order, strategy: ShippingCalculator): number {
  return strategy(order);
}

// ========================================
// Observer：状態変化の通知
// ========================================

// ❌ 密結合な通知
class StockMonitor {
  private emailService = new EmailService();
  private smsService = new SMSService();
  private slackService = new SlackService();

  onPriceChange(stock: Stock): void {
    this.emailService.send(`Price changed: ${stock.price}`);
    this.smsService.send(`Price changed: ${stock.price}`);
    this.slackService.send(`Price changed: ${stock.price}`);
  }
}

// ⭕ Observerパターン
interface Observer {
  update(data: unknown): void;
}

class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  notify(data: unknown): void {
    this.observers.forEach(o => o.update(data));
  }
}

// 現代的な代替：EventEmitter
import { EventEmitter } from 'events';

class StockMonitor extends EventEmitter {
  onPriceChange(stock: Stock): void {
    this.emit('priceChange', stock);
  }
}

const monitor = new StockMonitor();
monitor.on('priceChange', (stock) => sendEmail(stock));
monitor.on('priceChange', (stock) => sendSMS(stock));

// ========================================
// State：状態による振る舞い変更
// ========================================

// ❌ 巨大なswitch文で状態管理
class Order {
  status: 'pending' | 'paid' | 'shipped' | 'delivered';

  process(): void {
    switch (this.status) {
      case 'pending':
        // 支払い処理
        this.status = 'paid';
        break;
      case 'paid':
        // 発送処理
        this.status = 'shipped';
        break;
      case 'shipped':
        // 配達完了処理
        this.status = 'delivered';
        break;
      case 'delivered':
        throw new Error('Order already delivered');
    }
  }
}

// ⭕ Stateパターン
interface OrderState {
  process(order: Order): void;
}

class PendingState implements OrderState {
  process(order: Order): void {
    // 支払い処理
    order.setState(new PaidState());
  }
}

class PaidState implements OrderState {
  process(order: Order): void {
    // 発送処理
    order.setState(new ShippedState());
  }
}

// 現代的な代替：XState（状態マシンライブラリ）
import { createMachine } from 'xstate';

const orderMachine = createMachine({
  id: 'order',
  initial: 'pending',
  states: {
    pending: { on: { PAY: 'paid' } },
    paid: { on: { SHIP: 'shipped' } },
    shipped: { on: { DELIVER: 'delivered' } },
    delivered: { type: 'final' }
  }
});

// ========================================
// Chain of Responsibility：処理の連鎖
// ========================================

// ❌ 責務が不明確な一枚岩の処理
class RequestHandler {
  handle(request: Request): Response {
    // 認証チェック
    if (!request.headers.authorization) {
      return new Response(401);
    }

    // レート制限
    if (this.isRateLimited(request.ip)) {
      return new Response(429);
    }

    // バリデーション
    if (!this.validate(request.body)) {
      return new Response(400);
    }

    // ビジネスロジック
    return this.processRequest(request);
  }
}

// ⭕ Chain of Responsibilityパターン（ミドルウェア）
interface Middleware {
  handle(request: Request, next: () => Response): Response;
}

class AuthMiddleware implements Middleware {
  handle(request: Request, next: () => Response): Response {
    if (!request.headers.authorization) {
      return new Response(401);
    }
    return next();
  }
}

class RateLimitMiddleware implements Middleware {
  handle(request: Request, next: () => Response): Response {
    if (this.isRateLimited(request.ip)) {
      return new Response(429);
    }
    return next();
  }
}

// Expressスタイルのミドルウェア
app.use(authMiddleware);
app.use(rateLimitMiddleware);
app.use(validationMiddleware);
```

### 出典
- [Refactoring Guru - Behavioral Patterns](https://refactoring.guru/design-patterns/behavioral-patterns)
- [Patterns.dev - React Patterns](https://www.patterns.dev/react/)
- [XState Documentation](https://xstate.js.org/docs/)
- [Medium - Gang of Four Patterns in 2025](https://medium.com/@freddy.dordoni/the-gang-of-four-gave-us-23-design-patterns-are-they-still-relevant-in-2025-f2e999c384c0)

---

## Phase 5: アーキテクチャ基礎（arch1-arch10）

### 学習目標
- モノリス、マイクロサービス、モジュラーモノリスの違いを説明できる
- アーキテクチャの選択基準を理解している
- レイヤードアーキテクチャの問題点を指摘できる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| arch1 | アーキテクチャとは | 構造、品質特性、トレードオフ | - |
| arch2 | レイヤードアーキテクチャ | 伝統的な3層/N層構造 | レイヤー間の依存方向 |
| arch3 | レイヤードの問題点 | DB駆動設計、循環依存 | ドメインがDBに依存 |
| arch4 | モノリス | 単一デプロイ、利点と欠点 | スケーリング困難 |
| arch5 | モジュラーモノリス | モジュール境界、内部API | モジュール間の密結合 |
| arch6 | マイクロサービス | サービス分割、独立デプロイ | 分散の複雑さ |
| arch7 | サービス境界の決め方 | ビジネス機能、チーム構成 | 技術的分割 |
| arch8 | 通信パターン | 同期/非同期、イベント駆動 | 同期依存の連鎖 |
| arch9 | データ管理 | サービスごとのDB、Saga | 分散トランザクション |
| arch10 | アーキテクチャ選択 | チーム規模、複雑さ、スケール要件 | オーバーエンジニアリング |

### アーキテクチャスタイルの比較（2025年版）

| スタイル | チーム規模 | 複雑さ | デプロイ | 適用場面 |
|---------|-----------|--------|---------|---------|
| **モノリス** | 1-10人 | 低 | 単一 | MVP、スタートアップ |
| **モジュラーモノリス** | 10-50人 | 中 | 単一 | 成長フェーズ |
| **マイクロサービス** | 50人以上 | 高 | 独立 | 大規模、高スケール |

> **2025年のトレンド**: Amazon Prime Videoのモノリス回帰など、「マイクロサービス疲れ」からモジュラーモノリスが再評価されている。チーム規模と複雑さに応じた選択が重要。

### コードレビューで見抜くべき問題

```typescript
// ========================================
// レイヤードアーキテクチャの問題
// ========================================

// ❌ DB駆動設計（ドメインがインフラに依存）
// domain/User.ts
import { Column, Entity, PrimaryColumn } from 'typeorm';  // ORMに依存

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;
}

// ⭕ ドメインは純粋なビジネスロジックのみ
// domain/User.ts
export class User {
  constructor(
    public readonly id: UserId,
    private email: Email,
    private passwordHash: PasswordHash
  ) {}

  changeEmail(newEmail: Email): void {
    // ビジネスルール
  }
}

// infrastructure/TypeORMUserEntity.ts（インフラ層）
@Entity('users')
export class TypeORMUserEntity {
  @PrimaryColumn()
  id: string;
  // ...
}

// ========================================
// モジュラーモノリス：境界の明確化
// ========================================

// ❌ モジュール間の直接参照（密結合）
// modules/order/OrderService.ts
import { UserRepository } from '../user/UserRepository';  // 直接import

class OrderService {
  constructor(private userRepo: UserRepository) {}  // 他モジュールに直接依存
}

// ⭕ 公開インターフェースを通じた疎結合
// modules/user/index.ts（公開API）
export interface UserModule {
  findById(id: string): Promise<UserDTO | null>;
  validateCredit(userId: string, amount: number): Promise<boolean>;
}

// modules/order/OrderService.ts
import { UserModule } from '../user';  // 公開インターフェースのみimport

class OrderService {
  constructor(private userModule: UserModule) {}  // インターフェースに依存
}

// ========================================
// マイクロサービス：適切な境界
// ========================================

// ❌ 技術的な分割（アンチパターン）
// services/
//   api-service/        # 全APIを担当
//   database-service/   # 全DBアクセスを担当
//   notification-service/  # 全通知を担当

// ⭕ ビジネス機能での分割
// services/
//   user-service/       # ユーザー管理（認証、プロフィール）
//   order-service/      # 注文管理（カート、チェックアウト）
//   inventory-service/  # 在庫管理
//   payment-service/    # 決済

// ========================================
// 同期依存の連鎖（問題）
// ========================================

// ❌ 同期呼び出しの連鎖（1つ落ちると全体が止まる）
class OrderService {
  async createOrder(data: OrderData): Promise<Order> {
    const user = await this.userService.getUser(data.userId);      // 同期
    const inventory = await this.inventoryService.check(data);      // 同期
    const payment = await this.paymentService.process(data);        // 同期
    // 1つでも遅延/障害があると全体に影響
  }
}

// ⭕ イベント駆動（非同期）
class OrderService {
  async createOrder(data: OrderData): Promise<Order> {
    const order = Order.create(data);
    await this.orderRepository.save(order);

    // イベントを発行、各サービスが独立して処理
    await this.eventBus.publish(new OrderCreatedEvent(order));

    return order;
  }
}

// 各サービスがイベントを購読
class InventoryService {
  @OnEvent('OrderCreated')
  async handleOrderCreated(event: OrderCreatedEvent): Promise<void> {
    await this.reserveInventory(event.order);
  }
}
```

### アーキテクチャ選択のチェックリスト

| 質問 | モノリス | モジュラーモノリス | マイクロサービス |
|------|---------|------------------|-----------------|
| チームは10人以下？ | ✓ | - | - |
| 独立したデプロイが必要？ | - | - | ✓ |
| 異なる技術スタックが必要？ | - | - | ✓ |
| 部分的なスケーリングが必要？ | - | △ | ✓ |
| 運用の複雑さを許容できる？ | - | - | ✓ |

### 出典
- [Monolithic vs Microservices in 2025 - Scalo](https://www.scalosoft.com/blog/monolithic-vs-microservices-architecture-pros-and-cons-for-2025/)
- [Microservices vs Modular Monoliths in 2025 - Java Code Geeks](https://www.javacodegeeks.com/2025/12/microservices-vs-modular-monoliths-in-2025-when-each-approach-wins.html)
- [microservices.io](https://microservices.io/)
- [Martin Fowler - Microservices](https://martinfowler.com/articles/microservices.html)

---

## Phase 6: クリーン/ヘキサゴナルアーキテクチャ（clean1-clean10）

### 学習目標
- クリーンアーキテクチャの依存ルールを説明できる
- ヘキサゴナルアーキテクチャ（Ports & Adapters）を理解している
- ドメイン層の独立性を守れる

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| clean1 | なぜアーキテクチャが必要か | 変更容易性、テスト容易性 | - |
| clean2 | クリーンアーキテクチャ概要 | 同心円、依存ルール | 依存方向違反 |
| clean3 | ドメイン層 | エンティティ、ビジネスルール | フレームワーク依存 |
| clean4 | ユースケース層 | アプリケーションロジック | ドメインロジック混入 |
| clean5 | インターフェース層 | コントローラー、プレゼンター | ビジネスロジック混入 |
| clean6 | インフラ層 | DB、外部API、フレームワーク | - |
| clean7 | ヘキサゴナル概要 | Ports & Adapters、六角形 | - |
| clean8 | ポート（Port） | 入力/出力インターフェース | 具象依存 |
| clean9 | アダプター（Adapter） | 実装の詳細、交換可能性 | アダプターのロジック |
| clean10 | 実践的な適用 | ディレクトリ構造、トレードオフ | 過剰な抽象化 |

### クリーンアーキテクチャの依存ルール

```
    外側 → 内側 への依存のみ許可

    ┌────────────────────────────────────────┐
    │  Frameworks & Drivers (外側)           │
    │  ┌────────────────────────────────┐    │
    │  │  Interface Adapters             │    │
    │  │  ┌────────────────────────┐    │    │
    │  │  │  Application Business   │    │    │
    │  │  │  ┌────────────────┐    │    │    │
    │  │  │  │   Entities     │    │    │    │
    │  │  │  │  (ドメイン)     │    │    │    │
    │  │  │  └────────────────┘    │    │    │
    │  │  └────────────────────────┘    │    │
    │  └────────────────────────────────┘    │
    └────────────────────────────────────────┘
```

### ヘキサゴナルアーキテクチャ（Ports & Adapters）

```
         ┌─────────────────────────────────────┐
         │          Primary Adapters           │
         │   (Controllers, CLI, Tests)         │
         │                                     │
         │    ┌───────────────────────┐        │
    ─────┼───►│    Input Ports        │        │
         │    │  (Use Case Interfaces)│        │
         │    └───────────┬───────────┘        │
         │                │                    │
         │    ┌───────────▼───────────┐        │
         │    │      Application      │        │
         │    │    (Domain Logic)     │        │
         │    └───────────┬───────────┘        │
         │                │                    │
         │    ┌───────────▼───────────┐        │
         │    │    Output Ports       │        │
         │    │ (Repository Interface)│        │
         │    └───────────────────────┘        │
         │                                     │
         │         Secondary Adapters          │
         │    (DB, External APIs, Message Q)   │
         └─────────────────────────────────────┘
```

### コードレビューで見抜くべき問題

```typescript
// ========================================
// ディレクトリ構造の例
// ========================================

// ⭕ クリーンアーキテクチャのディレクトリ構造
// src/
//   domain/           # エンティティ、値オブジェクト
//   application/      # ユースケース、入力/出力ポート
//   infrastructure/   # DB、外部API実装
//   presentation/     # コントローラー、DTO

// ========================================
// 依存方向の違反
// ========================================

// ❌ ドメインがインフラに依存
// domain/User.ts
import { PrismaClient } from '@prisma/client';  // インフラ層のimport！

export class User {
  async save(): Promise<void> {
    const prisma = new PrismaClient();
    await prisma.user.create({ data: this });  // ドメインがDBを知っている
  }
}

// ⭕ ドメインは純粋
// domain/User.ts
export class User {
  constructor(
    public readonly id: UserId,
    private email: Email,
    private name: UserName
  ) {}

  changeName(newName: UserName): void {
    // ビジネスルールのみ
    if (newName.isEmpty()) {
      throw new DomainError('Name cannot be empty');
    }
    this.name = newName;
  }
}

// application/ports/UserRepository.ts（出力ポート）
export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<User | null>;
}

// infrastructure/PrismaUserRepository.ts（アダプター）
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id.value },
      create: this.toRecord(user),
      update: this.toRecord(user)
    });
  }
}

// ========================================
// ユースケース層の責務
// ========================================

// ❌ ユースケースにインフラの詳細が混入
// application/CreateUserUseCase.ts
export class CreateUserUseCase {
  async execute(input: CreateUserInput): Promise<void> {
    const prisma = new PrismaClient();  // 具象依存！

    // SQLを直接書いている
    await prisma.$executeRaw`
      INSERT INTO users (id, email) VALUES (${input.id}, ${input.email})
    `;

    // SMTPの詳細を知っている
    const transporter = nodemailer.createTransport({ /* ... */ });
    await transporter.sendMail({ /* ... */ });
  }
}

// ⭕ ユースケースはポートのみに依存
// application/CreateUserUseCase.ts
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,      // 出力ポート
    private emailSender: EmailSender,            // 出力ポート
    private eventPublisher: EventPublisher       // 出力ポート
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    // ドメインオブジェクトを生成
    const user = User.create(
      UserId.generate(),
      Email.create(input.email),
      UserName.create(input.name)
    );

    // ポートを通じて永続化（詳細は知らない）
    await this.userRepository.save(user);

    // ポートを通じてメール送信（詳細は知らない）
    await this.emailSender.sendWelcome(user.email);

    // ドメインイベントを発行
    await this.eventPublisher.publish(new UserCreatedEvent(user));

    return { userId: user.id.value };
  }
}

// ========================================
// プレゼンテーション層の責務
// ========================================

// ❌ コントローラーにビジネスロジックが混入
// presentation/UserController.ts
export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    // バリデーション（OK）
    if (!req.body.email) {
      return res.status(400).json({ error: 'Email required' });
    }

    // ビジネスロジックがコントローラーに！
    if (await this.userRepo.existsByEmail(req.body.email)) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = { ...req.body, passwordHash };
    await this.userRepo.save(user);

    // メール送信もここに
    await this.emailService.send(user.email, 'Welcome!');

    res.status(201).json(user);
  }
}

// ⭕ コントローラーは入力変換とユースケース呼び出しのみ
// presentation/UserController.ts
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async createUser(req: Request, res: Response): Promise<void> {
    // 入力のバリデーション（プレゼンテーション層の責務）
    const validation = CreateUserSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues });
    }

    try {
      // ユースケースを呼び出すだけ
      const result = await this.createUserUseCase.execute(validation.data);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        return res.status(409).json({ error: error.message });
      }
      throw error;
    }
  }
}
```

### 出典
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture - Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [DEV Community - Hexagonal and Clean Architecture](https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi)
- [Happy Coders - Hexagonal Architecture](https://www.happycoders.eu/software-craftsmanship/hexagonal-architecture/)

---

## Phase 7: DDD戦略的設計（ddd-s1-ddd-s10）

### 学習目標
- ドメイン駆動設計の目的と価値を説明できる
- 境界づけられたコンテキストを識別できる
- コンテキストマップを描ける

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| ddd-s1 | DDDとは | ドメイン中心の設計、なぜ必要か | - |
| ddd-s2 | ユビキタス言語 | ドメインエキスパートとの共通言語 | 技術用語とのずれ |
| ddd-s3 | ドメインの分析 | コアドメイン、サブドメイン | コア/サポートの誤認識 |
| ddd-s4 | 境界づけられたコンテキスト | モデルの境界、言葉の意味 | 巨大なコンテキスト |
| ddd-s5 | コンテキストマップ | コンテキスト間の関係 | 関係の未定義 |
| ddd-s6 | 統合パターン | 共有カーネル、顧客/供給者 | 暗黙の依存 |
| ddd-s7 | 腐敗防止層（ACL） | レガシーとの統合 | ACLなしの統合 |
| ddd-s8 | イベントストーミング | ドメイン発見ワークショップ | - |
| ddd-s9 | ドメインストーリーテリング | 業務フローの可視化 | - |
| ddd-s10 | 戦略的設計のまとめ | マイクロサービスとの関係 | - |

### ドメインの分類

| 種類 | 説明 | 投資レベル |
|------|------|-----------|
| **コアドメイン** | 競争優位の源泉、ビジネスの差別化要因 | 最大投資 |
| **サポートドメイン** | コアを支える、自社固有 | 適度な投資 |
| **汎用ドメイン** | どの企業でも同じ（認証、決済等） | 外部サービス利用 |

### コンテキストマップの関係パターン

| パターン | 説明 | 適用場面 |
|---------|------|---------|
| **共有カーネル** | 共通モデルを共有 | 密接に連携するチーム |
| **顧客/供給者** | 上流/下流の関係 | APIを提供/消費 |
| **適合者** | 下流が上流に合わせる | 変更権限なし |
| **腐敗防止層** | 変換層を挟む | レガシー統合 |
| **公開ホスト** | 標準APIを公開 | 多数の消費者 |

### コードレビューで見抜くべき問題

```typescript
// ========================================
// ユビキタス言語の欠如
// ========================================

// ❌ 技術用語とビジネス用語のずれ
// コード内で「User」だが、ビジネスでは「Member」「Customer」「Subscriber」と呼ぶ
class User {
  status: 'active' | 'inactive' | 'pending';  // ビジネスでは「会員」「休会中」「仮登録」
}

// ⭕ ユビキタス言語を反映
class Member {
  membershipStatus: MembershipStatus;  // 'active' | 'suspended' | 'provisional'
}

// ========================================
// 境界づけられたコンテキストの欠如
// ========================================

// ❌ 単一の「User」モデルが全コンテキストで共有
// 販売、配送、サポート、請求すべてで同じUserを使う
class User {
  id: string;
  email: string;
  name: string;
  address: Address;           // 配送コンテキスト
  paymentMethods: Payment[];  // 請求コンテキスト
  supportTickets: Ticket[];   // サポートコンテキスト
  orders: Order[];            // 販売コンテキスト
  // 肥大化した神クラス
}

// ⭕ コンテキストごとに異なるモデル
// sales-context/Customer.ts
class Customer {
  id: CustomerId;
  email: Email;
  loyaltyTier: LoyaltyTier;
}

// shipping-context/Recipient.ts
class Recipient {
  name: string;
  shippingAddress: ShippingAddress;
  contactPhone: Phone;
}

// billing-context/BillingAccount.ts
class BillingAccount {
  accountId: AccountId;
  paymentMethods: PaymentMethod[];
  billingAddress: BillingAddress;
}

// ========================================
// 腐敗防止層（ACL）の欠如
// ========================================

// ❌ レガシーシステムのモデルが新システムに漏れ出す
// legacy-api/types.ts
interface LegacyCustomerData {
  CUST_ID: string;        // 命名規則が異なる
  CUST_NM: string;
  CUST_EMAIL_ADDR: string;
  ACTIVE_FLG: 'Y' | 'N';  // boolean じゃない
}

// new-system/CustomerService.ts
class CustomerService {
  async getCustomer(id: string): Promise<LegacyCustomerData> {  // レガシー型が漏れ出す
    return await legacyApi.getCustomer(id);
  }
}

// ⭕ 腐敗防止層で変換
// acl/CustomerTranslator.ts
class CustomerTranslator {
  toDomain(legacy: LegacyCustomerData): Customer {
    return new Customer(
      CustomerId.create(legacy.CUST_ID),
      CustomerName.create(legacy.CUST_NM),
      Email.create(legacy.CUST_EMAIL_ADDR),
      legacy.ACTIVE_FLG === 'Y'
    );
  }
}

// new-system/CustomerService.ts
class CustomerService {
  constructor(
    private legacyApi: LegacyCustomerApi,
    private translator: CustomerTranslator
  ) {}

  async getCustomer(id: CustomerId): Promise<Customer> {
    const legacyData = await this.legacyApi.getCustomer(id.value);
    return this.translator.toDomain(legacyData);  // ドメインモデルに変換
  }
}

// ========================================
// コンテキスト間の統合
// ========================================

// ❌ コンテキスト間の直接依存
// order-context/OrderService.ts
import { InventoryService } from '../inventory-context/InventoryService';  // 直接import

class OrderService {
  constructor(private inventoryService: InventoryService) {}  // 密結合

  async createOrder(data: OrderData): Promise<Order> {
    // 同期呼び出しで在庫確認
    const available = await this.inventoryService.checkAvailability(data.items);
    if (!available) throw new Error('Out of stock');
    // ...
  }
}

// ⭕ イベントによる疎結合
// order-context/OrderService.ts
class OrderService {
  constructor(private eventPublisher: DomainEventPublisher) {}

  async createOrder(data: OrderData): Promise<Order> {
    const order = Order.create(data);
    // 在庫確認を待たずに注文を仮作成
    order.markAsPending();
    await this.orderRepository.save(order);

    // イベントを発行（在庫コンテキストが購読）
    await this.eventPublisher.publish(
      new OrderCreatedEvent(order.id, order.items)
    );

    return order;
  }
}

// inventory-context/InventoryEventHandler.ts
class InventoryEventHandler {
  @OnEvent('OrderCreated')
  async handleOrderCreated(event: OrderCreatedEvent): Promise<void> {
    const reserved = await this.inventoryService.reserve(event.items);

    if (reserved) {
      await this.eventPublisher.publish(
        new InventoryReservedEvent(event.orderId)
      );
    } else {
      await this.eventPublisher.publish(
        new InventoryReservationFailedEvent(event.orderId)
      );
    }
  }
}
```

### 出典
- [Domain-Driven Design by Eric Evans](https://www.domainlanguage.com/ddd/)
- [DDD Academy - Strategic DDD](https://ddd.academy/strategic-ddd/)
- [Medium - DDD Strategic Design Explained](https://medium.com/@lambrych/domain-driven-design-ddd-strategic-design-explained-55e10b7ecc0f)
- [InfoQ - Sociotechnical Design with DDD](https://www.infoq.com/news/2025/11/sociotechnical-design-DDD/)

---

## Phase 8: DDD戦術的設計（ddd-t1-ddd-t10）

### 学習目標
- エンティティ、値オブジェクト、集約の違いを説明できる
- 集約の設計ルールを守れる
- リポジトリ、ドメインサービス、ドメインイベントを適切に使える

### レッスン構成

| ID | トピック | 内容 | レビュー観点 |
|----|---------|------|-------------|
| ddd-t1 | エンティティ | 同一性、ライフサイクル | IDなしのエンティティ |
| ddd-t2 | 値オブジェクト | 不変、等価性、自己検証 | プリミティブ型の多用 |
| ddd-t3 | 集約 | 整合性境界、トランザクション | 巨大な集約 |
| ddd-t4 | 集約ルート | 外部からの唯一の入口 | 内部エンティティの直接操作 |
| ddd-t5 | リポジトリ | 集約の永続化 | CRUD操作の羅列 |
| ddd-t6 | ドメインサービス | エンティティに属さないロジック | サービス肥大化 |
| ddd-t7 | ファクトリ | 複雑なオブジェクト生成 | コンストラクタの肥大化 |
| ddd-t8 | ドメインイベント | 状態変化の通知 | イベントなしの直接呼び出し |
| ddd-t9 | 仕様パターン | 複雑な条件のカプセル化 | if文の羅列 |
| ddd-t10 | 戦術的設計のまとめ | TypeScriptでの実装パターン | - |

### エンティティ vs 値オブジェクト

| 観点 | エンティティ | 値オブジェクト |
|------|-------------|--------------|
| 同一性 | IDで識別 | 属性で識別 |
| 可変性 | 変更可能 | 不変 |
| 等価性 | ID一致で等価 | 全属性一致で等価 |
| 例 | User, Order, Product | Email, Money, Address |

### 集約の設計ルール

1. **小さく保つ**: 1つの集約は1つのトランザクションで完結
2. **IDで参照**: 他の集約は集約ルートのIDで参照
3. **結果整合性**: 集約間は非同期で整合性を保つ

### コードレビューで見抜くべき問題

```typescript
// ========================================
// 値オブジェクト
// ========================================

// ❌ プリミティブ型の乱用（Primitive Obsession）
class User {
  constructor(
    public id: string,      // どんな文字列でも入る
    public email: string,   // バリデーションなし
    public age: number      // マイナスも入る
  ) {}
}

const user = new User('', 'invalid-email', -5);  // 不正なデータが作れる

// ⭕ 値オブジェクトで型安全に
class UserId {
  private constructor(public readonly value: string) {}

  static create(value: string): UserId {
    if (!value || value.length < 10) {
      throw new DomainError('Invalid user ID');
    }
    return new UserId(value);
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }
}

class Email {
  private constructor(public readonly value: string) {}

  static create(value: string): Email {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new DomainError('Invalid email format');
    }
    return new Email(value.toLowerCase());
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}

class Age {
  private constructor(public readonly value: number) {}

  static create(value: number): Age {
    if (value < 0 || value > 150) {
      throw new DomainError('Invalid age');
    }
    return new Age(value);
  }
}

class User {
  constructor(
    public readonly id: UserId,
    private email: Email,
    private age: Age
  ) {}
}

// 不正なデータは作れない
// const user = new User(UserId.create(''), ...);  // エラー

// ========================================
// 集約の設計
// ========================================

// ❌ 巨大な集約（パフォーマンス問題）
class Order {
  constructor(
    public id: OrderId,
    public customer: Customer,     // 顧客全体を含む
    public items: OrderItem[],     // 明細
    public payments: Payment[],    // 支払い履歴全部
    public shipments: Shipment[],  // 配送履歴全部
    public reviews: Review[]       // レビュー全部
  ) {}
}
// 1つの注文を取得するだけで大量のデータを読み込む

// ⭕ 適切なサイズの集約
class Order {
  constructor(
    public readonly id: OrderId,
    public readonly customerId: CustomerId,  // IDで参照
    private items: OrderItem[],
    private status: OrderStatus
  ) {}

  addItem(item: OrderItem): void {
    // 集約内の整合性を保つ
    if (this.status !== OrderStatus.Draft) {
      throw new DomainError('Cannot modify confirmed order');
    }
    this.items.push(item);
  }

  confirm(): void {
    if (this.items.length === 0) {
      throw new DomainError('Cannot confirm empty order');
    }
    this.status = OrderStatus.Confirmed;
  }
}

// Payment, Shipment, Review は別の集約として設計
class Payment {
  constructor(
    public readonly id: PaymentId,
    public readonly orderId: OrderId,  // 集約間はIDで参照
    private amount: Money,
    private status: PaymentStatus
  ) {}
}

// ❌ 集約の内部エンティティを直接操作
class OrderService {
  async updateItemQuantity(
    orderId: string,
    itemId: string,
    quantity: number
  ): Promise<void> {
    const order = await this.orderRepo.findById(orderId);

    // 内部のOrderItemを直接変更！
    const item = order.items.find(i => i.id === itemId);
    item.quantity = quantity;  // カプセル化違反

    await this.orderRepo.save(order);
  }
}

// ⭕ 集約ルートを通じて操作
class Order {
  private items: OrderItem[];

  updateItemQuantity(itemId: OrderItemId, quantity: Quantity): void {
    const item = this.items.find(i => i.id.equals(itemId));
    if (!item) {
      throw new DomainError('Item not found');
    }

    // ビジネスルールを集約内でチェック
    if (quantity.value > 100) {
      throw new DomainError('Cannot order more than 100 items');
    }

    item.updateQuantity(quantity);
    this.recalculateTotal();
  }
}

class OrderService {
  async updateItemQuantity(
    orderId: OrderId,
    itemId: OrderItemId,
    quantity: Quantity
  ): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    order.updateItemQuantity(itemId, quantity);  // 集約ルートを通じて操作
    await this.orderRepo.save(order);
  }
}

// ========================================
// リポジトリ
// ========================================

// ❌ CRUDの羅列（貧血ドメインモデル）
interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  findByCustomerId(customerId: string): Promise<Order[]>;
  findByStatus(status: string): Promise<Order[]>;
  findByDateRange(start: Date, end: Date): Promise<Order[]>;
  save(order: Order): Promise<void>;
  update(order: Order): Promise<void>;
  delete(id: string): Promise<void>;
}

// ⭕ 集約の保存と取得に集中
interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;

  // ビジネス要件に基づくクエリ
  findPendingOrdersForCustomer(customerId: CustomerId): Promise<Order[]>;
}

// 複雑な検索はCQRSのQuery側で実装

// ========================================
// ドメインイベント
// ========================================

// ❌ 直接呼び出しの連鎖
class OrderService {
  async confirmOrder(orderId: OrderId): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    order.confirm();
    await this.orderRepo.save(order);

    // 直接呼び出しの連鎖（密結合）
    await this.inventoryService.reserve(order.items);
    await this.paymentService.capture(order.payment);
    await this.emailService.sendConfirmation(order.customer);
    await this.analyticsService.track('order_confirmed', order);
  }
}

// ⭕ ドメインイベントで疎結合
class Order {
  private domainEvents: DomainEvent[] = [];

  confirm(): void {
    if (this.items.length === 0) {
      throw new DomainError('Cannot confirm empty order');
    }
    this.status = OrderStatus.Confirmed;

    // ドメインイベントを発行
    this.domainEvents.push(
      new OrderConfirmedEvent(this.id, this.customerId, this.items)
    );
  }

  pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents = [];
    return events;
  }
}

class OrderService {
  async confirmOrder(orderId: OrderId): Promise<void> {
    const order = await this.orderRepo.findById(orderId);
    order.confirm();
    await this.orderRepo.save(order);

    // イベントをディスパッチ（ハンドラーが非同期で処理）
    const events = order.pullDomainEvents();
    await this.eventDispatcher.dispatch(events);
  }
}

// 各サービスは独立してイベントを購読
class InventoryEventHandler {
  @OnEvent('OrderConfirmed')
  async handle(event: OrderConfirmedEvent): Promise<void> {
    await this.inventoryService.reserve(event.items);
  }
}
```

### 出典
- [Khalil Stemmler - DDD with TypeScript](https://khalilstemmler.com/articles/typescript-domain-driven-design/aggregate-design-persistence/)
- [Medium - Entity vs Value Object vs Aggregate Root](https://mbarkt3sto.hashnode.dev/ddd-entity-vs-value-object-vs-aggregate-root)
- [SAP - How to Develop Aggregates](https://github.com/SAP/curated-resources-for-domain-driven-design)
- [DDD Academy - Tactical DDD](https://ddd.academy/tactical-domain-driven-design-mathias-verraes/)

---

## 総合レビューチェックリスト

### OOP原則
- [ ] カプセル化されているか（publicフィールドの乱用がないか）
- [ ] 継承階層が深すぎないか（3階層以下が目安）
- [ ] コンポジションを優先しているか
- [ ] ポリモーフィズムでswitch文を排除しているか
- [ ] 凝集度が高いか（1クラス1責務）

### SOLID原則
- [ ] SRP: クラスが1つの理由でのみ変更されるか
- [ ] OCP: 新機能追加で既存コードを修正していないか
- [ ] LSP: サブクラスが親クラスの契約を守っているか
- [ ] ISP: インターフェースが肥大化していないか
- [ ] DIP: 具象クラスではなく抽象に依存しているか

### デザインパターン
- [ ] Singletonの依存性が明示的か（DIで注入）
- [ ] Factory/Strategyで条件分岐を排除しているか
- [ ] Decoratorで継承の爆発を防いでいるか
- [ ] パターンが過剰に適用されていないか

### アーキテクチャ
- [ ] レイヤー間の依存方向が正しいか（外→内）
- [ ] ドメイン層がインフラに依存していないか
- [ ] モジュール/サービスの境界が明確か
- [ ] コンテキスト間の統合パターンが定義されているか

### DDD戦略的設計
- [ ] ユビキタス言語がコードに反映されているか
- [ ] コアドメインに投資が集中しているか
- [ ] 境界づけられたコンテキストが識別されているか
- [ ] 腐敗防止層でレガシーを隔離しているか

### DDD戦術的設計
- [ ] 値オブジェクトで型安全性を確保しているか
- [ ] 集約が適切なサイズか（巨大になっていないか）
- [ ] 集約ルートを通じてのみ操作しているか
- [ ] ドメインイベントで疎結合になっているか
- [ ] リポジトリが集約単位になっているか

---

## 参考資料

### 書籍
- [Clean Architecture - Robert C. Martin](https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/)
- [Domain-Driven Design - Eric Evans](https://www.domainlanguage.com/ddd/)
- [Implementing Domain-Driven Design - Vaughn Vernon](https://www.oreilly.com/library/view/implementing-domain-driven-design/9780133039900/)
- [Design Patterns - Gang of Four](https://www.oreilly.com/library/view/design-patterns-elements/0201633612/)

### オンラインリソース
- [Refactoring Guru - Design Patterns](https://refactoring.guru/design-patterns)
- [Patterns.dev](https://www.patterns.dev/)
- [Martin Fowler's Blog](https://martinfowler.com/)
- [Khalil Stemmler - DDD with TypeScript](https://khalilstemmler.com/)

### コミュニティ
- [DDD Europe](https://dddeurope.com/)
- [roadmap.sh/software-design-architecture](https://roadmap.sh/software-design-architecture)

### TypeScript実装例
- [GitHub - Design Patterns in TypeScript](https://github.com/Sean-Bradley/Design-Patterns-In-TypeScript)
- [GitHub - DDD TypeScript Example](https://github.com/stemmlerjs/ddd-forum)
