// ============================================
// セクションIDからファイルパスへのマッピング
// ============================================
const sectionMapping = {
  // Level 0
  'l0-1': 'level0/intro.html',
  'l0-2': 'level0/intro.html',
  'l0-3': 'level0/intro.html',
  'l0-4': 'level0/intro.html',
  'l0-5': 'level0/intro.html',
  'l0-6': 'level0/intro.html',
  'l0-7': 'level0/intro.html',
  'l0-8': 'level0/intro.html',

  // Level 1 - Phase 1: HTML基礎
  'html1': 'level1/phase1.html',
  'html2': 'level1/phase1.html',
  'html3': 'level1/phase1.html',
  'html4': 'level1/phase1.html',
  'html5': 'level1/phase1.html',
  'html6': 'level1/phase1.html',
  'html7': 'level1/phase1.html',
  'html8': 'level1/phase1.html',

  // Level 1 - Phase 2: CSS基礎
  'css1': 'level1/phase2.html',
  'css2': 'level1/phase2.html',
  'css3': 'level1/phase2.html',
  'css4': 'level1/phase2.html',
  'css5': 'level1/phase2.html',
  'css6': 'level1/phase2.html',
  'css7': 'level1/phase2.html',
  'css8': 'level1/phase2.html',

  // Level 1 - Phase 3: 実践
  'prac1': 'level1/phase3.html',
  'prac2': 'level1/phase3.html',
  'prac3': 'level1/phase3.html',
  'prac4': 'level1/phase3.html',
  'prac5': 'level1/phase3.html',

  // Level 2 - Phase 1: JavaScript基礎
  'js1': 'level2/phase1.html',
  'js2': 'level2/phase1.html',
  'js3': 'level2/phase1.html',
  'js4': 'level2/phase1.html',
  'js5': 'level2/phase1.html',
  'js6': 'level2/phase1.html',
  'js7': 'level2/phase1.html',
  'js8': 'level2/phase1.html',
  'js9': 'level2/phase1.html',

  // Level 2 - Phase 2: DOM操作
  'dom1': 'level2/phase2.html',
  'dom2': 'level2/phase2.html',
  'dom3': 'level2/phase2.html',
  'dom4': 'level2/phase2.html',
  'dom5': 'level2/phase2.html',
  'dom6': 'level2/phase2.html',

  // Level 2 - Phase 3: 非同期処理
  'async1': 'level2/phase3.html',
  'async2': 'level2/phase3.html',
  'async3': 'level2/phase3.html',
  'async4': 'level2/phase3.html',
  'async5': 'level2/phase3.html',
  'async6': 'level2/phase3.html',
  'async7': 'level2/phase3.html',
  'async8': 'level2/phase3.html',
  'async9': 'level2/phase3.html',

  // Level 2 - Phase 4: モダンJS
  'modern1': 'level2/phase4.html',
  'modern2': 'level2/phase4.html',
  'modern3': 'level2/phase4.html',
  'modern4': 'level2/phase4.html',
  'modern5': 'level2/phase4.html',
  'modern6': 'level2/phase4.html',
  'modern7': 'level2/phase4.html',
  'modern8': 'level2/phase4.html',
  'modern9': 'level2/phase4.html',
  'modern10': 'level2/phase4.html',

  // Level 3 - Phase 1: TypeScript基礎
  'ts1': 'level3/phase1.html',
  'ts2': 'level3/phase1.html',
  'ts3': 'level3/phase1.html',
  'ts4': 'level3/phase1.html',
  'ts5': 'level3/phase1.html',
  'ts6': 'level3/phase1.html',
  'ts7': 'level3/phase1.html',
  'ts8': 'level3/phase1.html',

  // Level 3 - Phase 2: React基礎
  'react1': 'level3/phase2.html',
  'react2': 'level3/phase2.html',
  'react3': 'level3/phase2.html',
  'react4': 'level3/phase2.html',
  'react5': 'level3/phase2.html',
  'react6': 'level3/phase2.html',
  'react7': 'level3/phase2.html',
  'react8': 'level3/phase2.html',

  // Level 3 - Phase 3: Hooks深掘り
  'hooks1': 'level3/phase3.html',
  'hooks2': 'level3/phase3.html',
  'hooks3': 'level3/phase3.html',
  'hooks4': 'level3/phase3.html',
  'hooks5': 'level3/phase3.html',
  'hooks6': 'level3/phase3.html',
  'hooks7': 'level3/phase3.html',
  'hooks8': 'level3/phase3.html',
  'hooks9': 'level3/phase3.html',

  // Level 3 - Phase 4: 実践パターン
  'advanced1': 'level3/phase4.html',
  'advanced2': 'level3/phase4.html',
  'advanced3': 'level3/phase4.html',
  'advanced4': 'level3/phase4.html',
  'advanced5': 'level3/phase4.html',
  'advanced6': 'level3/phase4.html',
  'advanced7': 'level3/phase4.html',
  'advanced8': 'level3/phase4.html',

  // Level 4 - Phase 1: Node.js基礎
  'node0': 'level4/phase1.html',
  'node1': 'level4/phase1.html',
  'node2': 'level4/phase1.html',
  'node3': 'level4/phase1.html',
  'node4': 'level4/phase1.html',
  'node5': 'level4/phase1.html',
  'node6': 'level4/phase1.html',
  'node7': 'level4/phase1.html',
  'node8': 'level4/phase1.html',

  // Level 4 - Phase 2: API設計
  'api1': 'level4/phase2.html',
  'api2': 'level4/phase2.html',
  'api3': 'level4/phase2.html',
  'api4': 'level4/phase2.html',
  'api5': 'level4/phase2.html',
  'api6': 'level4/phase2.html',
  'api7': 'level4/phase2.html',
  'api8': 'level4/phase2.html',

  // Level 4 - Phase 3: データベース
  'db1': 'level4/phase3.html',
  'db2': 'level4/phase3.html',
  'db3': 'level4/phase3.html',
  'db4': 'level4/phase3.html',
  'db5': 'level4/phase3.html',
  'db6': 'level4/phase3.html',
  'db7': 'level4/phase3.html',
  'db8': 'level4/phase3.html',
  'db9': 'level4/phase3.html',
  'db10': 'level4/phase3.html',
  'db11': 'level4/phase3.html',
  'db12': 'level4/phase3.html',
  'db13': 'level4/phase3.html',

  // Level 4 - Phase 4: 認証・セキュリティ
  'sec1': 'level4/phase4.html',
  'sec2': 'level4/phase4.html',
  'sec3': 'level4/phase4.html',
  'sec4': 'level4/phase4.html',
  'sec5': 'level4/phase4.html',
  'sec6': 'level4/phase4.html',
  'sec7': 'level4/phase4.html',
  'sec8': 'level4/phase4.html',
  'sec9': 'level4/phase4.html',
  'sec10': 'level4/phase4.html',
  'sec11': 'level4/phase4.html',
  'sec12': 'level4/phase4.html',

  // Level 4 - Phase 5: テスト・品質
  'test1': 'level4/phase5.html',
  'test2': 'level4/phase5.html',
  'test3': 'level4/phase5.html',
  'test4': 'level4/phase5.html',
  'test5': 'level4/phase5.html',
  'test6': 'level4/phase5.html',
  'test7': 'level4/phase5.html',
  'test8': 'level4/phase5.html',

  // Level 5 - Phase 1: Docker基礎
  'docker1': 'level5/phase1.html',
  'docker2': 'level5/phase1.html',
  'docker3': 'level5/phase1.html',
  'docker4': 'level5/phase1.html',
  'docker5': 'level5/phase1.html',
  'docker6': 'level5/phase1.html',
  'docker7': 'level5/phase1.html',
  'docker8': 'level5/phase1.html',
  'docker9': 'level5/phase1.html',
  'docker10': 'level5/phase1.html',

  // Level 5 - Phase 2: Kubernetes基礎
  'k8s1': 'level5/phase2.html',
  'k8s2': 'level5/phase2.html',
  'k8s3': 'level5/phase2.html',
  'k8s4': 'level5/phase2.html',
  'k8s5': 'level5/phase2.html',
  'k8s6': 'level5/phase2.html',
  'k8s7': 'level5/phase2.html',
  'k8s8': 'level5/phase2.html',
  'k8s9': 'level5/phase2.html',
  'k8s10': 'level5/phase2.html',

  // Level 5 - Phase 3: クラウド入門 AWS
  'aws1': 'level5/phase3.html',
  'aws2': 'level5/phase3.html',
  'aws3': 'level5/phase3.html',
  'aws4': 'level5/phase3.html',
  'aws5': 'level5/phase3.html',
  'aws6': 'level5/phase3.html',
  'aws7': 'level5/phase3.html',
  'aws8': 'level5/phase3.html',
  'aws9': 'level5/phase3.html',
  'aws10': 'level5/phase3.html',
  'aws11': 'level5/phase3.html',
  'aws12': 'level5/phase3.html',
  'aws13': 'level5/phase3.html',

  // Level 5 - Phase 4: Terraform
  'tf1': 'level5/phase4.html',
  'tf2': 'level5/phase4.html',
  'tf3': 'level5/phase4.html',
  'tf4': 'level5/phase4.html',
  'tf5': 'level5/phase4.html',
  'tf6': 'level5/phase4.html',
  'tf7': 'level5/phase4.html',
  'tf8': 'level5/phase4.html',
  'tf9': 'level5/phase4.html',
  'tf10': 'level5/phase4.html',

  // Level 5 - Phase 5: GitHub Actions
  'cicd1': 'level5/phase5.html',
  'cicd2': 'level5/phase5.html',
  'cicd3': 'level5/phase5.html',
  'cicd4': 'level5/phase5.html',
  'cicd5': 'level5/phase5.html',
  'cicd6': 'level5/phase5.html',
  'cicd7': 'level5/phase5.html',
  'cicd8': 'level5/phase5.html',

  // Level 5 - Phase 6: 可観測性
  'obs1': 'level5/phase6.html',
  'obs2': 'level5/phase6.html',
  'obs3': 'level5/phase6.html',
  'obs4': 'level5/phase6.html',
  'obs5': 'level5/phase6.html',
  'obs6': 'level5/phase6.html',
  'obs7': 'level5/phase6.html',
  'obs8': 'level5/phase6.html',
  'obs9': 'level5/phase6.html',
  'obs10': 'level5/phase6.html',
  'obs11': 'level5/phase6.html',

  // Level 6 - Phase 1: OOP基礎
  'oop1': 'level6/phase1.html',
  'oop2': 'level6/phase1.html',
  'oop3': 'level6/phase1.html',
  'oop4': 'level6/phase1.html',
  'oop5': 'level6/phase1.html',
  'oop6': 'level6/phase1.html',
  'oop7': 'level6/phase1.html',
  'oop8': 'level6/phase1.html',

  // Level 6 - Phase 2: SOLID原則
  'solid1': 'level6/phase2.html',
  'solid2': 'level6/phase2.html',
  'solid3': 'level6/phase2.html',
  'solid4': 'level6/phase2.html',
  'solid5': 'level6/phase2.html',
  'solid6': 'level6/phase2.html',
  'solid7': 'level6/phase2.html',
  'solid8': 'level6/phase2.html',
  'solid9': 'level6/phase2.html',
  'solid10': 'level6/phase2.html',

  // Level 6 - Phase 3: デザインパターン（生成・構造）
  'pattern1': 'level6/phase3.html',
  'pattern2': 'level6/phase3.html',
  'pattern3': 'level6/phase3.html',
  'pattern4': 'level6/phase3.html',
  'pattern5': 'level6/phase3.html',
  'pattern6': 'level6/phase3.html',
  'pattern7': 'level6/phase3.html',
  'pattern8': 'level6/phase3.html',
  'pattern9': 'level6/phase3.html',
  'pattern10': 'level6/phase3.html',

  // Level 6 - Phase 4: デザインパターン（振る舞い）
  'behavior1': 'level6/phase4.html',
  'behavior2': 'level6/phase4.html',
  'behavior3': 'level6/phase4.html',
  'behavior4': 'level6/phase4.html',
  'behavior5': 'level6/phase4.html',
  'behavior6': 'level6/phase4.html',
  'behavior7': 'level6/phase4.html',
  'behavior8': 'level6/phase4.html',
  'behavior9': 'level6/phase4.html',
  'behavior10': 'level6/phase4.html',

  // Level 6 - Phase 5: アーキテクチャ基礎
  'arch1': 'level6/phase5.html',
  'arch2': 'level6/phase5.html',
  'arch3': 'level6/phase5.html',
  'arch4': 'level6/phase5.html',
  'arch5': 'level6/phase5.html',
  'arch6': 'level6/phase5.html',
  'arch7': 'level6/phase5.html',
  'arch8': 'level6/phase5.html',
  'arch9': 'level6/phase5.html',
  'arch10': 'level6/phase5.html',
  'arch11': 'level6/phase5.html',
  'arch12': 'level6/phase5.html',

  // Level 6 - Phase 6: クリーン/ヘキサゴナル
  'clean1': 'level6/phase6.html',
  'clean2': 'level6/phase6.html',
  'clean3': 'level6/phase6.html',
  'clean4': 'level6/phase6.html',
  'clean5': 'level6/phase6.html',
  'clean6': 'level6/phase6.html',
  'clean7': 'level6/phase6.html',
  'clean8': 'level6/phase6.html',
  'clean9': 'level6/phase6.html',
  'clean10': 'level6/phase6.html',
  'clean11': 'level6/phase6.html',

  // Level 6 - Phase 7: DDD戦略的設計
  'ddd-s1': 'level6/phase7.html',
  'ddd-s2': 'level6/phase7.html',
  'ddd-s3': 'level6/phase7.html',
  'ddd-s4': 'level6/phase7.html',
  'ddd-s5': 'level6/phase7.html',
  'ddd-s6': 'level6/phase7.html',
  'ddd-s7': 'level6/phase7.html',
  'ddd-s8': 'level6/phase7.html',
  'ddd-s9': 'level6/phase7.html',
  'ddd-s10': 'level6/phase7.html',

  // Level 6 - Phase 8: DDD戦術的設計
  'ddd-t1': 'level6/phase8.html',
  'ddd-t2': 'level6/phase8.html',
  'ddd-t3': 'level6/phase8.html',
  'ddd-t4': 'level6/phase8.html',
  'ddd-t5': 'level6/phase8.html',
  'ddd-t6': 'level6/phase8.html',
  'ddd-t7': 'level6/phase8.html',
  'ddd-t8': 'level6/phase8.html',
  'ddd-t9': 'level6/phase8.html',
  'ddd-t10': 'level6/phase8.html',

  // Level 7 - Phase 1: データモデリング基礎
  'data1': 'level7/phase1.html',
  'data2': 'level7/phase1.html',
  'data3': 'level7/phase1.html',
  'data4': 'level7/phase1.html',
  'data5': 'level7/phase1.html',
  'data6': 'level7/phase1.html',
  'data7': 'level7/phase1.html',
  'data8': 'level7/phase1.html',
  'data9': 'level7/phase1.html',
  'data10': 'level7/phase1.html',

  // Level 7 - Phase 2: DB設計応用
  'dba1': 'level7/phase2.html',
  'dba2': 'level7/phase2.html',
  'dba3': 'level7/phase2.html',
  'dba4': 'level7/phase2.html',
  'dba5': 'level7/phase2.html',
  'dba6': 'level7/phase2.html',
  'dba7': 'level7/phase2.html',
  'dba8': 'level7/phase2.html',
  'dba9': 'level7/phase2.html',
  'dba10': 'level7/phase2.html',

  // Level 7 - Phase 3: クラウド基礎
  'cloud1': 'level7/phase3.html',
  'cloud2': 'level7/phase3.html',
  'cloud3': 'level7/phase3.html',
  'cloud4': 'level7/phase3.html',
  'cloud5': 'level7/phase3.html',
  'cloud6': 'level7/phase3.html',
  'cloud7': 'level7/phase3.html',
  'cloud8': 'level7/phase3.html',
  'cloud9': 'level7/phase3.html',
  'cloud10': 'level7/phase3.html',

  // Level 7 - Phase 4: クラウド応用
  'cloud-a1': 'level7/phase4.html',
  'cloud-a2': 'level7/phase4.html',
  'cloud-a3': 'level7/phase4.html',
  'cloud-a4': 'level7/phase4.html',
  'cloud-a5': 'level7/phase4.html',
  'cloud-a6': 'level7/phase4.html',
  'cloud-a7': 'level7/phase4.html',
  'cloud-a8': 'level7/phase4.html',
  'cloud-a9': 'level7/phase4.html',
  'cloud-a10': 'level7/phase4.html',

  // Level 7 - Phase 5: 要件定義
  'req1': 'level7/phase5.html',
  'req2': 'level7/phase5.html',
  'req3': 'level7/phase5.html',
  'req4': 'level7/phase5.html',
  'req5': 'level7/phase5.html',
  'req6': 'level7/phase5.html',
  'req7': 'level7/phase5.html',
  'req8': 'level7/phase5.html',
  'req9': 'level7/phase5.html',
  'req10': 'level7/phase5.html',

  // Level 7 - Phase 6: 非機能要件
  'nfr1': 'level7/phase6.html',
  'nfr2': 'level7/phase6.html',
  'nfr3': 'level7/phase6.html',
  'nfr4': 'level7/phase6.html',
  'nfr5': 'level7/phase6.html',
  'nfr6': 'level7/phase6.html',
  'nfr7': 'level7/phase6.html',
  'nfr8': 'level7/phase6.html',
  'nfr9': 'level7/phase6.html',
  'nfr10': 'level7/phase6.html',

  // Level 7 - Phase 7: AI基礎
  'ai1': 'level7/phase7.html',
  'ai2': 'level7/phase7.html',
  'ai3': 'level7/phase7.html',
  'ai4': 'level7/phase7.html',
  'ai5': 'level7/phase7.html',
  'ai6': 'level7/phase7.html',
  'ai7': 'level7/phase7.html',
  'ai8': 'level7/phase7.html',
  'ai9': 'level7/phase7.html',
  'ai10': 'level7/phase7.html',

  // Level 7 - Phase 8: AI応用
  'ai-a1': 'level7/phase8.html',
  'ai-a2': 'level7/phase8.html',
  'ai-a3': 'level7/phase8.html',
  'ai-a4': 'level7/phase8.html',
  'ai-a5': 'level7/phase8.html',
  'ai-a6': 'level7/phase8.html',
  'ai-a7': 'level7/phase8.html',
  'ai-a8': 'level7/phase8.html',
  'ai-a9': 'level7/phase8.html',
  'ai-a10': 'level7/phase8.html',

  // Level 8 - Phase 1: テスト基礎・マインドセット
  'testing1': 'level8/phase1.html',
  'testing2': 'level8/phase1.html',
  'testing3': 'level8/phase1.html',
  'testing4': 'level8/phase1.html',
  'testing5': 'level8/phase1.html',
  'testing6': 'level8/phase1.html',
  'testing7': 'level8/phase1.html',
  'testing8': 'level8/phase1.html',
  'testing9': 'level8/phase1.html',
  'testing10': 'level8/phase1.html',

  // Level 8 - Phase 2: 単体テスト
  'unit1': 'level8/phase2.html',
  'unit2': 'level8/phase2.html',
  'unit3': 'level8/phase2.html',
  'unit4': 'level8/phase2.html',
  'unit5': 'level8/phase2.html',
  'unit6': 'level8/phase2.html',
  'unit7': 'level8/phase2.html',
  'unit8': 'level8/phase2.html',
  'unit9': 'level8/phase2.html',
  'unit10': 'level8/phase2.html',

  // Level 8 - Phase 3: 結合テスト・APIテスト
  'int1': 'level8/phase3.html',
  'int2': 'level8/phase3.html',
  'int3': 'level8/phase3.html',
  'int4': 'level8/phase3.html',
  'int5': 'level8/phase3.html',
  'int6': 'level8/phase3.html',
  'int7': 'level8/phase3.html',
  'int8': 'level8/phase3.html',
  'int9': 'level8/phase3.html',
  'int10': 'level8/phase3.html',

  // Level 8 - Phase 4: E2Eテスト
  'e2e1': 'level8/phase4.html',
  'e2e2': 'level8/phase4.html',
  'e2e3': 'level8/phase4.html',
  'e2e4': 'level8/phase4.html',
  'e2e5': 'level8/phase4.html',
  'e2e6': 'level8/phase4.html',
  'e2e7': 'level8/phase4.html',
  'e2e8': 'level8/phase4.html',
  'e2e9': 'level8/phase4.html',
  'e2e10': 'level8/phase4.html',

  // Level 8 - Phase 5: テスト設計技法
  'tech1': 'level8/phase5.html',
  'tech2': 'level8/phase5.html',
  'tech3': 'level8/phase5.html',
  'tech4': 'level8/phase5.html',
  'tech5': 'level8/phase5.html',
  'tech6': 'level8/phase5.html',
  'tech7': 'level8/phase5.html',
  'tech8': 'level8/phase5.html',
  'tech9': 'level8/phase5.html',
  'tech10': 'level8/phase5.html',

  // Level 8 - Phase 6: TDD/BDD
  'tdd1': 'level8/phase6.html',
  'tdd2': 'level8/phase6.html',
  'tdd3': 'level8/phase6.html',
  'tdd4': 'level8/phase6.html',
  'tdd5': 'level8/phase6.html',
  'tdd6': 'level8/phase6.html',
  'tdd7': 'level8/phase6.html',
  'tdd8': 'level8/phase6.html',
  'tdd9': 'level8/phase6.html',
  'tdd10': 'level8/phase6.html',

  // Level 8 - Phase 7: CI/CDとテスト自動化
  'ci1': 'level8/phase7.html',
  'ci2': 'level8/phase7.html',
  'ci3': 'level8/phase7.html',
  'ci4': 'level8/phase7.html',
  'ci5': 'level8/phase7.html',
  'ci6': 'level8/phase7.html',
  'ci7': 'level8/phase7.html',
  'ci8': 'level8/phase7.html',
  'ci9': 'level8/phase7.html',
  'ci10': 'level8/phase7.html',
  'ci11': 'level8/phase7.html',

  // Level 8 - Phase 8: 品質保証・品質管理
  'qa1': 'level8/phase8.html',
  'qa2': 'level8/phase8.html',
  'qa3': 'level8/phase8.html',
  'qa4': 'level8/phase8.html',
  'qa5': 'level8/phase8.html',
  'qa6': 'level8/phase8.html',
  'qa7': 'level8/phase8.html',
  'qa8': 'level8/phase8.html',
  'qa9': 'level8/phase8.html',
  'qa10': 'level8/phase8.html',
  'qa11': 'level8/phase8.html',
  'qa12': 'level8/phase8.html',

  // Level 9 - Phase 1: アジャイル開発
  'agile1': 'level9/phase1.html',
  'agile2': 'level9/phase1.html',
  'agile3': 'level9/phase1.html',
  'agile4': 'level9/phase1.html',
  'agile5': 'level9/phase1.html',
  'agile6': 'level9/phase1.html',
  'agile7': 'level9/phase1.html',
  'agile8': 'level9/phase1.html',
  'agile9': 'level9/phase1.html',
  'agile10': 'level9/phase1.html',

  // Level 9 - Phase 2: Git運用とコードレビュー
  'gitrev1': 'level9/phase2.html',
  'gitrev2': 'level9/phase2.html',
  'gitrev3': 'level9/phase2.html',
  'gitrev4': 'level9/phase2.html',
  'gitrev5': 'level9/phase2.html',
  'gitrev6': 'level9/phase2.html',
  'gitrev7': 'level9/phase2.html',
  'gitrev8': 'level9/phase2.html',
  'gitrev9': 'level9/phase2.html',
  'gitrev10': 'level9/phase2.html',

  // Level 9 - Phase 3: チームコミュニケーション
  'comm1': 'level9/phase3.html',
  'comm2': 'level9/phase3.html',
  'comm3': 'level9/phase3.html',
  'comm4': 'level9/phase3.html',
  'comm5': 'level9/phase3.html',
  'comm6': 'level9/phase3.html',
  'comm7': 'level9/phase3.html',
  'comm8': 'level9/phase3.html',
  'comm9': 'level9/phase3.html',
  'comm10': 'level9/phase3.html',

  // Level 9 - Phase 4: プロジェクト管理
  'proj1': 'level9/phase4.html',
  'proj2': 'level9/phase4.html',
  'proj3': 'level9/phase4.html',
  'proj4': 'level9/phase4.html',
  'proj5': 'level9/phase4.html',
  'proj6': 'level9/phase4.html',
  'proj7': 'level9/phase4.html',
  'proj8': 'level9/phase4.html',
  'proj9': 'level9/phase4.html',
  'proj10': 'level9/phase4.html',

  // Level 9 - Phase 5: SRE/インシデント管理
  'sre1': 'level9/phase5.html',
  'sre2': 'level9/phase5.html',
  'sre3': 'level9/phase5.html',
  'sre4': 'level9/phase5.html',
  'sre5': 'level9/phase5.html',
  'sre6': 'level9/phase5.html',
  'sre7': 'level9/phase5.html',
  'sre8': 'level9/phase5.html',
  'sre9': 'level9/phase5.html',
  'sre10': 'level9/phase5.html',

  // Level 9 - Phase 6: オブザーバビリティ応用
  'obs9-1': 'level9/phase6.html',
  'obs9-2': 'level9/phase6.html',
  'obs9-3': 'level9/phase6.html',
  'obs9-4': 'level9/phase6.html',
  'obs9-5': 'level9/phase6.html',
  'obs9-6': 'level9/phase6.html',
  'obs9-7': 'level9/phase6.html',
  'obs9-8': 'level9/phase6.html',
  'obs9-9': 'level9/phase6.html',
  'obs9-10': 'level9/phase6.html',

  // Level 9 - Phase 7: テックリーダーシップ
  'lead1': 'level9/phase7.html',
  'lead2': 'level9/phase7.html',
  'lead3': 'level9/phase7.html',
  'lead4': 'level9/phase7.html',
  'lead5': 'level9/phase7.html',
  'lead6': 'level9/phase7.html',
  'lead7': 'level9/phase7.html',
  'lead8': 'level9/phase7.html',
  'lead9': 'level9/phase7.html',
  'lead10': 'level9/phase7.html',

  // Level 9 - Phase 8: キャリア・組織文化
  'career1': 'level9/phase8.html',
  'career2': 'level9/phase8.html',
  'career3': 'level9/phase8.html',
  'career4': 'level9/phase8.html',
  'career5': 'level9/phase8.html',
  'career6': 'level9/phase8.html',
  'career7': 'level9/phase8.html',
  'career8': 'level9/phase8.html',
  'career9': 'level9/phase8.html',
  'career10': 'level9/phase8.html',

  // 実践問題集 - Tier 1: 入門（HTML/CSS）
  'ex-t1-1': 'exercises/tier1-intro.html',
  'ex-t1-2': 'exercises/tier1-intro.html',
  'ex-t1-3': 'exercises/tier1-intro.html',
  'ex-t1-4': 'exercises/tier1-intro.html',
  'ex-t1-5': 'exercises/tier1-intro.html',
  'ex-t1-6': 'exercises/tier1-intro.html',
  'ex-t1-7': 'exercises/tier1-intro.html',
  'ex-t1-8': 'exercises/tier1-intro.html',
  'ex-t1-9': 'exercises/tier1-intro.html',
  'ex-t1-10': 'exercises/tier1-intro.html',
  'ex-t1-11': 'exercises/tier1-intro.html',
  'ex-t1-12': 'exercises/tier1-intro.html',
  'ex-t1-13': 'exercises/tier1-intro.html',
  'ex-t1-14': 'exercises/tier1-intro.html',
  'ex-t1-15': 'exercises/tier1-intro.html',
  'ex-t1-16': 'exercises/tier1-intro.html',
  'ex-t1-17': 'exercises/tier1-intro.html',

  // 実践問題集 - Tier 2: 基礎（JavaScript）
  'ex-t2-1': 'exercises/tier2-basic.html',
  'ex-t2-2': 'exercises/tier2-basic.html',
  'ex-t2-3': 'exercises/tier2-basic.html',
  'ex-t2-4': 'exercises/tier2-basic.html',
  'ex-t2-5': 'exercises/tier2-basic.html',
  'ex-t2-6': 'exercises/tier2-basic.html',
  'ex-t2-7': 'exercises/tier2-basic.html',
  'ex-t2-8': 'exercises/tier2-basic.html',
  'ex-t2-9': 'exercises/tier2-basic.html',
  'ex-t2-10': 'exercises/tier2-basic.html',
  'ex-t2-11': 'exercises/tier2-basic.html',
  'ex-t2-12': 'exercises/tier2-basic.html',
  'ex-t2-13': 'exercises/tier2-basic.html',
  'ex-t2-14': 'exercises/tier2-basic.html',
  'ex-t2-15': 'exercises/tier2-basic.html',
  'ex-t2-16': 'exercises/tier2-basic.html',
  'ex-t2-17': 'exercises/tier2-basic.html',

  // 実践問題集 - Tier 3: 応用基礎（非同期/TS）
  'ex-t3-1': 'exercises/tier3-applied.html',
  'ex-t3-2': 'exercises/tier3-applied.html',
  'ex-t3-3': 'exercises/tier3-applied.html',
  'ex-t3-4': 'exercises/tier3-applied.html',
  'ex-t3-5': 'exercises/tier3-applied.html',
  'ex-t3-6': 'exercises/tier3-applied.html',
  'ex-t3-7': 'exercises/tier3-applied.html',
  'ex-t3-8': 'exercises/tier3-applied.html',
  'ex-t3-9': 'exercises/tier3-applied.html',
  'ex-t3-10': 'exercises/tier3-applied.html',
  'ex-t3-11': 'exercises/tier3-applied.html',
  'ex-t3-12': 'exercises/tier3-applied.html',
  'ex-t3-13': 'exercises/tier3-applied.html',
  'ex-t3-14': 'exercises/tier3-applied.html',
  'ex-t3-15': 'exercises/tier3-applied.html',
  'ex-t3-16': 'exercises/tier3-applied.html',
  'ex-t3-17': 'exercises/tier3-applied.html',

  // 実践問題集 - Tier 4: 実践初級（React）
  'ex-t4-1': 'exercises/tier4-frontend.html',
  'ex-t4-2': 'exercises/tier4-frontend.html',
  'ex-t4-3': 'exercises/tier4-frontend.html',
  'ex-t4-4': 'exercises/tier4-frontend.html',
  'ex-t4-5': 'exercises/tier4-frontend.html',
  'ex-t4-6': 'exercises/tier4-frontend.html',
  'ex-t4-7': 'exercises/tier4-frontend.html',
  'ex-t4-8': 'exercises/tier4-frontend.html',
  'ex-t4-9': 'exercises/tier4-frontend.html',
  'ex-t4-10': 'exercises/tier4-frontend.html',
  'ex-t4-11': 'exercises/tier4-frontend.html',
  'ex-t4-12': 'exercises/tier4-frontend.html',
  'ex-t4-13': 'exercises/tier4-frontend.html',
  'ex-t4-14': 'exercises/tier4-frontend.html',
  'ex-t4-15': 'exercises/tier4-frontend.html',
  'ex-t4-16': 'exercises/tier4-frontend.html',
  'ex-t4-17': 'exercises/tier4-frontend.html',

  // 実践問題集 - Tier 5: 実践中級（API/DB/セキュリティ）
  'ex-t5-1': 'exercises/tier5-backend.html',
  'ex-t5-2': 'exercises/tier5-backend.html',
  'ex-t5-3': 'exercises/tier5-backend.html',
  'ex-t5-4': 'exercises/tier5-backend.html',
  'ex-t5-5': 'exercises/tier5-backend.html',
  'ex-t5-6': 'exercises/tier5-backend.html',
  'ex-t5-7': 'exercises/tier5-backend.html',
  'ex-t5-8': 'exercises/tier5-backend.html',
  'ex-t5-9': 'exercises/tier5-backend.html',
  'ex-t5-10': 'exercises/tier5-backend.html',
  'ex-t5-11': 'exercises/tier5-backend.html',
  'ex-t5-12': 'exercises/tier5-backend.html',
  'ex-t5-13': 'exercises/tier5-backend.html',
  'ex-t5-14': 'exercises/tier5-backend.html',
  'ex-t5-15': 'exercises/tier5-backend.html',
  'ex-t5-16': 'exercises/tier5-backend.html',
  'ex-t5-17': 'exercises/tier5-backend.html',
  'ex-t5-18': 'exercises/tier5-backend.html',

  // 実践問題集 - Tier 6: 実践上級（インフラ）
  'ex-t6-1': 'exercises/tier6-infra.html',
  'ex-t6-2': 'exercises/tier6-infra.html',
  'ex-t6-3': 'exercises/tier6-infra.html',
  'ex-t6-4': 'exercises/tier6-infra.html',
  'ex-t6-5': 'exercises/tier6-infra.html',
  'ex-t6-6': 'exercises/tier6-infra.html',
  'ex-t6-7': 'exercises/tier6-infra.html',
  'ex-t6-8': 'exercises/tier6-infra.html',
  'ex-t6-9': 'exercises/tier6-infra.html',
  'ex-t6-10': 'exercises/tier6-infra.html',
  'ex-t6-11': 'exercises/tier6-infra.html',
  'ex-t6-12': 'exercises/tier6-infra.html',
  'ex-t6-13': 'exercises/tier6-infra.html',
  'ex-t6-14': 'exercises/tier6-infra.html',
  'ex-t6-15': 'exercises/tier6-infra.html',
  'ex-t6-16': 'exercises/tier6-infra.html',
  'ex-t6-17': 'exercises/tier6-infra.html',
  'ex-t6-18': 'exercises/tier6-infra.html',

  // 実践問題集 - Tier 7: 設計（SOLID/パターン/アーキテクチャ）
  'ex-t7-1': 'exercises/tier7-design.html',
  'ex-t7-2': 'exercises/tier7-design.html',
  'ex-t7-3': 'exercises/tier7-design.html',
  'ex-t7-4': 'exercises/tier7-design.html',
  'ex-t7-5': 'exercises/tier7-design.html',
  'ex-t7-6': 'exercises/tier7-design.html',
  'ex-t7-7': 'exercises/tier7-design.html',
  'ex-t7-8': 'exercises/tier7-design.html',
  'ex-t7-9': 'exercises/tier7-design.html',
  'ex-t7-10': 'exercises/tier7-design.html',
  'ex-t7-11': 'exercises/tier7-design.html',
  'ex-t7-12': 'exercises/tier7-design.html',
  'ex-t7-13': 'exercises/tier7-design.html',
  'ex-t7-14': 'exercises/tier7-design.html',
  'ex-t7-15': 'exercises/tier7-design.html',
  'ex-t7-16': 'exercises/tier7-design.html',
  'ex-t7-17': 'exercises/tier7-design.html',
  'ex-t7-18': 'exercises/tier7-design.html',

  // 実践問題集 - Tier 8: シニア（DDD/総合）
  'ex-t8-1': 'exercises/tier8-senior.html',
  'ex-t8-2': 'exercises/tier8-senior.html',
  'ex-t8-3': 'exercises/tier8-senior.html',
  'ex-t8-4': 'exercises/tier8-senior.html',
  'ex-t8-5': 'exercises/tier8-senior.html',
  'ex-t8-6': 'exercises/tier8-senior.html',
  'ex-t8-7': 'exercises/tier8-senior.html',
  'ex-t8-8': 'exercises/tier8-senior.html',
  'ex-t8-9': 'exercises/tier8-senior.html',
  'ex-t8-10': 'exercises/tier8-senior.html',
  'ex-t8-11': 'exercises/tier8-senior.html',
  'ex-t8-12': 'exercises/tier8-senior.html',
  'ex-t8-13': 'exercises/tier8-senior.html',
  'ex-t8-14': 'exercises/tier8-senior.html',
  'ex-t8-15': 'exercises/tier8-senior.html',
  'ex-t8-16': 'exercises/tier8-senior.html',
  'ex-t8-17': 'exercises/tier8-senior.html',
  'ex-t8-18': 'exercises/tier8-senior.html',

  // 実践問題集 - AI生成コードの罠
  'ex-ai-1': 'exercises/ai-mistakes.html',
  'ex-ai-2': 'exercises/ai-mistakes.html',
  'ex-ai-3': 'exercises/ai-mistakes.html',
  'ex-ai-4': 'exercises/ai-mistakes.html',
  'ex-ai-5': 'exercises/ai-mistakes.html',
  'ex-ai-6': 'exercises/ai-mistakes.html',
  'ex-ai-7': 'exercises/ai-mistakes.html',
  'ex-ai-8': 'exercises/ai-mistakes.html',
  'ex-ai-9': 'exercises/ai-mistakes.html',
  'ex-ai-10': 'exercises/ai-mistakes.html',
  'ex-ai-11': 'exercises/ai-mistakes.html',
  'ex-ai-12': 'exercises/ai-mistakes.html',
  'ex-ai-13': 'exercises/ai-mistakes.html',
  'ex-ai-14': 'exercises/ai-mistakes.html',
  'ex-ai-15': 'exercises/ai-mistakes.html',
  'ex-ai-16': 'exercises/ai-mistakes.html',
  'ex-ai-17': 'exercises/ai-mistakes.html',

  // 実践問題集 - Tier 9: SRE/チーム開発
  'ex-t9-1': 'exercises/tier9-sre.html',
  'ex-t9-2': 'exercises/tier9-sre.html',
  'ex-t9-3': 'exercises/tier9-sre.html',
  'ex-t9-4': 'exercises/tier9-sre.html',
  'ex-t9-5': 'exercises/tier9-sre.html',
  'ex-t9-6': 'exercises/tier9-sre.html',
  'ex-t9-7': 'exercises/tier9-sre.html',
  'ex-t9-8': 'exercises/tier9-sre.html',
  'ex-t9-9': 'exercises/tier9-sre.html',
  'ex-t9-10': 'exercises/tier9-sre.html',
  'ex-t9-11': 'exercises/tier9-sre.html',
  'ex-t9-12': 'exercises/tier9-sre.html',
  'ex-t9-13': 'exercises/tier9-sre.html',
  'ex-t9-14': 'exercises/tier9-sre.html',
  'ex-t9-15': 'exercises/tier9-sre.html'
};

