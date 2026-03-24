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
            if(!phone) return addToTerminal('Masukkan nomor!', '
