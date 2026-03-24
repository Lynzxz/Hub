// ==================== OSINT FIX ====================
function renderOSINT(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-ghost"></i> GHOSTTRACK - OSINT with Terminal</h3>
            <p style="font-size:12px; color:#ffaa44;">🔥 Data REAL dari API HTTPS! Terminal di dalam dashboard.</p>
            
            <div style="display: grid; grid-template-columns: repeat(2,1fr); gap:15px; margin:15px 0;">
                <button id="menuIPTracker" style="background:#1a2a3a; padding:15px; border:1px solid #0ff; border-radius:8px;">📍 IP Tracker</button>
                <button id="menuShowMyIP" style="background:#1a2a3a; padding:15px; border:1px solid #0ff; border-radius:8px;">🌐 Show My IP</button>
                <button id="menuPhoneTracker" style="background:#1a2a3a; padding:15px; border:1px solid #0ff; border-radius:8px;">📱 Phone Tracker</button>
                <button id="menuUsernameTracker" style="background:#1a2a3a; padding:15px; border:1px solid #0ff; border-radius:8px;">👤 Username Tracker</button>
            </div>
            
            <div id="osintInputArea" style="background:#0a1a2a; padding:15px; border-radius:12px; margin-bottom:15px;"></div>
            <div style="border:2px solid #0ff; border-radius:12px; background:#000;">
                <div style="background:#0a2a3a; padding:8px;"><i class="fas fa-terminal"></i> GhostTrack Terminal</div>
                <div id="osintTerminal" style="height:300px; overflow-y:auto; padding:12px; font-family:monospace; font-size:12px; color:#0f0; background:#000;"></div>
            </div>
        </div>
    `;
    
    const terminal = document.getElementById('osintTerminal');
    const inputArea = document.getElementById('osintInputArea');
    
    function addToTerminal(text, type='output') {
        const colors = {command:'#ffaa44', error:'#ff6666', success:'#88ff88', output:'#0f0'};
        terminal.innerHTML += `<div style="color:${colors[type] || '#0f0'}">${type==='command'?'$> ':''}${text}</div>`;
        terminal.scrollTop = terminal.scrollHeight;
        if(terminal.children.length > 100) terminal.removeChild(terminal.children[0]);
    }
    
    function clearTerminal() {
        terminal.innerHTML = '<div>> GhostTrack OSINT Terminal v2.0</div><div>> ==========================================</div>';
    }
    
    // IP TRACKER (FIX PAKE HTTPS)
    function showIPTracker() {
        inputArea.innerHTML = `
            <label>🌐 IP Address</label>
            <div style="display:flex; gap:10px;">
                <input type="text" id="ipInput" placeholder="8.8.8.8" style="flex:1; padding:10px; background:#000; border:1px solid #0ff; color:#0f0;">
                <button id="trackIPBtn" style="background:#0ff; color:#000; padding:10px 20px;">TRACK</button>
            </div>
        `;
        document.getElementById('trackIPBtn')?.addEventListener('click', async () => {
            const ip = document.getElementById('ipInput')?.value.trim();
            if(!ip) return addToTerminal('Masukkan IP!', 'error');
            addToTerminal(`Tracking IP: ${ip}`, 'command');
            try {
                const res = await fetch(`https://ip-api.com/json/${ip}?fields=status,country,regionName,city,zip,lat,lon,isp,org,mobile,query`);
                const data = await res.json();
                if(data.status === 'fail') throw new Error(data.message);
                addToTerminal('=========================================', 'output');
                addToTerminal(`📡 IP Target: ${data.query}`, 'success');
                addToTerminal(`📍 Lokasi: ${data.city}, ${data.regionName}, ${data.country}`, 'output');
                addToTerminal(`🗺️ Koordinat: ${data.lat}, ${data.lon}`, 'output');
                addToTerminal(`🔌 ISP: ${data.isp || '-'}`, 'output');
                addToTerminal(`📱 Mobile: ${data.mobile ? 'Ya (IP HP/Seluler)' : 'Tidak (IP Kabel/WiFi)'}`, 'output');
                addToTerminal(`🗺️ Maps: https://www.google.com/maps?q=${data.lat},${data.lon}`, 'output');
                addToTerminal('=========================================', 'output');
            } catch(e) {
                addToTerminal(`Error: ${e.message}`, 'error');
            }
        });
    }
    
    // SHOW MY IP
    async function showMyIP() {
        inputArea.innerHTML = `<button id="getIPBtn" style="background:#0ff; color:#000; padding:10px 20px;">🔍 AMBIL IP SAYA</button>`;
        document.getElementById('getIPBtn')?.addEventListener('click', async () => {
            addToTerminal('Mengambil IP publik...', 'command');
            try {
                const res = await fetch('https://api.ipify.org?format=json');
                const data = await res.json();
                addToTerminal(`🌐 IP Publik Anda: ${data.ip}`, 'success');
                const geo = await fetch(`https://ip-api.com/json/${data.ip}?fields=city,regionName,country,isp`);
                const loc = await geo.json();
                if(loc.status === 'success') addToTerminal(`📍 Estimasi: ${loc.city}, ${loc.regionName}, ${loc.country} (${loc.isp})`, 'output');
            } catch(e) { addToTerminal(`Error: ${e.message}`, 'error'); }
        });
    }
    
    // PHONE TRACKER
    function showPhoneTracker() {
        inputArea.innerHTML = `
            <label>📱 Nomor Telepon</label>
            <div style="display:flex; gap:10px;">
                <input type="text" id="phoneInput" placeholder="628123456789" style="flex:1; padding:10px; background:#000; border:1px solid #0ff; color:#0f0;">
                <button id="trackPhoneBtn" style="background:#0ff; color:#000; padding:10px 20px;">CEK</button>
            </div>
        `;
        document.getElementById('trackPhoneBtn')?.addEventListener('click', () => {
            let phone = document.getElementById('phoneInput')?.value.trim();
            if(!phone) return addToTerminal('Masukkan nomor!', 'error');
            addToTerminal(`Mencari info nomor: ${phone}`, 'command');
            const prefixes = {
                '0811':'Telkomsel','0812':'Telkomsel','0813':'Telkomsel','0821':'Telkomsel','0822':'Telkomsel','0823':'Telkomsel',
                '0851':'Telkomsel','0852':'Telkomsel','0853':'Telkomsel','0854':'Telkomsel','0855':'Telkomsel','0856':'Telkomsel','0857':'Telkomsel','0858':'Telkomsel','0859':'Telkomsel',
                '0814':'Indosat','0815':'Indosat','0816':'Indosat','0855':'Indosat','0856':'Indosat','0857':'Indosat','0858':'Indosat',
                '0817':'XL','0818':'XL','0819':'XL','0877':'XL','0878':'XL','0879':'XL',
                '0831':'Axis','0832':'Axis','0833':'Axis','0838':'Axis',
                '0895':'Three','0896':'Three','0897':'Three','0898':'Three','0899':'Three'
            };
            let provider = prefixes[phone.substring(0,4)] || 'Tidak diketahui';
            addToTerminal('=========================================', 'output');
            addToTerminal(`📱 Nomor: ${phone}`, 'output');
            addToTerminal(`📡 Provider: ${provider}`, 'output');
            addToTerminal(`🔗 Cek lanjut: https://www.getcontact.com/ | https://www.truecaller.com/`, 'output');
            addToTerminal('=========================================', 'output');
        });
    }
    
    // USERNAME TRACKER
    function showUsernameTracker() {
        inputArea.innerHTML = `
            <label>👤 Username</label>
            <div style="display:flex; gap:10px;">
                <input type="text" id="userInput" placeholder="username" style="flex:1; padding:10px; background:#000; border:1px solid #0ff; color:#0f0;">
                <button id="trackUserBtn" style="background:#0ff; color:#000; padding:10px 20px;">CEK</button>
            </div>
        `;
        document.getElementById('trackUserBtn')?.addEventListener('click', async () => {
            const username = document.getElementById('userInput')?.value.trim();
            if(!username) return addToTerminal('Masukkan username!', 'error');
            addToTerminal(`Mencari username: ${username}`, 'command');
            try {
                const res = await fetch(`https://whatsmyname.app/api/v1/username?username=${username}`);
                const data = await res.json();
                addToTerminal('=========================================', 'output');
                addToTerminal(`👤 Username: ${username}`, 'success');
                if(data.sites) {
                    const found = data.sites.filter(s => s.exists);
                    if(found.length) {
                        addToTerminal(`✅ Ditemukan di ${found.length} platform:`, 'success');
                        found.slice(0,10).forEach(s => addToTerminal(`   • ${s.name}: ${s.uri_check}`, 'output'));
                    } else addToTerminal(`⚠️ Tidak ditemukan di platform yang discan`, 'output');
                } else addToTerminal(`🔗 Cek manual: https://whatsmyname.app/?q=${username}`, 'output');
                addToTerminal('=========================================', 'output');
            } catch(e) {
                addToTerminal(`🔗 Cek manual: https://whatsmyname.app/?q=${username}`, 'output');
            }
        });
    }
    
    // EVENT LISTENER
    document.getElementById('menuIPTracker')?.addEventListener('click', () => { clearTerminal(); showIPTracker(); addToTerminal('Mode: IP Tracker', 'success'); });
    document.getElementById('menuShowMyIP')?.addEventListener('click', () => { clearTerminal(); showMyIP(); addToTerminal('Mode: Show My IP', 'success'); });
    document.getElementById('menuPhoneTracker')?.addEventListener('click', () => { clearTerminal(); showPhoneTracker(); addToTerminal('Mode: Phone Tracker', 'success'); });
    document.getElementById('menuUsernameTracker')?.addEventListener('click', () => { clearTerminal(); showUsernameTracker(); addToTerminal('Mode: Username Tracker', 'success'); });
    
    showIPTracker();
    addToTerminal('GhostTrack siap! Klik menu di atas.');
}