// 読み込み済みファイルを追跡
const loadedFiles = new Set();

// ============================================
// ダークモード切り替え
// ============================================
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeUI(newTheme);
}

function updateThemeUI(theme) {
  const icon = document.getElementById('theme-icon');
  const text = document.getElementById('theme-text');
  if (theme === 'dark') {
    icon.textContent = '☀️';
    text.textContent = 'ライトモード';
  } else {
    icon.textContent = '🌙';
    text.textContent = 'ダークモード';
  }
}

// 保存されたテーマを適用
(function() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  // DOMContentLoadedを待ってUI更新
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => updateThemeUI(savedTheme));
  } else {
    updateThemeUI(savedTheme);
  }
})();

// ============================================
// ナビゲーション アコーディオン
// ============================================
function toggleAccordion(id) {
  const accordion = document.querySelector(`[data-accordion="${id}"]`);
  if (!accordion) return;

  const header = accordion.querySelector('.nav-accordion-header');
  const content = accordion.querySelector('.nav-accordion-content');
  if (!header || !content) return;
  if (header.classList.contains('disabled')) return;

  const isOpen = header.classList.toggle('open');
  content.classList.toggle('open', isOpen);

  // 状態を保存
  const states = JSON.parse(localStorage.getItem('accordionStates') || '{}');
  states[id] = isOpen;
  localStorage.setItem('accordionStates', JSON.stringify(states));
}

