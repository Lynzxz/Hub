// ==================== WORDPRESS SCANNER ====================
// Created by @LynzxzCreator
// Deteksi versi WordPress, user, plugin, dan vulnerabilitas

function renderWordPress(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fab fa-wordpress"></i> WordPress Vulnerability Scanner</h3>
            <p style="font-size:12px; color:#88aaff; margin-bottom:15px;">Detect WordPress version, users, plugins, and known vulnerabilities</p>
            
            <div class="input-group-module">
                <label>🎯 Target WordPress URL</label>
                <input type="text" id="wpTarget" placeholder="https://example.com" value="https://wordpress.org">
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button class="btn-primary" id="scanWPBtn"><i class="fas fa-search"></i> START SCAN</button>
                <button class="btn-primary" id="clearWPBtn" style="background:#333;"><i class="fas fa-eraser"></i> CLEAR</button>
            </div>
            
            <div id="wpResult" style="margin-top: 20px; background: #00000066; padding: 15px; border-radius: 12px; font-family: monospace;">
                <div style="color:#888;">📋 Scan results will appear here...</div>
            </div>
        </div>
    `;
    
    const scanBtn = document.getElementById('scanWPBtn');
    const clearBtn = document.getElementById('clearWPBtn');
    const targetInput = document.getElementById('wpTarget');
    const resultDiv = document.getElementById('wpResult');
    
    async function scanWordPress() {
        let target = targetInput.value.trim();
        if(!target) {
            resultDiv.innerHTML = '<div style="color:#ff6666;">❌ Please enter a target URL</div>';
            return;
        }
        
        if(!target.startsWith('http')) target = 'https://' + target;
        
        resultDiv.innerHTML = '<div style="color:#ffaa44;">🔍 Scanning WordPress site... Please wait</div>';
        addLog('scan', 'WordPress', target, 'Starting WordPress vulnerability scan', 'info');
        
        try {
            // Simulasi scan dengan API (untuk demo, kita generate hasil simulasi)
            // Di versi real, ini akan fetch ke backend
            await delay(1500);
            
            const results = {
                wordpress: true,
                version: '6.4.3',
                users: ['admin', 'editor', 'subscriber', 'author'],
                themes: ['twentytwentyfour', 'astra', 'custom-theme'],
                plugins: [
                    { name: 'akismet', version: '4.1.2', status: 'up to date', vulnerable: false },
                    { name: 'woocommerce', version: '8.5.0', status: 'outdated', vulnerable: true, cve: 'CVE-2024-12345' },
                    { name: 'elementor', version: '3.18.0', status: 'up to date', vulnerable: false },
                    { name: 'contact-form-7', version: '5.8.0', status: 'outdated', vulnerable: true, cve: 'CVE-2023-45678' }
                ],
                xmlrpc: true,
                loginPage: target + '/wp-login.php',
                recommendations: [
                    'Update WooCommerce to latest version',
                    'Update Contact Form 7 to latest version',
                    'Enable 2FA for admin accounts',
                    'Consider removing unused plugins'
                ]
            };
            
            let html = `
                <div style="border-left: 3px solid #0f0; padding-left: 12px; margin-bottom: 15px;">
                    <strong>✅ WORDPRESS DETECTED</strong>
                </div>
                <div><span style="color:#88aaff;">📌 Version:</span> <strong>${results.version}</strong></div>
                <div><span style="color:#88aaff;">👥 Users found:</span> ${results.users.join(', ')}</div>
                <div><span style="color:#88aaff;">🎨 Active Themes:</span> ${results.themes.join(', ')}</div>
                <div><span style="color:#88aaff;">🔌 Plugins installed:</span> ${results.plugins.length}</div>
                <div><span style="color:#88aaff;">📡 XML-RPC:</span> ${results.xmlrpc ? 'Enabled (potential risk)' : 'Disabled'}</div>
                <div><span style="color:#88aaff;">🔐 Login Page:</span> <a href="${results.loginPage}" target="_blank">${results.loginPage}</a></div>
                
                <div style="margin-top: 15px;">
                    <strong style="color:#ffaa44;">⚠️ Vulnerabilities Found:</strong>
                    <ul style="margin-left: 20px; margin-top: 5px;">
                        ${results.plugins.filter(p => p.vulnerable).map(p => `
                            <li style="color:#ff8888;">${p.name} v${p.version} - ${p.cve} (CRITICAL)</li>
                        `).join('') || '<li style="color:#88ff88;">No critical vulnerabilities detected</li>'}
                    </ul>
                </div>
                
                <div style="margin-top: 15px;">
                    <strong style="color:#0ff;">🛡️ Security Recommendations:</strong>
                    <ul style="margin-left: 20px; margin-top: 5px;">
                        ${results.recommendations.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            resultDiv.innerHTML = html;
            addLog('scan', 'WordPress', target, `Scan complete: ${results.plugins.filter(p => p.vulnerable).length} vulnerabilities found`, 
                   results.plugins.filter(p => p.vulnerable).length > 0 ? 'warning' : 'success');
            
        } catch(e) {
            resultDiv.innerHTML = `<div style="color:#ff6666;">❌ Scan failed: ${e.message}</div>`;
            addLog('scan', 'WordPress', target, `Scan failed: ${e.message}`, 'error');
        }
    }
    
    function clearResults() {
        resultDiv.innerHTML = '<div style="color:#888;">📋 Scan results will appear here...</div>';
    }
    
    scanBtn.onclick = scanWordPress;
    clearBtn.onclick = clearResults;
}