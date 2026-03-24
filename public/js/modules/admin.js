// ==================== DEVELOPER PANEL ====================
// Created by @LynzxzCreator
// Hanya bisa diakses oleh developer/owner

function renderAdmin(container) {
    if(!window.isDeveloper || !window.isDeveloper()) {
        container.innerHTML = '<div class="module-card"><h3>⛔ ACCESS DENIED</h3><p>Hanya developer yang dapat mengakses panel ini.</p></div>';
        return;
    }
    
    const users = window.getAllUsers ? window.getAllUsers() : {};
    const logs = window.getAccessLogs ? window.getAccessLogs() : [];
    const blacklist = window.getProtectedDomains ? window.getProtectedDomains() : [];
    
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-crown"></i> DEVELOPER PANEL</h3>
            <p style="font-size:12px; color:#ffaa44;">🔥 Kontrol penuh: User Management, Protected Targets, System Logs</p>
            
            <!-- TABS -->
            <div style="display:flex; gap:10px; margin:20px 0; border-bottom:1px solid #336699;">
                <button class="admin-tab active" data-tab="users">👥 User Management</button>
                <button class="admin-tab" data-tab="protect">🛡️ Protected Targets</button>
                <button class="admin-tab" data-tab="logs">📋 System Logs</button>
            </div>
            
            <!-- USERS TAB -->
            <div id="adminUsersTab" class="admin-tab-content active">
                <h4>Registered Users</h4>
                <div style="overflow-x:auto;">
                    <table style="width:100%; border-collapse:collapse;">
                        <tr style="border-bottom:1px solid #336699;">
                            <th style="padding:8px; text-align:left;">Username</th>
                            <th style="padding:8px; text-align:left;">Role</th>
                            <th style="padding:8px; text-align:left;">Created</th>
                            <th style="padding:8px; text-align:left;">Actions</th>
                        </tr>
                        ${Object.entries(users).map(([username, data]) => `
                            <tr style="border-bottom:1px solid #224466;">
                                <td style="padding:8px;">${username}</td>
                                <td style="padding:8px;">${data.role === 'developer' ? '👑 DEVELOPER' : data.role === 'premium' ? '⭐ PREMIUM' : '👤 USER'}</td>
                                <td style="padding:8px;">${new Date(data.createdAt).toLocaleDateString() || '-'}</td>
                                <td style="padding:8px;">
                                    ${data.role !== 'developer' ? `
                                        <button onclick="window.promoteToPremium('${username}'); location.reload();" style="background:#0ff; color:#000; padding:4px 8px; border:none; border-radius:4px; cursor:pointer; margin-right:5px;">⭐ Premium</button>
                                        <button onclick="window.deleteUser('${username}'); location.reload();" style="background:#ff4444; color:#fff; padding:4px 8px; border:none; border-radius:4px; cursor:pointer;">🗑️ Delete</button>
                                    ` : '<span style="color:#ffaa44;">🔒 Protected</span>'}
                                </td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                <div style="margin-top:15px;">
                    <h4>Create New User</h4>
                    <div style="display:flex; gap:10px; flex-wrap:wrap;">
                        <input type="text" id="newUsername" placeholder="Username" style="background:#000; border:1px solid #0ff; color:#0f0; padding:8px;">
                        <input type="password" id="newPassword" placeholder="Password" style="background:#000; border:1px solid #0ff; color:#0f0; padding:8px;">
                        <select id="newRole" style="background:#000; border:1px solid #0ff; color:#0f0; padding:8px;">
                            <option value="premium">Premium User</option>
                            <option value="user">Regular User</option>
                        </select>
                        <button id="createUserBtn" style="background:#0ff; color:#000; padding:8px 16px; border:none; border-radius:8px; cursor:pointer;">CREATE</button>
                    </div>
                </div>
            </div>
            
            <!-- PROTECTED TARGETS TAB -->
            <div id="adminProtectTab" class="admin-tab-content" style="display:none;">
                <h4>Protected Domains (Anti-Senjata Makan Tuan)</h4>
                <p style="font-size:12px;">Premium user TIDAK BISA menyerang domain di daftar ini.</p>
                <div style="margin:15px 0;">
                    <div style="display:flex; gap:10px;">
                        <input type="text" id="newDomain" placeholder="contoh: lynzxz.vercel.app" style="flex:1; background:#000; border:1px solid #0ff; color:#0f0; padding:10px;">
                        <button id="addDomainBtn" style="background:#0ff; color:#000; padding:10px 20px; border:none; border-radius:8px; cursor:pointer;">➕ ADD</button>
                    </div>
                </div>
                <div style="background:#000; padding:10px; border-radius:8px;">
                    ${blacklist.length === 0 ? '<div style="color:#888;">Belum ada domain yang diproteksi</div>' : blacklist.map(d => `
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:8px; border-bottom:1px solid #224466;">
                            <span>🔒 ${d}</span>
                            <button onclick="window.removeProtectedDomain('${d}'); location.reload();" style="background:#ff4444; color:#fff; padding:4px 12px; border:none; border-radius:4px; cursor:pointer;">Hapus</button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- LOGS TAB -->
            <div id="adminLogsTab" class="admin-tab-content" style="display:none;">
                <div style="display:flex; justify-content:space-between; margin-bottom:15px;">
                    <h4>Access Logs</h4>
                    <button id="clearLogsBtn" style="background:#ff4444; color:#fff; padding:6px 12px; border:none; border-radius:6px; cursor:pointer;">🗑️ Clear All Logs</button>
                </div>
                <div style="background:#000; padding:10px; border-radius:8px; max-height:400px; overflow-y:auto;">
                    ${logs.length === 0 ? '<div style="color:#888;">Belum ada aktivitas</div>' : logs.map(log => `
                        <div style="padding:8px; border-bottom:1px solid #224466; font-family:monospace; font-size:11px;">
                            <span style="color:#88ff88;">[${new Date(log.timestamp).toLocaleString()}]</span>
                            <span style="color:#0ff;">${log.user}</span> → ${log.action} ${log.target ? `→ ${log.target}` : ''}
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
        const username = document.getElementById('newUsername').value;
        const password = document.getElementById('newPassword').value;
        const role = document.getElementById('newRole').value;
        if(username && password) {
            const users = JSON.parse(localStorage.getItem('lynzxz_users') || '{}');
            if(!users[username]) {
                users[username] = { password, role, createdAt: new Date().toISOString() };
                localStorage.setItem('lynzxz_users', JSON.stringify(users));
                addLog('admin', 'User Management', username, `User ${username} created with role ${role}`, 'success');
                location.reload();
            } else {
                alert('Username already exists');
            }
        }
    });
    
    // Add domain
    document.getElementById('addDomainBtn')?.addEventListener('click', () => {
        const domain = document.getElementById('newDomain').value.trim();
        if(domain) {
            window.addProtectedDomain(domain);
            location.reload();
        }
    });
    
    // Clear logs
    document.getElementById('clearLogsBtn')?.addEventListener('click', () => {
        if(confirm('Hapus semua log?')) {
            window.clearAccessLogs();
            location.reload();
        }
    });
}
