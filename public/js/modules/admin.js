// ==================== DEVELOPER PANEL ====================
// Created by @LynzxzCreator

function renderAdmin(container) {
    if (!window.isDeveloper || !window.isDeveloper()) {
        container.innerHTML = `
            <div class="module-card">
                <h3><i class="fas fa-lock"></i> ACCESS DENIED</h3>
                <p style="color:#ff6666;">⛔ Hanya Developer/Owner yang dapat mengakses panel ini.</p>
            </div>
        `;
        return;
    }
    
    const users = window.getAllUsers ? window.getAllUsers() : {};
    const logs = window.getAccessLogs ? window.getAccessLogs() : [];
    const blacklist = window.getProtectedDomains ? window.getProtectedDomains() : [];
    
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-crown"></i> 👑 DEVELOPER PANEL</h3>
            <p style="font-size:12px; color:#ffaa44;">🔥 Kontrol penuh: User Management | Protected Targets | System Logs</p>
            
            <div style="display:flex; gap:10px; margin:20px 0; border-bottom:1px solid #336699; flex-wrap:wrap;">
                <button class="admin-tab active" data-tab="users" style="background:none; border:none; padding:10px 20px; color:#0ff; cursor:pointer; font-weight:bold;">👥 USER MANAGEMENT</button>
                <button class="admin-tab" data-tab="protect" style="background:none; border:none; padding:10px 20px; color:#0ff; cursor:pointer;">🛡️ PROTECTED TARGETS</button>
                <button class="admin-tab" data-tab="logs" style="background:none; border:none; padding:10px 20px; color:#0ff; cursor:pointer;">📋 SYSTEM LOGS</button>
            </div>
            
            <!-- USERS TAB -->
            <div id="adminUsersTab" class="admin-tab-content active">
                <h4>📋 Registered Users</h4>
                <div style="overflow-x:auto; margin:15px 0;">
                    <table style="width:100%; border-collapse:collapse;">
                        <tr style="border-bottom:2px solid #0ff;">
                            <th style="padding:10px; text-align:left;">Username</th>
                            <th style="padding:10px; text-align:left;">Role</th>
                            <th style="padding:10px; text-align:left;">Created</th>
                            <th style="padding:10px; text-align:left;">Actions</th>
                        </tr>
                        ${Object.entries(users).map(([username, data]) => `
                            <tr style="border-bottom:1px solid #224466;">
                                <td style="padding:8px;"><i class="fas fa-user"></i> ${username}</td>
                                <td style="padding:8px;">${data.role === 'developer' ? '👑 DEVELOPER' : data.role === 'premium' ? '⭐ PREMIUM' : '👤 USER'}</td>
                                <td style="padding:8px;">${data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '-'}</td>
                                <td style="padding:8px;">
                                    ${data.role !== 'developer' ? `
                                        <button onclick="window.promoteToPremium('${username}'); location.reload();" style="background:#0ff; color:#000; padding:4px 10px; border:none; border-radius:4px; cursor:pointer; margin-right:5px;">⭐ Premium</button>
                                        <button onclick="if(confirm('Hapus user ${username}?')) { window.deleteUser('${username}'); location.reload(); }" style="background:#ff4444; color:#fff; padding:4px 10px; border:none; border-radius:4px; cursor:pointer;">🗑️ Delete</button>
                                    ` : '<span style="color:#ffaa44;">🔒 Protected</span>'}
                                </td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                
                <h4>➕ Create New User</h4>
                <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
                    <input type="text" id="newUsername" placeholder="Username" style="flex:1; background:#000; border:1px solid #0ff; color:#0f0; padding:10px; border-radius:6px;">
                    <input type="password" id="newPassword" placeholder="Password" style="flex:1; background:#000; border:1px solid #0ff; color:#0f0; padding:10px; border-radius:6px;">
                    <select id="newRole" style="background:#000; border:1px solid #0ff; color:#0f0; padding:10px; border-radius:6px;">
                        <option value="premium">⭐ Premium User</option>
                        <option value="user">👤 Regular User</option>
                    </select>
                    <button id="createUserBtn" style="background:#0ff; color:#000; padding:10px 20px; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">CREATE</button>
                </div>
            </div>
            
            <!-- PROTECTED TARGETS TAB -->
            <div id="adminProtectTab" class="admin-tab-content" style="display:none;">
                <h4>🛡️ Protected Domains (Anti-Senjata Makan Tuan)</h4>
                <p style="font-size:12px; color:#aaa;">Premium user TIDAK BISA menyerang domain di daftar ini.</p>
                
                <div style="display:flex; gap:10px; margin:15px 0;">
                    <input type="text" id="newDomain" placeholder="contoh: lynzxz.vercel.app atau example.com" style="flex:1; background:#000; border:1px solid #0ff; color:#0f0; padding:12px; border-radius:6px;">
                    <button id="addDomainBtn" style="background:#0ff; color:#000; padding:12px 24px; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">➕ ADD DOMAIN</button>
                </div>
                
                <div style="background:#000; padding:15px; border-radius:8px; max-height:300px; overflow-y:auto;">
                    ${blacklist.length === 0 ? '<div style="color:#888; text-align:center;">✨ Belum ada domain yang diproteksi</div>' : blacklist.map(d => `
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid #224466;">
                            <span><i class="fas fa-shield-alt"></i> 🔒 ${d}</span>
                            <button onclick="window.removeProtectedDomain('${d}'); location.reload();" style="background:#ff4444; color:#fff; padding:5px 15px; border:none; border-radius:4px; cursor:pointer;">Hapus</button>
                        </div>
                    `).join('')}
                </div>
                <p style="font-size:11px; color:#ffaa44; margin-top:10px;">💡 Tips: Masukkan domain tanpa https://, contoh: google.com atau website-saya.vercel.app</p>
            </div>
            
            <!-- LOGS TAB -->
            <div id="adminLogsTab" class="admin-tab-content" style="display:none;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; flex-wrap:wrap; gap:10px;">
                    <h4>📋 Access & Activity Logs</h4>
                    <button id="clearLogsBtn" style="background:#ff4444; color:#fff; padding:8px 16px; border:none; border-radius:6px; cursor:pointer;">🗑️ CLEAR ALL LOGS</button>
                </div>
                <div style="background:#000; padding:10px; border-radius:8px; max-height:400px; overflow-y:auto; font-family:monospace; font-size:11px;">
                    ${logs.length === 0 ? '<div style="color:#888; text-align:center; padding:20px;">📭 Belum ada aktivitas</div>' : logs.map(log => `
                        <div style="padding:8px; border-bottom:1px solid #224466;">
                            <span style="color:#88ff88;">[${new Date(log.timestamp).toLocaleString()}]</span>
                            <span style="color:#0ff;"> ${log.user}</span> → 
                            <span style="color:#ffaa44;">${log.action}</span>
                            ${log.target ? `<span style="color:#aaa;"> → ${log.target}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Tab switching
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(t => t.style.display = 'none');
            tab.classList.add('active');
            const tabId = tab.dataset.tab;
            document.getElementById(`admin${tabId.charAt(0).toUpperCase() + tabId.slice(1)}Tab`).style.display = 'block';
        });
    });
    
    // Create user
    document.getElementById('createUserBtn')?.addEventListener('click', () => {
        const username = document.getElementById('newUsername').value.trim();
        const password = document.getElementById('newPassword').value;
        const role = document.getElementById('newRole').value;
        if (!username || !password) {
            alert('Username dan password harus diisi!');
            return;
        }
        if (window.createUser(username, password, role)) {
            alert(`✅ User ${username} berhasil dibuat dengan role ${role}`);
            location.reload();
        } else {
            alert('❌ Username sudah ada!');
        }
    });
    
    // Add domain
    document.getElementById('addDomainBtn')?.addEventListener('click', () => {
        let domain = document.getElementById('newDomain').value.trim();
        if (!domain) {
            alert('Masukkan domain!');
            return;
        }
        domain = domain.replace('https://', '').replace('http://', '').replace(/\/.*$/, '');
        window.addProtectedDomain(domain);
        location.reload();
    });
    
    // Clear logs
    document.getElementById('clearLogsBtn')?.addEventListener('click', () => {
        if (confirm('⚠️ Hapus semua log aktivitas?')) {
            window.clearAccessLogs();
            location.reload();
        }
    });
}
