/**
 * Floating Quick Contact Widget
 * Replaces external Tawk.to chat with a direct contact form routed to pchinmay098@gmail.com
 */
(function () {
  'use strict';

  var RECIPIENT_EMAIL = 'pchinmay098@gmail.com';

  // Inject Styles for the Floating Quick Contact Form
  function injectStyles() {
    if (document.getElementById('quick-chat-styles')) return;

    var css = `
      .quick-chat-widget {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 99999;
        font-family: 'Poppins', sans-serif;
      }
      .quick-chat-launcher {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: #ffae00;
        color: #0d002c;
        border: none;
        box-shadow: 0 10px 25px rgba(255, 174, 0, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.2rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        outline: none;
      }
      .quick-chat-launcher:hover {
        transform: scale(1.08) rotate(4deg);
        background: #ffa000;
        box-shadow: 0 14px 30px rgba(255, 160, 0, 0.55);
      }
      .quick-chat-card {
        position: absolute;
        bottom: 74px;
        right: 0;
        width: 340px;
        max-width: calc(100vw - 32px);
        background: #ffae00;
        border-radius: 22px;
        box-shadow: 0 20px 45px rgba(0, 0, 0, 0.28);
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
        transform: translateY(20px) scale(0.92);
        transform-origin: bottom right;
        transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .quick-chat-card.active {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0) scale(1);
      }
      .quick-chat-header {
        padding: 1.8rem 3.6rem 1.4rem 1.8rem;
        position: relative;
      }
      .quick-chat-header p {
        margin: 0;
        font-size: 1.4rem;
        line-height: 1.45;
        color: #0d002c;
        font-weight: 600;
        text-align: center;
      }
      .quick-chat-close {
        position: absolute;
        top: 0.8rem;
        right: 1.2rem;
        background: transparent;
        border: none;
        font-size: 2.6rem;
        line-height: 1;
        color: #0d002c;
        cursor: pointer;
        padding: 0.4rem;
        opacity: 0.8;
        transition: transform 0.2s, opacity 0.2s;
      }
      .quick-chat-close:hover {
        opacity: 1;
        transform: scale(1.2);
      }
      .quick-chat-body {
        background: #ffffff;
        margin: 0 1.2rem 1.2rem;
        border-radius: 16px;
        padding: 1.8rem 1.6rem;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
      }
      .quick-chat-group {
        margin-bottom: 1.2rem;
      }
      .quick-chat-input {
        width: 100%;
        border: 1.5px solid #4a5568;
        border-radius: 12px;
        padding: 1rem 1.4rem;
        font-size: 1.35rem;
        font-family: 'Poppins', sans-serif;
        color: #1a202c;
        background: #ffffff;
        outline: none;
        transition: border-color 0.25s, box-shadow 0.25s;
        box-sizing: border-box;
      }
      .quick-chat-input::placeholder {
        color: #4a5568;
        font-weight: 500;
      }
      .quick-chat-input:focus {
        border-color: #ffae00;
        box-shadow: 0 0 0 3px rgba(255, 174, 0, 0.25);
      }
      .quick-chat-textarea {
        min-height: 90px;
        resize: vertical;
      }
      .quick-chat-submit {
        width: 100%;
        background: #ffae00;
        color: #0d002c;
        font-family: 'Poppins', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        padding: 1.2rem;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        transition: all 0.25s ease;
        box-shadow: 0 4px 12px rgba(255, 174, 0, 0.35);
      }
      .quick-chat-submit:hover {
        background: #ffa000;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(255, 160, 0, 0.45);
      }
      .quick-chat-status {
        margin-top: 1rem;
        font-size: 1.25rem;
        line-height: 1.4;
        text-align: center;
        font-weight: 500;
        display: none;
        padding: 0.8rem;
        border-radius: 8px;
      }
      .quick-chat-status.success {
        display: block;
        background: #ecfdf5;
        color: #065f46;
        border: 1px solid #a7f3d0;
      }
      .quick-chat-status.error {
        display: block;
        background: #fef2f2;
        color: #991b1b;
        border: 1px solid #fecaca;
      }
      .quick-chat-footer {
        text-align: center;
        padding: 0 1rem 1rem;
        font-size: 1.2rem;
        color: #3d2c00;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }
    `;

    var styleEl = document.createElement('style');
    styleEl.id = 'quick-chat-styles';
    styleEl.innerHTML = css;
    document.head.appendChild(styleEl);
  }

  // Mount Floating Widget HTML into DOM
  function mountWidget() {
    if (document.getElementById('quickChatWidget')) return;

    var container = document.createElement('div');
    container.className = 'quick-chat-widget';
    container.id = 'quickChatWidget';

    container.innerHTML = `
      <div class="quick-chat-card" id="quickChatCard">
        <div class="quick-chat-header">
          <p>Please fill out the form below and we will get back to you as soon as possible.</p>
          <button type="button" class="quick-chat-close" id="quickChatClose" aria-label="Close form">&times;</button>
        </div>
        <div class="quick-chat-body">
          <form id="quick-contact-form" action="https://formsubmit.co/${RECIPIENT_EMAIL}" method="POST">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_template" value="table">
            <input type="hidden" name="_subject" value="New Quick Message via Portfolio Widget">

            <div class="quick-chat-group">
              <input type="text" name="name" class="quick-chat-input" placeholder="* Name" required>
            </div>
            <div class="quick-chat-group">
              <input type="email" name="email" class="quick-chat-input" placeholder="* Email" required>
            </div>
            <div class="quick-chat-group">
              <textarea name="message" class="quick-chat-input quick-chat-textarea" placeholder="* Message" required></textarea>
            </div>
            <button type="submit" class="quick-chat-submit">
              <i class="fas fa-paper-plane"></i> Submit
            </button>
          </form>
          <div class="quick-chat-status" id="quickChatStatus"></div>
        </div>
        <div class="quick-chat-footer">
          <i class="fas fa-envelope"></i> Linked directly to ${RECIPIENT_EMAIL}
        </div>
      </div>
      <button type="button" class="quick-chat-launcher" id="quickChatLauncher" aria-label="Open contact form">
        <i class="fas fa-comment-dots" id="quickChatIcon"></i>
      </button>
    `;

    document.body.appendChild(container);
    bindWidgetEvents();
  }

  // Bind Open/Close and Form Submit Events
  function bindWidgetEvents() {
    var launcher = document.getElementById('quickChatLauncher');
    var card = document.getElementById('quickChatCard');
    var closeBtn = document.getElementById('quickChatClose');
    var icon = document.getElementById('quickChatIcon');
    var form = document.getElementById('quick-contact-form');
    var status = document.getElementById('quickChatStatus');

    if (!launcher || !card) return;

    function toggleCard() {
      var isActive = card.classList.toggle('active');
      if (icon) {
        icon.className = isActive ? 'fas fa-chevron-down' : 'fas fa-comment-dots';
      }
    }

    launcher.addEventListener('click', toggleCard);

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        card.classList.remove('active');
        if (icon) icon.className = 'fas fa-comment-dots';
      });
    }

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var submitBtn = form.querySelector('button[type="submit"]');
        var originalBtnHtml = submitBtn.innerHTML;

        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        if (status) {
          status.style.display = 'none';
          status.className = 'quick-chat-status';
        }

        var payload = {
          name: form.name ? form.name.value : '',
          email: form.email ? form.email.value : '',
          message: form.message ? form.message.value : '',
          _subject: 'New Quick Message from ' + (form.name ? form.name.value : 'Visitor'),
          _captcha: 'false',
          _template: 'table'
        };

        fetch('https://formsubmit.co/ajax/' + RECIPIENT_EMAIL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.disabled = false;

            if (data.success === 'true' || data.success === true) {
              if (status) {
                status.className = 'quick-chat-status success';
                status.innerHTML = '✓ Thank you! Your message has been sent directly to ' + RECIPIENT_EMAIL;
                status.style.display = 'block';
              }
              alert('Thank you! Your message has been sent successfully to ' + RECIPIENT_EMAIL + '.');
              form.reset();
              setTimeout(function () {
                card.classList.remove('active');
                if (icon) icon.className = 'fas fa-comment-dots';
              }, 3000);
            } else if (data.message && data.message.indexOf('Activation') !== -1) {
              alert('Form submitted! Note: A one-time activation link was sent to ' + RECIPIENT_EMAIL + '. Please confirm the link in your email once to start receiving all messages directly.');
              form.reset();
            } else {
              alert(data.message || 'Message sent successfully to ' + RECIPIENT_EMAIL + '!');
              form.reset();
            }
          })
          .catch(function (err) {
            console.error('Quick contact AJAX submission error:', err);
            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.disabled = false;
            // Native fallback to ensure delivery
            form.submit();
          });
      });
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectStyles();
      mountWidget();
    });
  } else {
    injectStyles();
    mountWidget();
  }
})();