// 保存された折りたたみ状態を適用
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const states = JSON.parse(localStorage.getItem('accordionStates') || '{}');
    Object.keys(states).forEach(id => {
      const accordion = document.querySelector(`[data-accordion="${id}"]`);
      if (!accordion) return;
      const header = accordion.querySelector('.nav-accordion-header');
      const content = accordion.querySelector('.nav-accordion-content');
      if (!header || !content) return;

      if (states[id]) {
        header.classList.add('open');
        content.classList.add('open');
      } else {
        header.classList.remove('open');
        content.classList.remove('open');
      }
    });
  });
})();

// ============================================
// 動的コンテンツ読み込み
// ============================================
async function loadSection(sectionId) {
  // ダッシュボードの場合は読み込み不要
  if (sectionId === 'dashboard') {
    showSection(sectionId);
    return;
  }

  const file = sectionMapping[sectionId];
  if (!file) {
    console.warn(`Unknown section: ${sectionId}`);
    return;
  }

  const container = document.getElementById('content-container');

  // ファイルがまだ読み込まれていなければfetch
  if (!loadedFiles.has(file)) {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();

      // 一時的なdivを作成してHTMLをパース
      const temp = document.createElement('div');
      temp.innerHTML = html;

      // 各sectionをcontainerに追加
      const sections = temp.querySelectorAll('section');
      sections.forEach(section => {
        container.appendChild(section);
      });

      loadedFiles.add(file);

      // 新しく読み込まれたセクションのクイズ機能を初期化
      initializeQuizzes(container);

      // 完了状態を適用
      applyCompletedStates();

    } catch (error) {
      console.error(`Failed to load ${file}:`, error);
      return;
    }
  }

  // 該当セクションを表示
  showSection(sectionId);
}

