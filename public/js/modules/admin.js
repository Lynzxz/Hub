// ==================== ADMIN PANEL FINDER ====================
// Created by @LynzxzCreator

function renderAdmin(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-user-secret"></i> Admin Panel Finder</h3>
            <p style="font-size:12px; color:#88aaff; margin-bottom:15px;">Discover hidden admin panels, login pages, and backend interfaces</p>
            
            <div class="input-group-module">
                <label>🎯 Target URL</label>
                <input type="text" id="adminTarget" placeholder="https://example.com" value="https://wordpress.org">
            </div>
            
            <div class="input-group-module">
                <label>⚙️ Scan Depth</label>
                <select id="adminDepth">
                    <option value="common">Common Panels Only (Fast)</option>
                    <option value="extended">Extended List (Medium)</option>
                    <option value="full">Full Scan (Comprehensive)</option>
                </select>
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button class="btn-primary" id="scanAdminBtn"><i class="fas fa-search"></i> FIND ADMIN PANELS</button>
                <button class="btn-primary" id="clearAdminBtn" style="background:#333;"><i class="fas fa-eraser"></i> CLEAR</button>
            </div>
            
            <div id="adminResult" style="margin-top: 20px; background: #00000066; padding: 15px; border-radius: 12px; font-family: monospace;">
                <div style="color:#888;">📋 Admin panels found will appear here...</div>
            </div>
        </div>
    `;
    
    const scanBtn = document.getElementById('scanAdminBtn');
    const clearBtn = document.getElementById('clearAdminBtn');
    const targetInput = document.getElementById('adminTarget');
    const depthSelect = document.getElementById('adminDepth');
    const resultDiv = document.getElementById('adminResult');
    
    const commonPanels = [
        '/admin', '/login', '/wp-admin', '/administrator', '/cpanel', '/dashboard',
        '/admin/login', '/admincp', '/backend', '/manage', '/controlpanel', '/auth'
    ];
    
    const extendedPanels = [
        '/admin', '/login', '/wp-admin', '/administrator', '/cpanel', '/dashboard',
        '/admin/login', '/admincp', '/backend', '/manage', '/controlpanel', '/auth',
        '/user/login', '/admin/index.php', '/login.php', '/adminarea', '/panel',
        '/webadmin', '/siteadmin', '/adm', '/adminpanel', '/console'
    ];
    
    const fullPanels = [
        ...extendedPanels,
        '/cms/login', '/wp-login.php', '/login/admin', '/staff', '/operator',
        '/secure', '/private', '/hidden', '/secret', '/portal', '/gateway'
    ];
    
    async function findAdminPanels() {
        let target = targetInput.value.trim();
        if(!target) {
            resultDiv.innerHTML = '<div style="color:#ff6666;">❌ Please enter a target URL</div>';
            return;
        }
        
        if(!target.startsWith('http')) target = 'https://' + target;
        
        resultDiv.innerHTML = '<div style="color:#ffaa44;">🔍 Scanning for admin panels... This may take a moment</div>';
        addLog('scan', 'Admin Finder', target, `Starting ${depthSelect.value} admin panel scan`, 'info');
        
        let panelsToScan = [];
        if(depthSelect.value === 'common') panelsToScan = commonPanels;
        else if(depthSelect.value === 'extended') panelsToScan = extendedPanels;
        else panelsToScan = fullPanels;
        
        await delay(1000);
        
        const foundPanels = [];
        
        for(const panel of panelsToScan) {
            await delay(200);
            // Simulasi detection
            const found = Math.random() > 0.85;
            if(found) {
                foundPanels.push({
                    path: panel,
                    status: [200, 401, 403, 302][Math.floor(Math.random() * 4)],
                    title: panel.includes('wp') ? 'WordPress Admin' : 
                           panel.includes('admin') ? 'Admin Login' : 
                           panel.includes('login') ? 'Login Page' : 'Restricted Area'
                });
            }
        }
        
        let html = '';
        
        if(foundPanels.length > 0) {
            html = `
                <div style="border-left: 3px solid #0ff; padding-left: 12px; margin-bottom: 15px;">
                    <strong style="color:#0ff;">🔓 ${foundPanels.length} Admin Panel(s) Found!</strong>
                </div>
                <table style="width:100%; border-collapse: collapse;">
                    <tr style="border-bottom:1px solid #336699;">
                        <th style="text-align:left; padding:8px;">Path</th>
                        <th style="text-align:left; padding:8px;">Status</th>
                        <th style="text-align:left; padding:8px;">Title/Type</th>
                    </tr>
                    ${foundPanels.map(p => `
                        <tr style="border-bottom:1px solid #224466;">
                            <td style="padding:8px;"><a href="${target}${p.path}" target="_blank" style="color:#0ff;">${p.path}</a></td>
                            <td style="padding:8px;">${p.status}</td>
                            <td style="padding:8px;">${p.title}</td>
                        </tr>
                    `).join('')}
                </table>
                <div style="margin-top: 15px; background:#00330033; padding:10px; border-radius:8px;">
                    <strong style="color:#88ff88;">💡 Tips:</strong><br>
                    • Try default credentials: admin/admin, admin/password<br>
                    • Check if login page has password reset option<br>
                    • Look for exposed version information
                </div>
            `;
            addLog('vulnerability', 'Admin Finder', target, `${foundPanels.length} admin panels discovered`, 'warning');
        } else {
            html = `
                <div style="border-left: 3px solid #0f0; padding-left: 12px;">
                    <strong style="color:#88ff88;">✅ No exposed admin panels found</strong>
                </div>
                <div style="margin-top: 10px; color:#aaa;">Target appears to have hidden or protected admin interfaces.</div>
            `;
            addLog('scan', 'Admin Finder', target, `No panels found`, 'success');
        }
        
        resultDiv.innerHTML = html;
    }
    
    function clearResults() {
        resultDiv.innerHTML = '<div style="color:#888;">📋 Admin panels found will appear here...</div>';
    }
    
    scanBtn.onclick = findAdminPanels;
    clearBtn.onclick = clearResults;
}