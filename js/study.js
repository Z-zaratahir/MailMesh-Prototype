/**
 * MailMesh D5 test build: study task bar, event log, timing and session code.
 * Added for the D5 usability study. It sits outside the D4 interface and
 * only listens to clicks; it does not change how the D4 screens behave.
 * Nothing is sent anywhere: the log lives in this page's memory, and only
 * the session code the participant chooses to paste into the Form leaves
 * their computer.
 */
(function () {
  'use strict';

  const TASK = STUDY_TASK;
  const params = new URLSearchParams(window.location.search);
  const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';   // no 0/O, 1/I/L

  function newParticipantCode() {
    let s = '';
    const buf = new Uint32Array(5);
    (window.crypto || window.msCrypto).getRandomValues(buf);
    for (let i = 0; i < 5; i++) s += ALPHABET[buf[i] % ALPHABET.length];
    return s;
  }
  const rawP = (params.get('p') || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5);
  const PCODE = rawP.length === 5 ? rawP : newParticipantCode();

  // ---------- lookups from text on screen to email IDs ----------
  const subjectToId = new Map();
  SEED_EMAILS.forEach(e => subjectToId.set(e.subject.trim(), e.id));
  const faqToId = new Map();
  if (TASK === 2) S2_GROUP.forEach(g => faqToId.set(g[1], g[0]));
  else SEED_FAQ_MATCHES.forEach((t, i) => faqToId.set(t, 900 + i));
  // A question moved back to Emails keeps its text without the final "?"
  faqToId.forEach((id, text) => subjectToId.set(text.replace(/\?$/, '').trim(), id));

  const idForSubject = s => subjectToId.get((s || '').trim()) || 0;
  const idForFaq = s => faqToId.get((s || '').trim().replace(/^"|"$/g, '')) || 0;

  // ---------- state ----------
  const st = {
    phase: 'ready',        // ready -> running -> done
    t0: 0, t1: 0,
    hiddenMs: 0, hiddenSince: 0,
    events: [],            // [tenths of a second since start, type, arg]
    code: ''
  };

  function now() { return performance.now(); }
  function log(type, arg) {
    if (st.phase !== 'running') return;
    const ds = Math.round((now() - st.t0) / 100);
    st.events.push(arg === undefined ? [ds, type] : [ds, type, arg]);
  }

  // ---------- session code ----------
  function fnv1a(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return ('00000000' + h.toString(16)).slice(-8);
  }
  function b64url(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    bytes.forEach(b => { bin += String.fromCharCode(b); });
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function buildCode() {
    const counts = {};
    st.events.forEach(e => { counts[e[1]] = (counts[e[1]] || 0) + 1; });
    const activeMs = (st.t1 - st.t0) - st.hiddenMs;
    const payload = JSON.stringify({
      v: 1, p: PCODE, t: TASK,
      d: Math.round(activeMs / 100) / 10,
      h: Math.round(st.hiddenMs / 100) / 10,
      c: counts,
      x: st.events
    });
    return 'MM1.' + b64url(payload) + '.' + fnv1a(payload);
  }

  // ---------- task bar ----------
  const bar = document.createElement('div');
  bar.id = 'study-bar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Study task bar');
  bar.innerHTML = `
    <div class="sb-row">
      <div class="sb-left">
        <strong class="sb-title">MailMesh study</strong>
        <span class="sb-task">Task ${TASK} of 4</span>
        <span class="sb-pcode">Your participant code: <strong id="sb-pcode">${PCODE}</strong></span>
      </div>
      <div class="sb-right">
        <button type="button" class="sb-btn" id="sb-start">Start task</button>
        <button type="button" class="sb-btn" id="sb-done" disabled>I’m done</button>
      </div>
    </div>
    ${TASK === 2 ? `<div class="sb-note" id="sb-announcement"><strong>Announcement (box on the task bar):</strong> ${STUDY_ANNOUNCEMENT}</div>` : ''}
    <div class="sb-result" id="sb-result" hidden>
      <label for="sb-code" class="sb-result-label">Session code for Task ${TASK}. Copy it and paste it into the Form.</label>
      <div class="sb-code-row">
        <textarea id="sb-code" class="sb-code" readonly rows="2"></textarea>
        <button type="button" class="sb-btn" id="sb-copy">Copy code</button>
      </div>
      <p class="sb-copied" id="sb-copied" role="status" aria-live="polite"></p>
      <p class="sb-next">${TASK < 4
        ? `When you have pasted the code and answered the Task ${TASK} questions in the Form, <a id="sb-next" href="?task=${TASK + 1}&p=${PCODE}">go to Task ${TASK + 1}</a>.`
        : 'This was the last task. Paste the code into the Form, answer the remaining questions, and submit the Form. Thank you!'}</p>
    </div>`;
  document.body.insertBefore(bar, document.body.firstChild);

  // Cover the interface until the participant presses Start task.
  const cover = document.createElement('div');
  cover.id = 'study-cover';
  cover.innerHTML = `
    <div class="sc-box">
      <p class="sc-big">Task ${TASK} of 4</p>
      <p>Read Task ${TASK} in the Form first. When you are ready, press <strong>Start task</strong> on the bar above.</p>
      ${TASK === 1 ? `<p>Your participant code is <strong>${PCODE}</strong>. Please type it into the Form now.</p>` : ''}
    </div>`;
  document.body.appendChild(cover);

  const appParts = () => [document.querySelector('.app-header'), document.querySelector('.app-shell'),
    document.querySelector('.skip-link'), document.getElementById('close-dialog')].filter(Boolean);
  function setInert(on) { appParts().forEach(el => { if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert'); }); }
  setInert(true);

  const btnStart = document.getElementById('sb-start');
  const btnDone = document.getElementById('sb-done');
  const result = document.getElementById('sb-result');
  const codeBox = document.getElementById('sb-code');

  btnStart.addEventListener('click', () => {
    if (st.phase !== 'ready') return;
    st.phase = 'running';
    st.t0 = now();
    if (document.hidden) st.hiddenSince = st.t0;
    cover.remove();
    setInert(false);
    btnStart.disabled = true;
    btnDone.disabled = false;
    log('start');
    const main = document.getElementById('main-workspace');
    if (main) main.focus();
  });

  btnDone.addEventListener('click', () => {
    if (st.phase !== 'running') return;
    log('end');
    st.t1 = now();
    if (st.hiddenSince) { st.hiddenMs += st.t1 - st.hiddenSince; st.hiddenSince = 0; }
    st.phase = 'done';
    st.code = buildCode();
    codeBox.value = st.code;
    btnDone.disabled = true;
    result.hidden = false;
    codeBox.focus();
    codeBox.select();
  });

  document.getElementById('sb-copy').addEventListener('click', () => {
    const msg = document.getElementById('sb-copied');
    const done = () => { msg.textContent = 'Copied. Now paste it into the Form.'; };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(st.code).then(done, () => { codeBox.select(); document.execCommand('copy'); done(); });
    } else { codeBox.select(); document.execCommand('copy'); done(); }
  });

  // Warn before leaving mid-task (a reload would restart the timer).
  window.addEventListener('beforeunload', e => {
    if (st.phase === 'running') { e.preventDefault(); e.returnValue = ''; }
  });

  document.addEventListener('visibilitychange', () => {
    if (st.phase !== 'running') return;
    if (document.hidden) { st.hiddenSince = now(); log('hid'); }
    else if (st.hiddenSince) { st.hiddenMs += now() - st.hiddenSince; st.hiddenSince = 0; log('shw'); }
  });

  // ---------- event log (listen only; D4 handlers run as before) ----------
  const REASONS = ['Outside university policy', 'Please write from your official email',
    'Decided on the student portal', 'Known problem, being fixed'];

  document.addEventListener('click', ev => {
    if (st.phase !== 'running') return;
    const t = ev.target.closest('button, a');
    if (!t || t.closest('#study-bar')) return;
    if (t.disabled) return;
    const id = t.id;

    if (t.classList.contains('filter-btn')) return log('flt', t.dataset.filter);
    if (t.classList.contains('btn-open-email')) return log('opn', parseInt(t.dataset.id, 10));
    if (t.classList.contains('btn-remove-match')) {
      const box = t.closest('.faq-question-box');
      const span = box && box.querySelector(':scope > span');
      return log('nsq', idForFaq(span ? span.textContent : ''));
    }
    switch (id) {
      case 'btn-send-reply': {
        const h = document.getElementById('heading-email');
        return log('rep', idForSubject(h ? h.textContent : ''));
      }
      case 'btn-open-close': {
        const h = document.getElementById('heading-email');
        return log('cdo', idForSubject(h ? h.textContent : ''));
      }
      case 'btn-dialog-confirm': {
        const sel = document.querySelector('input[name="reason-option"]:checked');
        const subj = document.getElementById('dialog-email-subject');
        const eid = idForSubject(subj ? subj.textContent : '');
        const reason = sel ? REASONS.indexOf(sel.value) + 1 : 0;   // 1-4, 0 = none chosen
        setTimeout(() => {
          const dlg = document.getElementById('close-dialog');
          const err = document.getElementById('dialog-error');
          if (dlg && dlg.open && err && !err.hidden) log('cer', eid);
          else log('ccf', [eid, reason]);
        }, 0);
        return;
      }
      case 'btn-dialog-cancel': return log('ccn');
      case 'btn-undo': return log('und');
      case 'btn-goto-repeat':
      case 'nav-faqs': return log('grp');
      case 'btn-send-all': {
        const ids = [...document.querySelectorAll('.faq-question-box > span')].map(s => idForFaq(s.textContent));
        return log('sal', ids);
      }
      case 'btn-role-academic':
      case 'btn-switch-to-office':
      case 'brand-link': return log('rol', 'a');
      case 'btn-role-student': return log('rol', 's');
      case 'nav-emails': return log('nav');
      case 'nav-student-inquiries': return log('snv', 'inq');
      case 'nav-student-faqs': return log('snv', 'faq');
      case 'btn-back-hub':
      case 'btn-back-repeat': return log('bck');
      case 'btn-toggle-draft':
      case 'btn-clear-broadcast': return log('clr');
      case 'btn-reset-demo': return log('rst');
      default: return;
    }
  }, true);

  document.addEventListener('keydown', ev => {
    if (st.phase !== 'running') return;
    const dlg = document.getElementById('close-dialog');
    if (ev.key === 'Escape' && dlg && dlg.open) log('esc');
  }, true);
})();
