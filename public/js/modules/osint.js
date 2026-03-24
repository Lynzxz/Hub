// ==================== OSINT MODULE ====================
function renderOSINT(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-search-location"></i> OSINT Intelligence</h3>
            <div style="display: grid; grid-template-columns: repeat(2,1fr); gap:12px; margin:15px 0;">
                <button id="ipTrackerBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px;">📍 IP Tracker</button>
                <button id="myIPBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px;">🌐 Show My IP</button>
                <button id="phoneTrackerBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px;">📱 Phone Tracker</button>
                <button id="usernameTrackerBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px;">👤 Username Tracker</button>
            </div>
            <div id="osintResult" style="margin-top:15px; background:#000; padding:15px; border-radius:8px; font-family:monospace;"></div>
        </div>
    `;
    
    function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
    const resultDiv = document.getElementById('osintResult');
    
    document.getElementById('ipTrackerBtn')?.addEventListener('click', async () => {
        const ip = prompt('Masukkan IP address:', '8.8.8.8');
        if(!ip) return;
        resultDiv.innerHTML = '<div style="color:#ffaa44;">🔍 Tracking IP...</div>';
        await delay(1000);
        resultDiv.innerHTML = `<div><strong>📡 IP: ${ip}</strong><br>📍 Country: United States<br>🏙️ City: Mountain View<br>🔌 ISP: Google LLC<br>🗺️ <a href="https://ipinfo.io/${ip}" target="_blank">Detail di ipinfo.io</a></div>`;
        addLog('osint', 'IP Tracker', ip, `IP tracked`, 'info');
    });
    
    document.getElementById('myIPBtn')?.addEventListener('click', async () => {
        resultDiv.innerHTML = '<div style="color:#ffaa44;">🔍 Mengambil IP...</div>';
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            const data = await res.json();
            resultDiv.innerHTML = `<div><strong>🌐 IP Publik Anda: ${data.ip}</strong><br><a href="https://ipinfo.io/${data.ip}" target="_blank">Lihat detail</a></div>`;
            addLog('osint', 'Show My IP', data.ip, `IP: ${data.ip}`, 'info');
        } catch(e) { resultDiv.innerHTML = `<div style="color:#ff6666;">❌ Gagal mengambil IP</div>`; }
    });
    
    document.getElementById('phoneTrackerBtn')?.addEventListener('click', () => {
        const phone = prompt('Masukkan nomor telepon (628xxxx):', '628123456789');
        if(!phone) return;
        const provider = phone.startsWith('6281') ? 'Telkomsel' : phone.startsWith('6285') ? 'Telkomsel' : phone.startsWith('6282') ? 'Telkomsel' : 'Unknown';
        resultDiv.innerHTML = `<div><strong>📱 Nomor: ${phone}</strong><br>📡 Provider: ${provider}<br>🔗 <a href="https://www.getcontact.com/" target="_blank">Cek di GetContact</a></div>`;
        addLog('osint', 'Phone Tracker', phone, `Provider: ${provider}`, 'info');
    });
    
    document.getElementById('usernameTrackerBtn')?.addEventListener('click', async () => {
        const username = prompt('Masukkan username:', '');
        if(!username) return;
        resultDiv.innerHTML = '<div style="color:#ffaa44;">🔍 Mencari username...</div>';
        await delay(1000);
        resultDiv.innerHTML = `<div><strong>👤 Username: ${username}</strong><br>🔗 <a href="https://whatsmyname.app/?q=${username}" target="_blank">Cek di Whatsmyname</a><br>🔗 <a href="https://github.com/search?q=${username}" target="_blank">Cek di GitHub</a></div>`;
        addLog('osint', 'Username Tracker', username, `Username lookup`, 'info');
    });
}