// ============================================
// クイズの初期化（動的読み込み用）
// ============================================
function initializeQuizzes(container) {
  // 選択時のスタイル更新
  container.querySelectorAll('.quiz-option input[type="radio"]').forEach(input => {
    if (input.dataset.initialized) return;
    input.dataset.initialized = 'true';

    input.addEventListener('change', () => {
      const quizContainer = input.closest('.quiz');
      quizContainer.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      input.closest('.quiz-option').classList.add('selected');
    });
  });
}

// ============================================
// ハンバーガーメニュー制御
// ============================================
function toggleMobileNav() {
  const btn = document.getElementById('hamburger-btn');
  const nav = document.getElementById('main-nav');
  const overlay = document.getElementById('nav-overlay');
  if (!btn || !nav || !overlay) return;

  const isOpen = nav.classList.toggle('open');
  btn.classList.toggle('active', isOpen);
  overlay.classList.toggle('active', isOpen);
  btn.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileNav() {
  const btn = document.getElementById('hamburger-btn');
  const nav = document.getElementById('main-nav');
  const overlay = document.getElementById('nav-overlay');
  if (!btn || !nav || !overlay) return;

  nav.classList.remove('open');
  btn.classList.remove('active');
  overlay.classList.remove('active');
  btn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// ============================================
// ナビゲーション制御
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // ハンバーガーボタン
  const hamburgerBtn = document.getElementById('hamburger-btn');
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileNav);
  }

  // オーバーレイクリックで閉じる
  const navOverlay = document.getElementById('nav-overlay');
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileNav);
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.dataset.section;
      loadSection(sectionId);
      // モバイルではナビを閉じる
      closeMobileNav();
    });
  });

  // タイトルクリックでダッシュボードに戻る
  const navTitle = document.querySelector('.nav-title');
  if (navTitle) {
    navTitle.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('dashboard');
      closeMobileNav();
    });
  }
});

