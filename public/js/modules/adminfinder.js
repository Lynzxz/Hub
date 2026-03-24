// ==================== ADMIN PANEL FINDER ====================
function renderAdminFinder(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-user-secret"></i> Admin Panel Finder</h3>
            <p style="font-size:12px; color:#ffaa44;">🔍 Mencari halaman admin/login yang tersembunyi</p>
            
            <div class="input-group-module">
                <label>🎯 Target URL</label>
                <input type="text" id="adminTarget" placeholder="https://example.com" style="width:100%;">
            </div>
            <button class="btn-primary" id="scanAdminBtn">🔍 FIND ADMIN PANELS</button>
            <div id="adminResult" style="margin-top:20px; background:#000; padding:15px; border-radius:8px; font-family:monospace; max-height:300px; overflow:auto;"></div>
        </div>
    `;
    
    const commonPanels = [
        '/admin', '/login', '/wp-admin', '/administrator', '/cpanel', '/dashboard',
        '/admin/login', '/admincp', '/backend', '/manage', '/controlpanel', '/auth',
        '/user/login', '/admin/index.php', '/login.php', '/adminarea', '/panel',
        '/webadmin', '/siteadmin', '/adm', '/adminpanel', '/console'
    ];
    
    async function scanAdmin() {
        let target = document.getElementById('adminTarget').value.trim();
        const resultDiv = document.getElementById('adminResult');
        if(!target) {
            resultDiv.innerHTML = '<div style="color:#ff6666;">❌ Masukkan target URL!</div>';
            return;
        }
        if(!target.startsWith('http')) target = 'https://' + target;
        
        resultDiv.innerHTML = '<div style="color:#ffaa44;">🔍 Scanning admin panels... Mohon tunggu</div>';
        addLog('scan', 'Admin Finder', target, 'Starting admin panel scan', 'info');
        
        const found = [];
        for(const panel of commonPanels) {
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 3000);
                const res = await fetch(target + panel, { method: 'HEAD', signal: controller.signal });
                clearTimeout(timeout);
                if(res.status === 200 || res.status === 401 || res.status === 403 || res.status === 302) {
                    found.push({ path: panel, status: res.status });
                }
            } catch(e) {}
        }
        
        if(found.length > 0) {
            resultDiv.innerHTML = `<div style="border-left:3px solid #0f0; padding-left:12px;"><strong>✅ Ditemukan ${found.length} admin panel:</strong></div><ul style="margin-top:10px;">${found.map(p => `<li><a href="${target}${p.path}" target="_blank" style="color:#0ff;">${p.path}</a> (HTTP ${p.status})</li>`).join('')}</ul>`;
            addLog('vulnerability', 'Admin Finder', target, `${found.length} admin panels ditemukan`, 'warning');
        } else {
            resultDiv.innerHTML = '<div style="border-left:3px solid #0f0; padding-left:12px;">✅ Tidak ditemukan admin panel umum.</div>';
            addLog('scan', 'Admin Finder', target, `Tidak ditemukan panel`, 'info');
        }
    }
    
    document.getElementById('scanAdminBtn')?.addEventListener('click', scanAdmin);
}
