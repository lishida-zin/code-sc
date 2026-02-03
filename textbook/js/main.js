// ============================================
// セクションIDからファイルパスへのマッピング
// ============================================
const sectionMapping = {
  // Level 0
  'level0-intro': 'level0/intro.html',

  // Level 1 - Phase 1: HTML基礎
  'html1': 'level1/phase1.html',
  'html2': 'level1/phase1.html',
  'html3': 'level1/phase1.html',
  'html4': 'level1/phase1.html',
  'html5': 'level1/phase1.html',
  'html6': 'level1/phase1.html',
  'html7': 'level1/phase1.html',

  // Level 1 - Phase 2: CSS基礎
  'css1': 'level1/phase2.html',
  'css2': 'level1/phase2.html',
  'css3': 'level1/phase2.html',
  'css4': 'level1/phase2.html',
  'css5': 'level1/phase2.html',
  'css6': 'level1/phase2.html',
  'css7': 'level1/phase2.html',

  // Level 1 - Phase 3: 実践
  'prac1': 'level1/phase3.html',
  'prac2': 'level1/phase3.html',
  'prac3': 'level1/phase3.html',
  'prac4': 'level1/phase3.html',

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

  // Level 2 - Phase 4: モダンJS
  'modern1': 'level2/phase4.html',
  'modern2': 'level2/phase4.html',
  'modern3': 'level2/phase4.html',
  'modern4': 'level2/phase4.html',
  'modern5': 'level2/phase4.html',
  'modern6': 'level2/phase4.html',
  'modern7': 'level2/phase4.html',

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

  // Level 3 - Phase 4: 実践パターン
  'advanced1': 'level3/phase4.html',
  'advanced2': 'level3/phase4.html',
  'advanced3': 'level3/phase4.html',
  'advanced4': 'level3/phase4.html',
  'advanced5': 'level3/phase4.html',
  'advanced6': 'level3/phase4.html',
  'advanced7': 'level3/phase4.html',
  'advanced8': 'level3/phase4.html'
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
// ナビゲーション制御
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.dataset.section;
      loadSection(sectionId);
    });
  });

  // タイトルクリックでダッシュボードに戻る
  const navTitle = document.querySelector('.nav-title');
  if (navTitle) {
    navTitle.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('dashboard');
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
  const btn = document.querySelector(`#${sectionId} .complete-btn`);
  if (btn) {
    btn.classList.add('completed');
    btn.innerHTML = '<span class="icon">✓</span> 完了済み';
  }

  // 進捗更新
  updateProgress();
}

function applyCompletedStates() {
  const completed = JSON.parse(localStorage.getItem('completedSections') || '[]');
  completed.forEach(sectionId => {
    const link = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (link) link.classList.add('completed');

    const btn = document.querySelector(`#${sectionId} .complete-btn`);
    if (btn) {
      btn.classList.add('completed');
      btn.innerHTML = '<span class="icon">✓</span> 完了済み';
    }
  });
}

function updateProgress() {
  const completed = JSON.parse(localStorage.getItem('completedSections') || '[]');

  // Level 0
  const level0Count = completed.filter(s => s.startsWith('level0')).length;
  const level0Progress = document.getElementById('level0-progress');
  if (level0Progress) level0Progress.value = level0Count;

  // Level 1
  const level1Sections = ['html1','html2','html3','html4','html5','html6','html7',
                          'css1','css2','css3','css4','css5','css6','css7',
                          'prac1','prac2','prac3','prac4'];
  const level1Count = completed.filter(s => level1Sections.includes(s)).length;
  const level1Progress = document.getElementById('level1-progress');
  if (level1Progress) level1Progress.value = level1Count;

  // Level 2
  const level2Sections = ['js1','js2','js3','js4','js5','js6','js7','js8','js9',
                          'dom1','dom2','dom3','dom4','dom5','dom6',
                          'async1','async2','async3','async4','async5','async6','async7','async8',
                          'modern1','modern2','modern3','modern4','modern5','modern6','modern7'];
  const level2Count = completed.filter(s => level2Sections.includes(s)).length;
  const level2Progress = document.getElementById('level2-progress');
  if (level2Progress) level2Progress.value = level2Count;

  // Level 3
  const level3Sections = ['ts1','ts2','ts3','ts4','ts5','ts6','ts7','ts8',
                          'react1','react2','react3','react4','react5','react6','react7','react8',
                          'hooks1','hooks2','hooks3','hooks4','hooks5','hooks6','hooks7','hooks8',
                          'advanced1','advanced2','advanced3','advanced4','advanced5','advanced6','advanced7','advanced8'];
  const level3Count = completed.filter(s => level3Sections.includes(s)).length;
  const level3Progress = document.getElementById('level3-progress');
  if (level3Progress) level3Progress.value = level3Count;
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
