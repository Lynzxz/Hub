// ==================== BRUTE FORCE ====================
function renderBruteForce(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-key"></i> Brute Force Attack</h3>
            <div class="input-group-module">
                <label>🎯 Target URL</label>
                <input type="text" id="bruteTarget" placeholder="https://example.com/login.php" style="width:100%;">
            </div>
            <div class="input-group-module">
                <label>👤 Username</label>
                <input type="text" id="bruteUsername" placeholder="admin" style="width:100%;">
            </div>
            <button class="btn-primary" id="startBruteBtn">🔑 START BRUTE FORCE</button>
            <div id="bruteResult" style="margin-top:20px; background:#000; padding:15px; border-radius:8px; font-family:monospace;"></div>
        </div>
    `;
    
    function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
    const commonPasswords = ['admin', 'password', '123456', 'admin123', 'root', 'user', 'test', 'passw0rd', 'adminpass'];
    
    async function startBrute() {
        let target = document.getElementById('bruteTarget').value.trim();
        let username = document.getElementById('bruteUsername').value.trim();
        const resultDiv = document.getElementById('bruteResult');
        
        if(!target || !username) { resultDiv.innerHTML = '<div style="color:#ff6666;">❌ Isi target dan username!</div>'; return; }
        
        resultDiv.innerHTML = '<div style="color:#ffaa44;">🔍 Memulai brute force (simulasi edukasi)...</div>';
        addLog('attack', 'Brute Force', target, `Starting brute force for ${username}`, 'info');
        
        let attempts = 0;
        for(const pass of commonPasswords) {
            attempts++;
            resultDiv.innerHTML = `<div style="color:#ffaa44;">🔍 Attempt ${attempts}/${commonPasswords.length}: ${username}:${pass}</div>`;
            await delay(200);
            if(pass === 'admin123') {
                resultDiv.innerHTML = `<div style="border-left:3px solid #0f0; padding-left:12px;"><strong>✅ PASSWORD FOUND!</strong></div><div>Username: ${username}<br>Password: ${pass}<br>Total attempts: ${attempts}</div>`;
                addLog('success', 'Brute Force', target, `Password found: ${username}:${pass}`, 'success');
                return;
            }
        }
        resultDiv.innerHTML = `<div style="border-left:3px solid #ff6666; padding-left:12px;"><strong>❌ Password not found</strong></div><div>Total attempts: ${attempts}</div>`;
        addLog('attack', 'Brute Force', target, `Completed: ${attempts} attempts, no credentials found`, 'info');
    }
    
    document.getElementById('startBruteBtn')?.addEventListener('click', startBrute);
}