function showSection(sectionId) {
  // すべてのセクションを非表示
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  // 指定セクションを表示
  const section = document.getElementById(sectionId);
  if (section) section.classList.add('active');

  // ナビゲーションのアクティブ状態更新
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
  if (activeLink) activeLink.classList.add('active');

  // URLハッシュ更新
  history.pushState(null, '', `#${sectionId}`);

  // ページトップにスクロール
  window.scrollTo(0, 0);

  // ダッシュボード表示時は進捗を更新
  if (sectionId === 'dashboard') {
    updateProgress();
  }
}

// 初期表示
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.slice(1);
  if (hash && hash !== 'dashboard') {
    loadSection(hash);
  }
});

// ============================================
// クイズ機能
// ============================================
function checkQuiz(quizId) {
  const quiz = document.getElementById(quizId);
  const options = quiz.querySelectorAll('.quiz-option');
  const feedback = quiz.querySelector('.quiz-feedback');
  let answered = false;
  let correct = false;
  let explanation = '';

  // 正解の選択肢から解説を取得
  const correctOption = quiz.querySelector('.quiz-option[data-correct="true"]');
  if (correctOption && correctOption.dataset.explanation) {
    explanation = correctOption.dataset.explanation;
  }

  options.forEach(opt => {
    const input = opt.querySelector('input');
    if (input.checked) {
      answered = true;
      correct = opt.dataset.correct === 'true';
      opt.classList.add(correct ? 'correct' : 'incorrect');
    }
  });

  if (!answered) {
    alert('選択肢を選んでください');
    return;
  }

  feedback.classList.add('show');
  if (correct) {
    feedback.classList.add('correct');
    feedback.classList.remove('incorrect');
    feedback.innerHTML = '<strong>正解！</strong>' + (explanation ? '<br><span style="font-weight:normal;">' + explanation + '</span>' : ' その通りです。');
  } else {
    feedback.classList.add('incorrect');
    feedback.classList.remove('correct');
    feedback.innerHTML = '<strong>不正解...</strong>' + (explanation ? '<br><span style="font-weight:normal;">正解の理由: ' + explanation + '</span>' : ' もう一度考えてみましょう。');
  }
}

