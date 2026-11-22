/**
 * MailMesh - Main Application Logic
 * Implements: Real SVG Icons, Dual Role Portals (Academic & Student Laptop),
 * Clear-on-Click Starter Text, Unmistakable Action Feedback & Error Tolerance with Undo.
 * Author: Aliza
 */

(function () {
  'use strict';

  // --- SVG ICON GENERATOR ---
  const ICONS = {
    mail: `<svg class="svg-icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    mailOpen: `<svg class="svg-icon svg-icon-sm" viewBox="0 0 24 24" style="stroke: #6E4FC4;"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6z"></path><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"></path></svg>`,
    faq: `<svg class="svg-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    check: `<svg class="svg-icon svg-icon-sm" viewBox="0 0 24 24" style="stroke: currentColor;"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    cross: `<svg class="svg-icon svg-icon-sm" viewBox="0 0 24 24" style="stroke: currentColor;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    clock: `<svg class="svg-icon svg-icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    circleDot: `<svg class="svg-icon svg-icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle></svg>`,
    undo: `<svg class="svg-icon svg-icon-sm" viewBox="0 0 24 24"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>`,
    back: `<svg class="svg-icon svg-icon-sm" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
    send: `<svg class="svg-icon svg-icon-sm" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
    user: `<svg class="svg-icon svg-icon-sm" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    clear: `<svg class="svg-icon svg-icon-sm" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"></path></svg>`
  };

  // --- APPLICATION STATE ---
  const state = {
    role: 'academic', // 'academic' or 'student'
    emails: JSON.parse(JSON.stringify(SEED_EMAILS)),
    closedEmails: [],
    faqMatches: [...SEED_FAQ_MATCHES],
    activeFilter: 'all',
    activeScreen: 'pending', // 'pending', 'email', 'repeat', 'empty', 'student-portal'
    openEmailId: 1,
    studentInquiries: [
      {
        id: 1,
        subject: "Section change request: CS301 (Data Structures)",
        submittedDate: "2 days ago",
        status: "Opened, no reply",
        statusLabel: "Under Review by Academic Office",
        statusClass: "opened",
        statusIcon: ICONS.mailOpen,
        officeReply: null,
        closeReason: null
      },
      {
        id: 99,
        subject: "When does registration open for Spring semester?",
        submittedDate: "3 days ago",
        status: "Answered elsewhere",
        statusLabel: "Answered in Official Classroom Notice",
        statusClass: "answered",
        statusIcon: ICONS.check,
        officeReply: "Official notice posted in Google Classroom: Spring registration opens on Dec 1st on the Student Portal.",
        closeReason: null
      },
      {
        id: 5,
        subject: "Course clash in timetable (CS205 & EE102)",
        submittedDate: "20 hours ago",
        status: "Not opened",
        statusLabel: "Submitted, waiting in office queue",
        statusClass: "unopened",
        statusIcon: ICONS.circleDot,
        officeReply: null,
        closeReason: null
      }
    ],
    lastUndo: null
  };

  // --- DOM REFERENCES ---
  const dom = {
    preloader: document.getElementById('preloader'),
    screenContainer: document.getElementById('screen-container'),
    banner: document.getElementById('app-banner'),
    bannerText: document.getElementById('banner-text'),
    undoBtn: document.getElementById('btn-undo'),
    badgeInbox: document.getElementById('badge-inbox'),
    badgeFaqs: document.getElementById('badge-faqs'),
    badgeStudentActive: document.getElementById('badge-student-active'),
    navEmails: document.getElementById('nav-emails'),
    navFaqs: document.getElementById('nav-faqs'),
    navStudentInquiries: document.getElementById('nav-student-inquiries'),
    navStudentFaqs: document.getElementById('nav-student-faqs'),
    sidebarAcademicNav: document.getElementById('sidebar-academic-nav'),
    sidebarStudentNav: document.getElementById('sidebar-student-nav'),
    btnRoleAcademic: document.getElementById('btn-role-academic'),
    btnRoleStudent: document.getElementById('btn-role-student'),
    closeDialog: document.getElementById('close-dialog'),
    dialogSubject: document.getElementById('dialog-email-subject'),
    dialogError: document.getElementById('dialog-error'),
    dialogFieldset: document.getElementById('dialog-fieldset'),
    dialogConfirmBtn: document.getElementById('btn-dialog-confirm'),
    dialogCancelBtn: document.getElementById('btn-dialog-cancel'),
    announcer: document.getElementById('live-announcer')
  };

  function announce(msg) {
    if (!dom.announcer) return;
    dom.announcer.textContent = '';
    setTimeout(() => { dom.announcer.textContent = msg; }, 40);
  }

  // --- PRELOADER ---
  function initPreloader() {
    setTimeout(() => {
      if (dom.preloader) {
        dom.preloader.classList.add('loaded');
      }
    }, 450);
  }

  // --- BADGE UPDATES ---
  function updateBadges() {
    const inboxCount = state.emails.length;
    const faqCount = state.faqMatches.length;

    if (dom.badgeInbox) {
      dom.badgeInbox.textContent = inboxCount;
      dom.badgeInbox.classList.toggle('zero', inboxCount === 0);
    }
    if (dom.badgeFaqs) {
      dom.badgeFaqs.textContent = faqCount > 0 ? '1' : '0';
      dom.badgeFaqs.classList.toggle('zero', faqCount === 0);
    }
    if (dom.badgeStudentActive) {
      dom.badgeStudentActive.textContent = state.studentInquiries.length;
    }
  }

  // --- FEEDBACK BANNER & UNDO (Norman's Slip & Error Reversibility) ---
  let bannerTimer = null;

  function showFeedbackBanner(text, canUndo = false) {
    if (bannerTimer) clearTimeout(bannerTimer);

    dom.bannerText.textContent = text;
    dom.undoBtn.hidden = !canUndo;
    dom.banner.hidden = false;
    dom.banner.style.opacity = '1';
    dom.banner.style.transition = 'opacity 0.4s ease, transform 0.3s ease';
    dom.banner.style.transform = 'translateY(0)';
    announce(text);

    // Auto-dismiss after 3.5 seconds (HCI Standard Feedback Timing)
    startBannerDismissTimer();
  }

  function startBannerDismissTimer() {
    if (bannerTimer) clearTimeout(bannerTimer);
    bannerTimer = setTimeout(() => {
      dom.banner.style.opacity = '0';
      dom.banner.style.transform = 'translateY(-6px)';
      setTimeout(() => {
        dom.banner.hidden = true;
      }, 400);
    }, 3500);
  }

  // Pause auto-dismiss if user hovers to click Undo
  dom.banner.addEventListener('mouseenter', () => {
    if (bannerTimer) clearTimeout(bannerTimer);
  });
  dom.banner.addEventListener('mouseleave', () => {
    if (!dom.banner.hidden) startBannerDismissTimer();
  });

  function hideBanner() {
    if (bannerTimer) clearTimeout(bannerTimer);
    dom.banner.hidden = true;
  }

  // --- ROLE SWITCHING (Academic Office vs Student Laptop Portal) ---
  function setRole(newRole) {
    state.role = newRole;
    hideBanner();

    if (newRole === 'academic') {
      dom.btnRoleAcademic.setAttribute('aria-pressed', 'true');
      dom.btnRoleStudent.setAttribute('aria-pressed', 'false');
      dom.sidebarAcademicNav.hidden = false;
      dom.sidebarStudentNav.hidden = true;
      renderPendingScreen();
      announce("Switched to Academic Office Staff Workspace");
    } else {
      dom.btnRoleStudent.setAttribute('aria-pressed', 'true');
      dom.btnRoleAcademic.setAttribute('aria-pressed', 'false');
      dom.sidebarAcademicNav.hidden = true;
      dom.sidebarStudentNav.hidden = false;
      renderStudentPortalScreen();
      announce("Switched to Student Laptop Portal for Hassan Ali");
    }
  }

  // --- SCREEN: STUDENT LAPTOP PORTAL ---
  function renderStudentPortalScreen() {
    state.activeScreen = 'student-portal';

    let html = `
      <section aria-labelledby="heading-student-portal">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 24px; flex-wrap:wrap; gap: 16px;">
          <div>
            <h1 id="heading-student-portal" style="font-size: 26px; font-weight: 700; color: var(--ink); margin-bottom: 4px;">
              My Submitted Inquiries &amp; Status
            </h1>
            <p style="color: var(--muted); font-size: 14px;">
              Student: <strong style="color: var(--ink);">Hassan Ali (22K-4102)</strong> &bull; Batch 22 (BS Computer Science)
            </p>
          </div>
          <button type="button" class="btn btn-secondary" id="btn-switch-to-office" style="font-size: 13px;">
            ${ICONS.user}
            <span>Switch back to Academic Office</span>
          </button>
        </div>

        <div class="student-portal-container">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px; border-bottom: 1px solid var(--divider); padding-bottom: 10px;">
            <span style="font-size: 15px; font-weight: 700;">Active Requests (${state.studentInquiries.length})</span>
            <span style="font-size: 13px; color: var(--muted);">Status updates synchronized with Academic Office</span>
          </div>

          <div>
            ${state.studentInquiries.map(item => `
              <article class="student-inquiry-row">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap: 10px; margin-bottom: 8px;">
                  <div>
                    <h2 style="font-size: 17px; font-weight: 700; color: var(--ink); margin-bottom: 2px;">
                      ${item.subject}
                    </h2>
                    <span style="font-size: 13px; color: var(--muted);">Submitted: ${item.submittedDate}</span>
                  </div>

                  <span class="chip chip-${item.statusClass}">
                    ${item.statusIcon}
                    <span>${item.statusLabel}</span>
                  </span>
                </div>

                ${item.officeReply ? `
                  <div class="student-response-box">
                    <strong>Official Academic Office Reply:</strong>
                    <div style="margin-top: 4px; color: var(--ink); white-space: pre-line;">${item.officeReply}</div>
                  </div>
                ` : ''}

                ${item.closeReason ? `
                  <div class="student-response-box" style="border-left-color: var(--muted); background-color: var(--surface-alt);">
                    <strong>Academic Office Notice:</strong>
                    <div style="margin-top: 4px; color: var(--ink);">This request was resolved without email correspondence. Reason: <em>"${item.closeReason}"</em></div>
                  </div>
                ` : ''}
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    dom.screenContainer.innerHTML = html;

    document.getElementById('btn-switch-to-office').addEventListener('click', () => {
      setRole('academic');
    });
  }

  // --- SCREEN 1: EMAILS (HUB) ---
  function renderPendingScreen() {
    state.activeScreen = 'pending';
    dom.navEmails.setAttribute('aria-current', 'page');
    dom.navFaqs.removeAttribute('aria-current');

    if (state.emails.length === 0 && state.activeFilter !== 'closed') {
      renderEmptyScreen();
      return;
    }

    const list = state.activeFilter === 'closed' ? state.closedEmails : getFilteredList();
    const openedCount = state.emails.filter(e => e.opened).length;

    let html = `
      <section aria-labelledby="heading-pending">
        <h1 id="heading-pending" style="font-size: 26px; font-weight: 700; margin-bottom: 6px;">
          Waiting for your reply (${state.emails.length})
        </h1>
        <p style="color: var(--muted); margin-bottom: 24px; font-size: 15px;">
          <strong style="color: var(--ink);">${openedCount}</strong> of these you have already opened (marked with a thick bar on the left). Oldest first.
        </p>

        <!-- Filters (Hick-Hyman Law) -->
        <div class="filter-row" role="group" aria-label="Filter emails by status">
          <button type="button" class="filter-btn" data-filter="all" aria-pressed="${state.activeFilter === 'all'}">
            <span>All</span>
            <span class="badge">${state.emails.length}</span>
          </button>
          <button type="button" class="filter-btn" data-filter="opened" aria-pressed="${state.activeFilter === 'opened'}">
            ${ICONS.mailOpen}
            <span>Opened, no reply</span>
            <span class="badge">${openedCount}</span>
          </button>
          <button type="button" class="filter-btn" data-filter="urgent" aria-pressed="${state.activeFilter === 'urgent'}">
            ${ICONS.clock}
            <span>Overdue and follow-ups</span>
            <span class="badge">${state.emails.filter(e => e.urgent || e.followup).length}</span>
          </button>
          <button type="button" class="filter-btn" data-filter="closed" aria-pressed="${state.activeFilter === 'closed'}">
            ${ICONS.cross}
            <span>Closed</span>
            <span class="badge">${state.closedEmails.length}</span>
          </button>
        </div>

        <!-- Repeated Question Highlight -->
        ${state.faqMatches.length > 0 && state.activeFilter !== 'closed' ? `
          <div class="repeated-group-card" role="region" aria-label="Grouped frequent questions">
            <div>
              <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">
                Same question from ${state.faqMatches.length} students
              </h2>
              <p style="color: var(--muted); margin: 0; font-size: 14px;">
                "When does registration open?" &bull; Already answered in a Classroom post.
              </p>
            </div>
            <button type="button" class="btn" id="btn-goto-repeat">
              <span>Review and answer all at once</span>
            </button>
          </div>
        ` : ''}

        <!-- Email List Table -->
        <div class="email-table" role="region" aria-label="Email inbox list">
          ${list.length > 0 ? list.map(e => `
            <article class="email-item ${e.opened ? 'is-opened' : ''}">
              <div>
                <div style="font-weight: 700; font-size: 16px; color: var(--ink);">
                  ${e.subject}
                </div>
                <div class="email-meta-info">
                  ${ICONS.user}
                  <span>${e.student} (${e.rollNo}) &bull; ${e.batch} &bull; ${e.received}</span>
                </div>
              </div>

              <div>
                <span class="chip chip-${e.statusClass}">
                  ${e.statusClass === 'opened' ? ICONS.mailOpen : (e.statusClass === 'answered' ? ICONS.check : (e.statusClass === 'closed' ? ICONS.cross : ICONS.circleDot))}
                  <span>${e.status}</span>
                </span>
              </div>

              <div>
                ${state.activeFilter !== 'closed' ? `
                  <button type="button" class="btn btn-secondary btn-open-email" data-id="${e.id}" aria-label="Open email: ${e.subject}">
                    <span>Open</span>
                  </button>
                ` : ''}
              </div>
            </article>
          `).join('') : `
            <div style="padding: 48px; text-align: center; color: var(--muted);">
              ${state.activeFilter === 'closed' ? 
                'No emails have been closed without a reply yet.' : 
                'No emails match this filter.'}
            </div>
          `}
        </div>
      </section>
    `;

    dom.screenContainer.innerHTML = html;
    updateBadges();

    // Event Bindings
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeFilter = btn.dataset.filter;
        renderPendingScreen();
        announce(`Filtered to ${state.activeFilter} emails`);
      });
    });

    document.querySelectorAll('.btn-open-email').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id, 10);
        openEmail(id);
      });
    });

    const repeatBtn = document.getElementById('btn-goto-repeat');
    if (repeatBtn) {
      repeatBtn.addEventListener('click', () => {
        hideBanner();
        renderRepeatScreen();
      });
    }
  }

  function getFilteredList() {
    return state.emails.filter(e => {
      if (state.activeFilter === 'opened') return e.opened && e.statusClass === 'opened';
      if (state.activeFilter === 'urgent') return e.urgent || e.followup;
      if (state.activeFilter === 'closed') return false;
      return true;
    });
  }

  // --- SCREEN 2: EMAIL AND REPLY ---
  function openEmail(id) {
    const email = state.emails.find(e => e.id === id);
    if (!email) return;

    email.opened = true;
    email.status = "Opened, no reply";
    email.statusClass = "opened";
    state.openEmailId = id;
    state.activeScreen = 'email';

    // Synchronize to Student perspective
    const studentInquiry = state.studentInquiries.find(si => si.id === email.id);
    if (studentInquiry) {
      studentInquiry.status = "Opened, no reply";
      studentInquiry.statusLabel = "Under Review by Academic Office";
      studentInquiry.statusClass = "opened";
      studentInquiry.statusIcon = ICONS.mailOpen;
    }

    hideBanner();
    renderEmailScreen(email);
    announce(`Viewing email: ${email.subject}`);
  }

  function renderEmailScreen(email) {
    // Starter suggested text
    const defaultDraft = "Your request has been officially approved. Please collect your authorized slip from Window 2 tomorrow.";

    let html = `
      <section aria-labelledby="heading-email">
        <div style="margin-bottom: 16px;">
          <a href="#" class="btn-link" id="btn-back-hub">
            ${ICONS.back}
            <span>Back to emails</span>
          </a>
        </div>

        <div class="card-panel">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 8px; flex-wrap:wrap; gap: 12px;">
            <div>
              <h1 id="heading-email" style="font-size: 22px; font-weight: 700; margin-bottom: 4px;">
                ${email.subject}
              </h1>
              <p style="color: var(--muted); margin: 0; font-size: 14px;">
                From <strong>${email.student}</strong> (${email.rollNo}) &bull; ${email.batch} &bull; Received ${email.received}
              </p>
            </div>
            <span class="chip chip-${email.statusClass}">
              ${ICONS.mailOpen}
              <span>${email.status}</span>
            </span>
          </div>

          <!-- Email Message Body -->
          <div class="email-body-panel" role="article" aria-label="Student email text">
            <div style="font-size: 13px; color: var(--muted); border-bottom: 1px solid var(--divider); padding-bottom: 8px; margin-bottom: 12px; display:flex; justify-content:space-between;">
              <span><strong>From:</strong> ${email.student} &lt;${email.rollNo.toLowerCase()}@nu.edu.pk&gt;</span>
              <span><strong>Verified Student</strong></span>
            </div>
            <div style="white-space: pre-line; color: var(--ink);">
              ${email.content}
            </div>
          </div>

          <!-- Reply Composer with Starter Draft -->
          <form onsubmit="return false;">
            <div class="composer-starter-tip">
              <label for="reply-box" style="font-weight: 700; font-size: 15px; color: var(--ink);">
                Your reply
              </label>
              <button type="button" class="btn-link" id="btn-toggle-draft" style="font-size: 13px; text-decoration: underline;">
                ${ICONS.clear}
                <span>Clear to write custom response</span>
              </button>
            </div>

            <textarea 
              id="reply-box" 
              class="reply-textarea" 
              aria-describedby="reply-hint"
              placeholder="Type your official response to the student here..."
            >${defaultDraft}</textarea>
            
            <p id="reply-hint" style="color: var(--muted); font-size: 14px; margin-bottom: 20px;">
              Send is available once you have written a reply. To close this email without answering, use "Close without reply" instead; the student will be shown your reason.
            </p>

            <div style="display:flex; gap: 14px; align-items:center; flex-wrap:wrap;">
              <button type="button" class="btn" id="btn-send-reply">
                ${ICONS.send}
                <span>Send reply</span>
              </button>
              <button type="button" class="btn btn-secondary" id="btn-open-close">
                <span>Close without reply&hellip;</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    `;

    dom.screenContainer.innerHTML = html;

    const replyBox = document.getElementById('reply-box');
    const sendBtn = document.getElementById('btn-send-reply');
    const closeBtn = document.getElementById('btn-open-close');
    const backBtn = document.getElementById('btn-back-hub');
    const toggleDraftBtn = document.getElementById('btn-toggle-draft');

    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderPendingScreen();
    });

    // Clear starter text on button click
    toggleDraftBtn.addEventListener('click', () => {
      replyBox.value = '';
      sendBtn.disabled = true;
      sendBtn.setAttribute('aria-disabled', 'true');
      replyBox.focus();
    });

    replyBox.addEventListener('input', () => {
      const hasText = replyBox.value.trim().length > 0;
      sendBtn.disabled = !hasText;
      sendBtn.setAttribute('aria-disabled', String(!hasText));
    });

    sendBtn.addEventListener('click', () => {
      if (sendBtn.disabled) return;

      const replyContent = replyBox.value.trim();
      sendBtn.innerHTML = `<span class="spinner" aria-hidden="true"></span> Sending reply...`;
      sendBtn.disabled = true;

      setTimeout(() => {
        const idx = state.emails.findIndex(e => e.id === email.id);
        let removed = null;
        if (idx !== -1) {
          removed = state.emails.splice(idx, 1)[0];
        }

        // Record for Undo
        state.lastUndo = {
          type: 'reply',
          email: removed || email,
          index: idx !== -1 ? idx : 0,
          replyText: replyContent
        };

        // Update Student View
        const studentInquiry = state.studentInquiries.find(si => si.id === email.id);
        if (studentInquiry) {
          studentInquiry.status = "Answered";
          studentInquiry.statusLabel = "Answered by Academic Office";
          studentInquiry.statusClass = "answered";
          studentInquiry.statusIcon = ICONS.check;
          studentInquiry.officeReply = replyContent;
        }

        renderPendingScreen();
        showFeedbackBanner(`Reply successfully sent: ${email.subject}. (Student portal updated to 'Answered')`, true);
      }, 500);
    });

    closeBtn.addEventListener('click', () => {
      openCloseModal(email);
    });
  }

  // --- SCREEN 3: CLOSE WITHOUT REASON MODAL ---
  function openCloseModal(email) {
    dom.dialogSubject.textContent = email.subject;
    dom.dialogError.hidden = true;
    dom.dialogFieldset.style.borderColor = 'var(--divider)';
    document.querySelectorAll('input[name="reason-option"]').forEach(r => r.checked = false);

    dom.closeDialog.showModal();
    dom.closeDialog.focus();

    dom.dialogConfirmBtn.onclick = () => {
      const selected = document.querySelector('input[name="reason-option"]:checked');
      if (!selected) {
        dom.dialogError.hidden = false;
        dom.dialogFieldset.style.borderColor = 'var(--error)';
        dom.dialogFieldset.style.borderWidth = '3px';
        announce(dom.dialogError.textContent);
        const firstRadio = document.querySelector('input[name="reason-option"]');
        if (firstRadio) firstRadio.focus();
        return;
      }

      const reason = selected.value;
      dom.closeDialog.close();

      const idx = state.emails.findIndex(e => e.id === email.id);
      if (idx !== -1) {
        const removed = state.emails.splice(idx, 1)[0];
        const record = Object.assign({}, removed, {
          status: `Closed: ${reason}`,
          statusClass: 'closed',
          closeReason: reason
        });
        state.closedEmails.unshift(record);

        // Record for Undo
        state.lastUndo = {
          type: 'close',
          email: removed,
          index: idx,
          reason: reason
        };

        // Update student perspective
        const studentInquiry = state.studentInquiries.find(si => si.id === email.id);
        if (studentInquiry) {
          studentInquiry.status = "Closed";
          studentInquiry.statusLabel = "Closed by Academic Office";
          studentInquiry.statusClass = "closed";
          studentInquiry.statusIcon = ICONS.cross;
          studentInquiry.closeReason = reason;
        }

        renderPendingScreen();
        showFeedbackBanner(`Closed with reason "${reason}": ${email.subject}. Student informed.`, true);
      }
    };

    dom.dialogCancelBtn.onclick = () => {
      dom.closeDialog.close();
      const openBtn = document.getElementById('btn-open-close');
      if (openBtn) openBtn.focus();
    };
  }

  // --- UNDO BUTTON HANDLER (Action Reversal) ---
  dom.undoBtn.addEventListener('click', () => {
    if (!state.lastUndo) return;

    const email = state.lastUndo.email;
    state.emails.splice(state.lastUndo.index, 0, email);
    state.closedEmails = state.closedEmails.filter(c => c.id !== email.id);

    // Revert Student perspective
    const studentInquiry = state.studentInquiries.find(si => si.id === email.id);
    if (studentInquiry) {
      studentInquiry.status = "Opened, no reply";
      studentInquiry.statusLabel = "Under Review by Academic Office";
      studentInquiry.statusClass = "opened";
      studentInquiry.statusIcon = ICONS.mailOpen;
      studentInquiry.officeReply = null;
      studentInquiry.closeReason = null;
    }

    const undoneName = email.subject;
    state.lastUndo = null;

    renderPendingScreen();
    showFeedbackBanner(`Action undone: "${undoneName}" has been restored to your inbox.`, false);
  });

  // --- SCREEN 4: FAQS REPEATED QUESTION ---
  function renderRepeatScreen() {
    state.activeScreen = 'repeat';
    dom.navFaqs.setAttribute('aria-current', 'page');
    dom.navEmails.removeAttribute('aria-current');

    const count = state.faqMatches.length;

    let html = `
      <section aria-labelledby="heading-repeat">
        <div style="margin-bottom: 16px;">
          <a href="#" class="btn-link" id="btn-back-repeat">
            ${ICONS.back}
            <span>Back to emails</span>
          </a>
        </div>

        <!-- Hero Header with Soft Lilac Background -->
        <div class="batch-hero-card">
          <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 6px;">
            <span class="step-pill-badge" style="background-color: var(--moss);">Batch Processor</span>
            <span style="font-size: 13px; font-weight: 700; color: var(--lilac-text);">FAQ Group Resolution</span>
          </div>
          <h1 id="heading-repeat" style="font-size: 24px; font-weight: 700; margin-bottom: 4px; color: var(--ink);">
            Same question from ${count} students
          </h1>
          <p style="color: var(--muted); margin: 0; font-size: 15px;">
            Inquiry Topic: <strong>"When does registration open for Spring semester?"</strong>
          </p>
        </div>

        <div class="steps-layout">
          <!-- Step 1 Card -->
          <div class="step-card">
            <div class="step-card-header">
              <span class="step-pill-badge">Step 1</span>
              <h2 style="font-size: 16px; font-weight: 700; margin: 0; color: var(--ink);">
                Check these are the same question
              </h2>
            </div>
            <div class="step-card-body">
              <p style="font-size: 13px; color: var(--muted); margin-bottom: 16px;">
                If an inquiry asks something different, remove it to return it to your individual inbox queue.
              </p>
              <div>
                ${state.faqMatches.map((m, i) => `
                  <div class="faq-question-box">
                    <span style="font-size: 14px; font-weight: 600; color: var(--ink);">"${m}"</span>
                    <button type="button" class="btn btn-secondary btn-remove-match" data-index="${i}" style="min-height: 36px; padding: 4px 12px; font-size: 12px;">
                      ${ICONS.cross}
                      <span>Not same question</span>
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Step 2 & 3 Column -->
          <div style="display:flex; flex-direction:column; gap: 24px;">
            <!-- Step 2 Card -->
            <div class="step-card">
              <div class="step-card-header">
                <span class="step-pill-badge">Step 2</span>
                <h2 style="font-size: 16px; font-weight: 700; margin: 0; color: var(--ink);">
                  Where it is already answered
                </h2>
              </div>
              <div class="step-card-body">
                <div class="faq-citation-callout">
                  <div style="font-weight: 700; color: var(--moss); margin-bottom: 4px;">Official Google Classroom Announcement</div>
                  <div style="color: var(--ink);">Posted Nov 2 by Registrar Office: <em>"Course registration for Spring semester begins on Dec 1st on the Student Portal."</em></div>
                </div>
              </div>
            </div>

            <!-- Step 3 Card -->
            <div class="step-card">
              <div class="step-card-header" style="justify-content:space-between;">
                <div style="display:flex; align-items:center; gap: 10px;">
                  <span class="step-pill-badge">Step 3</span>
                  <h2 style="font-size: 16px; font-weight: 700; margin: 0; color: var(--ink);">
                    One reply for everyone
                  </h2>
                </div>
                <button type="button" class="btn-link" id="btn-clear-broadcast" style="font-size: 13px; text-decoration: underline;">
                  ${ICONS.clear}
                  <span>Clear &amp; write custom</span>
                </button>
              </div>
              <div class="step-card-body">
                <label for="broadcast-reply" style="display:block; font-weight: 700; margin-bottom: 6px; font-size: 14px; color: var(--ink);">
                  Reply sent to each student in this batch:
                </label>
                <textarea 
                  id="broadcast-reply" 
                  class="reply-textarea" 
                  rows="4"
                >This was answered in our Google Classroom announcement of Nov 2: Course registration opens on Dec 1st via the student portal.</textarea>

                <button type="button" class="btn" id="btn-send-all" style="width:100%; margin-top: 10px;">
                  ${ICONS.send}
                  <span>Send to all ${count} students</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    dom.screenContainer.innerHTML = html;

    document.getElementById('btn-back-repeat').addEventListener('click', (e) => {
      e.preventDefault();
      renderPendingScreen();
    });

    // Clear broadcast box on demand
    const clearBroadcastBtn = document.getElementById('btn-clear-broadcast');
    const broadcastTextarea = document.getElementById('broadcast-reply');
    clearBroadcastBtn.addEventListener('click', () => {
      broadcastTextarea.value = '';
      broadcastTextarea.focus();
    });

    document.querySelectorAll('.btn-remove-match').forEach(b => {
      b.addEventListener('click', () => {
        const idx = parseInt(b.dataset.index, 10);
        const removed = state.faqMatches.splice(idx, 1)[0];

        state.emails.push({
          id: 500 + Date.now() % 1000,
          subject: removed.replace(/\?$/, ''),
          student: "Batch 23 Student",
          rollNo: "23K-9900",
          batch: "Batch 23",
          received: "Today",
          opened: false,
          status: "Not opened",
          statusClass: "unopened",
          statusIcon: ICONS.circleDot,
          urgent: false,
          content: removed
        });

        renderRepeatScreen();
        showFeedbackBanner(`"${removed}" moved back to Emails. ${state.faqMatches.length} left in this group.`, false);
      });
    });

    document.getElementById('btn-send-all').addEventListener('click', () => {
      const btn = document.getElementById('btn-send-all');
      btn.innerHTML = `<span class="spinner" aria-hidden="true"></span> Sending to ${count} students...`;
      btn.disabled = true;

      setTimeout(() => {
        state.faqMatches = [];
        renderPendingScreen();
        showFeedbackBanner(`One reply successfully broadcast to ${count} students. Batch resolved.`, false);
      }, 600);
    });
  }

  // --- SCREEN 5: EMPTY STATE ---
  function renderEmptyScreen() {
    state.activeScreen = 'empty';
    let html = `
      <section class="empty-card" aria-labelledby="heading-empty">
        <div class="empty-icon" aria-hidden="true">
          ${ICONS.check}
        </div>
        <h1 id="heading-empty" style="font-size: 24px; font-weight: 700; margin-bottom: 6px;">
          Waiting for your reply (0)
        </h1>
        <p style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">
          Nothing is waiting for a reply.
        </p>
        <p style="color: var(--muted); margin-bottom: 24px; font-size: 14px;">
          Every student email has been answered or closed with an official reason.
        </p>
        <button type="button" class="btn" id="btn-reset-demo">
          ${ICONS.undo}
          <span>Reset demo data</span>
        </button>
      </section>
    `;

    dom.screenContainer.innerHTML = html;
    updateBadges();

    document.getElementById('btn-reset-demo').addEventListener('click', () => {
      state.emails = JSON.parse(JSON.stringify(SEED_EMAILS));
      state.closedEmails = [];
      state.faqMatches = [...SEED_FAQ_MATCHES];
      renderPendingScreen();
      showFeedbackBanner('Demo data has been reset to initial queue.', false);
    });
  }

  // --- INITIALIZE NAVIGATION & ROLE EVENTS ---
  function initEvents() {
    // Role switcher events
    dom.btnRoleAcademic.addEventListener('click', () => setRole('academic'));
    dom.btnRoleStudent.addEventListener('click', () => setRole('student'));

    // Academic Sidebar
    dom.navEmails.addEventListener('click', () => {
      hideBanner();
      state.activeFilter = 'all';
      renderPendingScreen();
    });

    dom.navFaqs.addEventListener('click', () => {
      hideBanner();
      renderRepeatScreen();
    });

    // Student Sidebar
    dom.navStudentInquiries.addEventListener('click', () => {
      renderStudentPortalScreen();
    });
    dom.navStudentFaqs.addEventListener('click', () => {
      renderStudentPortalScreen();
    });

    document.getElementById('brand-link').addEventListener('click', (e) => {
      e.preventDefault();
      hideBanner();
      setRole('academic');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dom.closeDialog.open) {
        dom.closeDialog.close();
      }
    });
  }

  // --- BOOTSTRAP ---
  function boot() {
    initPreloader();
    initEvents();
    if (window.location.hash === '#student') {
      setRole('student');
    } else if (window.location.hash === '#faqs' || window.location.hash === '#repeat') {
      renderRepeatScreen();
    } else {
      renderPendingScreen();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