// ============================================
// 完了機能
// ============================================
function getNextSectionId(currentId) {
  const allSections = Object.keys(sectionMapping);
  const currentIndex = allSections.indexOf(currentId);
  if (currentIndex === -1 || currentIndex >= allSections.length - 1) return null;
  return allSections[currentIndex + 1];
}

function getNextSectionLabel(sectionId) {
  const link = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
  return link ? link.textContent.trim() : sectionId;
}

function completeSection(sectionId) {
  // ローカルストレージに保存
  const completed = JSON.parse(localStorage.getItem('completedSections') || '[]');
  if (!completed.includes(sectionId)) {
    completed.push(sectionId);
    localStorage.setItem('completedSections', JSON.stringify(completed));
  }

  // ナビリンクに完了マークを付ける
  const link = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
  if (link) link.classList.add('completed');

  // ボタンを無効化
  const btn = document.querySelector(`#${CSS.escape(sectionId)} .complete-btn`);
  if (btn) {
    btn.classList.add('completed');
    btn.disabled = true;
    btn.innerHTML = '<span class="icon">✓</span> 完了済み';
  }

  // 「次のページへ」ボタンを表示
  showNextPageButton(sectionId);

  // 次のページボタンが見えるようにスクロール
  const nextWrapper = document.querySelector(`#${CSS.escape(sectionId)} .next-page-wrapper`);
  if (nextWrapper) {
    requestAnimationFrame(() => {
      nextWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // 進捗更新
  updateProgress();
}

function showNextPageButton(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  // 既に表示済みなら何もしない
  if (section.querySelector('.next-page-btn')) return;

  const nextId = getNextSectionId(sectionId);
  if (!nextId) return;

  const nextLabel = getNextSectionLabel(nextId);
  const wrapper = document.createElement('div');
  wrapper.className = 'next-page-wrapper';
  wrapper.innerHTML =
    '<button class="next-page-btn" onclick="loadSection(\'' + nextId + '\')">' +
    '<span>次のページへ: ' + nextLabel + '</span>' +
    '<span class="next-page-arrow">→</span>' +
    '</button>';
  section.appendChild(wrapper);
}

function applyCompletedStates() {
  const completed = JSON.parse(localStorage.getItem('completedSections') || '[]');
  completed.forEach(sectionId => {
    const link = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (link) link.classList.add('completed');

    const btn = document.querySelector(`#${CSS.escape(sectionId)} .complete-btn`);
    if (btn) {
      btn.classList.add('completed');
      btn.disabled = true;
      btn.innerHTML = '<span class="icon">✓</span> 完了済み';
    }

    // 完了済みセクションに「次のページへ」ボタンを表示
    showNextPageButton(sectionId);
  });
}

function updateProgress() {
  const completed = JSON.parse(localStorage.getItem('completedSections') || '[]');

  // Level 0
  const level0Sections = ['l0-1','l0-2','l0-3','l0-4','l0-5','l0-6','l0-7','l0-8'];
  const level0Count = completed.filter(s => level0Sections.includes(s)).length;
  const level0Progress = document.getElementById('level0-progress');
  if (level0Progress) level0Progress.value = level0Count;
  updateProgressText('level0', level0Count, level0Sections.length);

  // Level 1
  const level1Sections = ['html1','html2','html3','html4','html5','html6','html7','html8',
                          'css1','css2','css3','css4','css5','css6','css7','css8',
                          'prac1','prac2','prac3','prac4','prac5'];
  const level1Count = completed.filter(s => level1Sections.includes(s)).length;
  const level1Progress = document.getElementById('level1-progress');
  if (level1Progress) level1Progress.value = level1Count;
  updateProgressText('level1', level1Count, level1Sections.length);

  // Level 2
  const level2Sections = ['js1','js2','js3','js4','js5','js6','js7','js8','js9',
                          'dom1','dom2','dom3','dom4','dom5','dom6',
                          'async1','async2','async3','async4','async5','async6','async7','async8','async9',
                          'modern1','modern2','modern3','modern4','modern5','modern6','modern7','modern8','modern9','modern10'];
  const level2Count = completed.filter(s => level2Sections.includes(s)).length;
  const level2Progress = document.getElementById('level2-progress');
  if (level2Progress) level2Progress.value = level2Count;
  updateProgressText('level2', level2Count, level2Sections.length);

  // Level 3
  const level3Sections = ['ts1','ts2','ts3','ts4','ts5','ts6','ts7','ts8',
                          'react1','react2','react3','react4','react5','react6','react7','react8',
                          'hooks1','hooks2','hooks3','hooks4','hooks5','hooks6','hooks7','hooks8','hooks9',
                          'advanced1','advanced2','advanced3','advanced4','advanced5','advanced6','advanced7','advanced8'];
  const level3Count = completed.filter(s => level3Sections.includes(s)).length;
  const level3Progress = document.getElementById('level3-progress');
  if (level3Progress) level3Progress.value = level3Count;
  updateProgressText('level3', level3Count, level3Sections.length);

  // Level 4
  const level4Sections = ['node0','node1','node2','node3','node4','node5','node6','node7','node8',
                          'api1','api2','api3','api4','api5','api6','api7','api8',
                          'db1','db2','db3','db4','db5','db6','db7','db8','db9','db10','db11','db12','db13',
                          'sec1','sec2','sec3','sec4','sec5','sec6','sec7','sec8','sec9','sec10','sec11','sec12',
                          'test1','test2','test3','test4','test5','test6','test7','test8'];
  const level4Count = completed.filter(s => level4Sections.includes(s)).length;
  const level4Progress = document.getElementById('level4-progress');
  if (level4Progress) level4Progress.value = level4Count;
  updateProgressText('level4', level4Count, level4Sections.length);

  // Level 5
  const level5Sections = ['docker1','docker2','docker3','docker4','docker5','docker6','docker7','docker8','docker9','docker10',
                          'k8s1','k8s2','k8s3','k8s4','k8s5','k8s6','k8s7','k8s8','k8s9','k8s10',
                          'aws1','aws2','aws3','aws4','aws5','aws6','aws7','aws8','aws9','aws10','aws11','aws12','aws13',
                          'tf1','tf2','tf3','tf4','tf5','tf6','tf7','tf8','tf9','tf10',
                          'cicd1','cicd2','cicd3','cicd4','cicd5','cicd6','cicd7','cicd8',
                          'obs1','obs2','obs3','obs4','obs5','obs6','obs7','obs8','obs9','obs10','obs11'];
  const level5Count = completed.filter(s => level5Sections.includes(s)).length;
  const level5Progress = document.getElementById('level5-progress');
  if (level5Progress) level5Progress.value = level5Count;
  updateProgressText('level5', level5Count, level5Sections.length);

  // Level 6
  const level6Sections = [
    'oop1','oop2','oop3','oop4','oop5','oop6','oop7','oop8',
    'solid1','solid2','solid3','solid4','solid5','solid6','solid7','solid8','solid9','solid10',
    'pattern1','pattern2','pattern3','pattern4','pattern5','pattern6','pattern7','pattern8','pattern9','pattern10',
    'behavior1','behavior2','behavior3','behavior4','behavior5','behavior6','behavior7','behavior8','behavior9','behavior10',
    'arch1','arch2','arch3','arch4','arch5','arch6','arch7','arch8','arch9','arch10','arch11','arch12',
    'clean1','clean2','clean3','clean4','clean5','clean6','clean7','clean8','clean9','clean10','clean11',
    'ddd-s1','ddd-s2','ddd-s3','ddd-s4','ddd-s5','ddd-s6','ddd-s7','ddd-s8','ddd-s9','ddd-s10',
    'ddd-t1','ddd-t2','ddd-t3','ddd-t4','ddd-t5','ddd-t6','ddd-t7','ddd-t8','ddd-t9','ddd-t10'
  ];
  const level6Count = completed.filter(s => level6Sections.includes(s)).length;
  const level6Progress = document.getElementById('level6-progress');
  if (level6Progress) level6Progress.value = level6Count;
  updateProgressText('level6', level6Count, level6Sections.length);

  // Level 7
  const level7Sections = [
    'data1','data2','data3','data4','data5','data6','data7','data8','data9','data10',
    'dba1','dba2','dba3','dba4','dba5','dba6','dba7','dba8','dba9','dba10',
    'cloud1','cloud2','cloud3','cloud4','cloud5','cloud6','cloud7','cloud8','cloud9','cloud10',
    'cloud-a1','cloud-a2','cloud-a3','cloud-a4','cloud-a5','cloud-a6','cloud-a7','cloud-a8','cloud-a9','cloud-a10',
    'req1','req2','req3','req4','req5','req6','req7','req8','req9','req10',
    'nfr1','nfr2','nfr3','nfr4','nfr5','nfr6','nfr7','nfr8','nfr9','nfr10',
    'ai1','ai2','ai3','ai4','ai5','ai6','ai7','ai8','ai9','ai10',
    'ai-a1','ai-a2','ai-a3','ai-a4','ai-a5','ai-a6','ai-a7','ai-a8','ai-a9','ai-a10'
  ];
  const level7Count = completed.filter(s => level7Sections.includes(s)).length;
  const level7Progress = document.getElementById('level7-progress');
  if (level7Progress) level7Progress.value = level7Count;
  updateProgressText('level7', level7Count, level7Sections.length);

  // Level 8
  const level8Sections = [
    'testing1','testing2','testing3','testing4','testing5','testing6','testing7','testing8','testing9','testing10',
    'unit1','unit2','unit3','unit4','unit5','unit6','unit7','unit8','unit9','unit10',
    'int1','int2','int3','int4','int5','int6','int7','int8','int9','int10',
    'e2e1','e2e2','e2e3','e2e4','e2e5','e2e6','e2e7','e2e8','e2e9','e2e10',
    'tech1','tech2','tech3','tech4','tech5','tech6','tech7','tech8','tech9','tech10',
    'tdd1','tdd2','tdd3','tdd4','tdd5','tdd6','tdd7','tdd8','tdd9','tdd10',
    'ci1','ci2','ci3','ci4','ci5','ci6','ci7','ci8','ci9','ci10','ci11',
    'qa1','qa2','qa3','qa4','qa5','qa6','qa7','qa8','qa9','qa10','qa11','qa12'
  ];
  const level8Count = completed.filter(s => level8Sections.includes(s)).length;
  const level8Progress = document.getElementById('level8-progress');
  if (level8Progress) level8Progress.value = level8Count;
  updateProgressText('level8', level8Count, level8Sections.length);

  // Level 9
  const level9Sections = [
    'agile1','agile2','agile3','agile4','agile5','agile6','agile7','agile8','agile9','agile10',
    'gitrev1','gitrev2','gitrev3','gitrev4','gitrev5','gitrev6','gitrev7','gitrev8','gitrev9','gitrev10',
    'comm1','comm2','comm3','comm4','comm5','comm6','comm7','comm8','comm9','comm10',
    'proj1','proj2','proj3','proj4','proj5','proj6','proj7','proj8','proj9','proj10',
    'sre1','sre2','sre3','sre4','sre5','sre6','sre7','sre8','sre9','sre10',
    'obs9-1','obs9-2','obs9-3','obs9-4','obs9-5','obs9-6','obs9-7','obs9-8','obs9-9','obs9-10',
    'lead1','lead2','lead3','lead4','lead5','lead6','lead7','lead8','lead9','lead10',
    'career1','career2','career3','career4','career5','career6','career7','career8','career9','career10'
  ];
  const level9Count = completed.filter(s => level9Sections.includes(s)).length;
  const level9Progress = document.getElementById('level9-progress');
  if (level9Progress) level9Progress.value = level9Count;
  updateProgressText('level9', level9Count, level9Sections.length);

  // 実践問題集
  const exercisesSections = [
    'ex-t1-1','ex-t1-2','ex-t1-3','ex-t1-4','ex-t1-5','ex-t1-6','ex-t1-7','ex-t1-8','ex-t1-9','ex-t1-10','ex-t1-11','ex-t1-12','ex-t1-13','ex-t1-14','ex-t1-15','ex-t1-16','ex-t1-17',
    'ex-t2-1','ex-t2-2','ex-t2-3','ex-t2-4','ex-t2-5','ex-t2-6','ex-t2-7','ex-t2-8','ex-t2-9','ex-t2-10','ex-t2-11','ex-t2-12','ex-t2-13','ex-t2-14','ex-t2-15','ex-t2-16','ex-t2-17',
    'ex-t3-1','ex-t3-2','ex-t3-3','ex-t3-4','ex-t3-5','ex-t3-6','ex-t3-7','ex-t3-8','ex-t3-9','ex-t3-10','ex-t3-11','ex-t3-12','ex-t3-13','ex-t3-14','ex-t3-15','ex-t3-16','ex-t3-17',
    'ex-t4-1','ex-t4-2','ex-t4-3','ex-t4-4','ex-t4-5','ex-t4-6','ex-t4-7','ex-t4-8','ex-t4-9','ex-t4-10','ex-t4-11','ex-t4-12','ex-t4-13','ex-t4-14','ex-t4-15','ex-t4-16','ex-t4-17',
    'ex-t5-1','ex-t5-2','ex-t5-3','ex-t5-4','ex-t5-5','ex-t5-6','ex-t5-7','ex-t5-8','ex-t5-9','ex-t5-10','ex-t5-11','ex-t5-12','ex-t5-13','ex-t5-14','ex-t5-15','ex-t5-16','ex-t5-17','ex-t5-18',
    'ex-t6-1','ex-t6-2','ex-t6-3','ex-t6-4','ex-t6-5','ex-t6-6','ex-t6-7','ex-t6-8','ex-t6-9','ex-t6-10','ex-t6-11','ex-t6-12','ex-t6-13','ex-t6-14','ex-t6-15','ex-t6-16','ex-t6-17','ex-t6-18',
    'ex-t7-1','ex-t7-2','ex-t7-3','ex-t7-4','ex-t7-5','ex-t7-6','ex-t7-7','ex-t7-8','ex-t7-9','ex-t7-10','ex-t7-11','ex-t7-12','ex-t7-13','ex-t7-14','ex-t7-15','ex-t7-16','ex-t7-17','ex-t7-18',
    'ex-t8-1','ex-t8-2','ex-t8-3','ex-t8-4','ex-t8-5','ex-t8-6','ex-t8-7','ex-t8-8','ex-t8-9','ex-t8-10','ex-t8-11','ex-t8-12','ex-t8-13','ex-t8-14','ex-t8-15','ex-t8-16','ex-t8-17','ex-t8-18',
    'ex-ai-1','ex-ai-2','ex-ai-3','ex-ai-4','ex-ai-5','ex-ai-6','ex-ai-7','ex-ai-8','ex-ai-9','ex-ai-10','ex-ai-11','ex-ai-12','ex-ai-13','ex-ai-14','ex-ai-15','ex-ai-16','ex-ai-17',
    'ex-t9-1','ex-t9-2','ex-t9-3','ex-t9-4','ex-t9-5','ex-t9-6','ex-t9-7','ex-t9-8','ex-t9-9','ex-t9-10','ex-t9-11','ex-t9-12','ex-t9-13','ex-t9-14','ex-t9-15'
  ];
  const exercisesCount = completed.filter(s => exercisesSections.includes(s)).length;
  const exercisesProgress = document.getElementById('exercises-progress');
  if (exercisesProgress) exercisesProgress.value = exercisesCount;
  const exercisesText = document.getElementById('exercises-progress-text');
  if (exercisesText) exercisesText.textContent = exercisesCount + ' / ' + exercisesSections.length;

  // ダッシュボードカードリンクのテキストを更新（実践問題集）
  const exCard = document.querySelector('.dashboard-card[data-level="exercises"]');
  if (exCard) {
    const exLink = exCard.querySelector('.dashboard-card-link');
    if (exLink) {
      if (exercisesCount === 0) {
        exLink.textContent = '問題を解く';
        exLink.classList.remove('completed-level');
      } else if (exercisesCount >= exercisesSections.length) {
        exLink.textContent = 'もう一度解く';
        exLink.classList.add('completed-level');
      } else {
        exLink.textContent = '続きから解く';
        exLink.classList.remove('completed-level');
      }
    }
  }

  // 次のステップ表示を更新
  updateNextStep();
}

// ============================================
// 次のステップ表示更新
// ============================================
function updateNextStep() {
  const completed = JSON.parse(localStorage.getItem('completedSections') || '[]');
  const nextStepText = document.getElementById('next-step-text');
  const nextStepCard = document.getElementById('next-step-card');
  if (!nextStepText || !nextStepCard) return;

  // ナビリンクをDOM順に取得（=学習順序）
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  let nextSection = null;
  let nextLabel = '';

  for (const link of navLinks) {
    const sectionId = link.dataset.section;
    if (sectionId === 'dashboard') continue;
    if (!completed.includes(sectionId)) {
      nextSection = sectionId;
      nextLabel = link.textContent.trim();
      break;
    }
  }

  if (nextSection) {
    nextStepCard.className = 'card card-warning';
    nextStepCard.querySelector('.card-title').innerHTML =
      '<span class="icon">👉</span> 次のステップ';
    nextStepText.innerHTML =
      '左のメニューから「<strong>' + nextLabel + '</strong>」を開いてください。';
  } else {
    nextStepCard.className = 'card card-info';
    nextStepCard.querySelector('.card-title').innerHTML =
      '<span class="icon">🎉</span> おめでとうございます！';
    nextStepText.innerHTML =
      'すべてのセクションを完了しました！復習したい箇所があれば、メニューから自由に選んでください。';
  }
}

// ============================================
// ダッシュボードカードから学習へジャンプ
// ============================================
function goToLevel(event, firstSection, sections) {
  event.preventDefault();
  const completed = JSON.parse(localStorage.getItem('completedSections') || '[]');

  // 未完了のセクションを見つける
  let target = firstSection;
  if (sections && sections.length > 0) {
    for (const s of sections) {
      if (!completed.includes(s)) {
        target = s;
        break;
      }
    }
  }

  loadSection(target);
}

// ============================================
// トップに戻るボタン
// ============================================
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 300) {
            backToTop.classList.add('visible');
          } else {
            backToTop.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  });
})();

// ============================================
// 進捗テキスト更新
// ============================================
function updateProgressText(levelId, count, max) {
  const textEl = document.getElementById(levelId + '-progress-text');
  if (textEl) {
    textEl.textContent = count + ' / ' + max;
  }

  // ダッシュボードカードリンクのテキストを更新
  const card = document.querySelector(`.dashboard-card[data-level="${levelId.replace('level','')  }"]`);
  if (!card) return;
  const link = card.querySelector('.dashboard-card-link');
  if (!link) return;

  if (count === 0) {
    link.textContent = '学習を始める';
    link.classList.remove('completed-level');
  } else if (count >= max) {
    link.textContent = '復習する';
    link.classList.add('completed-level');
  } else {
    link.textContent = '続きから学習する';
    link.classList.remove('completed-level');
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  applyCompletedStates();
  updateProgress();

  // メインコンテンツ内のクイズを初期化
  const mainContent = document.querySelector('main');
  if (mainContent) {
    initializeQuizzes(mainContent);
  }
});
