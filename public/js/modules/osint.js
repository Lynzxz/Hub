// ==================== OSINT FIX - REAL API ====================
function renderOSINT(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-ghost"></i> GHOSTTRACK - OSINT with Terminal</h3>
            <p style="font-size:12px; color:#ffaa44;">🔥 Data REAL dari API - Terminal di dalam dashboard</p>
            
            <div style="display: grid; grid-template-columns: repeat(2,1fr); gap:15px; margin:15px 0;">
                <button id="menuIPTracker" style="background:#1a2a3a; padding:15px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-map-marker-alt"></i> 📍 IP Tracker
                </button>
                <button id="menuShowMyIP" style="background:#1a2a3a; padding:15px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-eye"></i> 🌐 Show My IP
                </button>
                <button id="menuPhoneTracker" style="background:#1a2a3a; padding:15px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-phone-alt"></i> 📱 Phone Tracker
                </button>
                <button id="menuUsernameTracker" style="background:#1a2a3a; padding:15px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-user"></i> 👤 Username Tracker
                </button>
            </div>
            
            <div id="osintInputArea" style="background:#0a1a2a; padding:15px; border-radius:12px; margin-bottom:15px;"></div>
            <div style="border:2px solid #0ff; border-radius:12px; background:#000;">
                <div style="background:#0a2a3a; padding:8px; border-bottom:1px solid #0ff;">
                    <i class="fas fa-terminal"></i> GhostTrack Terminal
                </div>
                <div id="osintTerminal" style="height:300px; overflow-y:auto; padding:12px; font-family:monospace; font-size:12px; color:#0f0; background:#000;"></div>
            </div>
        </div>
    `;
    
    const terminal = document.getElementById('osintTerminal');
    const inputArea = document.getElementById('osintInputArea');
    
    function addToTerminal(text, type = 'output') {
        const colors = {command: '#ffaa44', error: '#ff6666', success: '#88ff88', output: '#0f0'};
        const prefix = type === 'command' ? '$> ' : '';
        terminal.innerHTML += `<div style="color:${colors[type] || '#0f0'}">${prefix}${text}</div>`;
        terminal.scrollTop = terminal.scrollHeight;
        if(terminal.children.length > 100) terminal.removeChild(terminal.children[0]);
    }
    
    function clearTerminal() {
        terminal.innerHTML = '<div>> GhostTrack OSINT Terminal v2.0</div><div>> ==========================================</div>';
    }
    
    // ==================== IP TRACKER (FIX PAKE ipapi.co) ====================
    function showIPTracker() {
        inputArea.innerHTML = `
            <label style="color:#0ff;">🌐 Masukkan IP Address</label>
            <div style="display:flex; gap:10px; margin-top:8px;">
                <input type="text" id="ipInput" placeholder="Contoh: 8.8.8.8" style="flex:1; padding:12px; background:#000; border:1px solid #0ff; color:#0f0; border-radius:8px;">
                <button id="trackIPBtn" style="background:#0ff; color:#000; padding:12px 24px; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">TRACK</button>
            </div>
            <small style="color:#aaa;">Gunakan ipapi.co untuk hasil akurat</small>
        `;
        
        document.getElementById('trackIPBtn')?.addEventListener('click', async () => {
            const ip = document.getElementById('ipInput')?.value.trim();
            if(!ip) {
                addToTerminal('❌ Masukkan IP address!', 'error');
                return;
            }
            
            addToTerminal(`>>> Tracking IP: ${ip}`, 'command');
            addToTerminal('Mengambil data dari ipapi.co...', 'output');
            
            try {
                // Pakai ipapi.co yang lebih stabil dan pake HTTPS
                const res = await fetch(`https://ipapi.co/${ip}/json/`);
                const data = await res.json();
                
                if(data.error) {
                    addToTerminal(`❌ Error: ${data.reason || data.error}`, 'error');
                    addToTerminal(`💡 Coba cek manual: https://ipinfo.io/${ip}`, 'output');
                    return;
                }
                
                addToTerminal('=========================================', 'output');
                addToTerminal(`📡 IP Target    : ${data.ip}`, 'success');
                addToTerminal(`📍 Country      : ${data.country_name} (${data.country_code})`, 'output');
                addToTerminal(`🏙️ City         : ${data.city || '-'}`, 'output');
                addToTerminal(`🗺️ Region       : ${data.region || '-'}`, 'output');
                addToTerminal(`📍 Koordinat    : ${data.latitude}, ${data.longitude}`, 'output');
                addToTerminal(`📮 Postal       : ${data.postal || '-'}`, 'output');
                addToTerminal(`🔌 ISP          : ${data.org || '-'}`, 'output');
                addToTerminal(`🌐 ASN          : ${data.asn || '-'}`, 'output');
                addToTerminal(`📱 Mobile       : ${data.mobile ? 'Ya (IP HP/Seluler)' : 'Tidak (IP Kabel/WiFi)'}`, 'output');
                addToTerminal(`🗺️ Maps         : https://www.google.com/maps?q=${data.latitude},${data.longitude}`, 'output');
                addToTerminal('=========================================', 'output');
                
                addLog('osint', 'IP Tracker', ip, `IP ${ip} tracked - ${data.city}, ${data.country_name}`, 'success');
            } catch(e) {
                addToTerminal(`❌ Error: ${e.message}`, 'error');
                addToTerminal(`💡 Coba cek manual: https://ipinfo.io/${ip}`, 'output');
            }
        });
    }
    
    // ==================== SHOW MY IP ====================
    async function showMyIP() {
        inputArea.innerHTML = `
            <div style="text-align:center;">
                <button id="getMyIPBtn" style="background:#0ff; color:#000; padding:12px 24px; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">🔍 AMBIL IP SAYA</button>
            </div>
            <small style="color:#aaa;">Menampilkan IP publik dan estimasi lokasi</small>
        `;
        
        document.getElementById('getMyIPBtn')?.addEventListener('click', async () => {
            addToTerminal('>>> Mengambil IP publik...', 'command');
            try {
                const res = await fetch('https://api.ipify.org?format=json');
                const data = await res.json();
                addToTerminal(`🌐 IP Publik Anda: ${data.ip}`, 'success');
                
                addToTerminal('Mengambil estimasi lokasi...', 'output');
                const geoRes = await fetch(`https://ipapi.co/${data.ip}/json/`);
                const geo = await geoRes.json();
                if(!geo.error) {
                    addToTerminal(`📍 Lokasi: ${geo.city}, ${geo.region}, ${geo.country_name}`, 'output');
                    addToTerminal(`🔌 ISP: ${geo.org}`, 'output');
                    addToTerminal(`📱 Tipe: ${geo.mobile ? 'Seluler (HP/Modem)' : 'Kabel/WiFi'}`, 'output');
                } else {
                    addToTerminal(`⚠️ Tidak bisa ambil lokasi: ${geo.reason}`, 'error');
                }
                addLog('osint', 'Show My IP', data.ip, `IP publik: ${data.ip}`, 'info');
            } catch(e) {
                addToTerminal(`❌ Error: ${e.message}`, 'error');
            }
        });
    }
    
    // ==================== PHONE TRACKER ====================
    function showPhoneTracker() {
        inputArea.innerHTML = `
            <label style="color:#0ff;">📱 Masukkan Nomor Telepon</label>
            <div style="display:flex; gap:10px; margin-top:8px;">
                <input type="text" id="phoneInput" placeholder="Contoh: 628123456789" style="flex:1; padding:12px; background:#000; border:1px solid #0ff; color:#0f0; border-radius:8px;">
                <button id="trackPhoneBtn" style="background:#0ff; color:#000; padding:12px 24px; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">CEK</button>
            </div>
            <small style="color:#aaa;">Deteksi provider berdasarkan prefix</small>
        `;
        
        document.getElementById('trackPhoneBtn')?.addEventListener('click', () => {
            let phone = document.getElementById('phoneInput')?.value.trim();
            if(!phone) {
                addToTerminal('❌ Masukkan nomor telepon!', 'error');
                return;
            }
            
            addToTerminal(`>>> Mencari info nomor: ${phone}`, 'command');
            
            let number = phone;
            if(phone.startsWith('62')) number = phone.substring(2);
            else if(phone.startsWith('0')) number = phone.substring(1);
            
            const prefixes = {
                '0811':'Telkomsel','0812':'Telkomsel','0813':'Telkomsel','0821':'Telkomsel','0822':'Telkomsel','0823':'Telkomsel',
                '0851':'Telkomsel','0852':'Telkomsel','0853':'Telkomsel','0854':'Telkomsel','0855':'Telkomsel','0856':'Telkomsel',
                '0857':'Telkomsel','0858':'Telkomsel','0859':'Telkomsel',
                '0814':'Indosat','0815':'Indosat','0816':'Indosat','0855':'Indosat','0856':'Indosat','0857':'Indosat','0858':'Indosat',
                '0817':'XL','0818':'XL','0819':'XL','0877':'XL','0878':'XL','0879':'XL',
                '0831':'Axis','0832':'Axis','0833':'Axis','0838':'Axis',
                '0895':'Three','0896':'Three','0897':'Three','0898':'Three','0899':'Three'
            };
            
            const prefix = number.substring(0,4);
            const provider = prefixes[prefix] || 'Tidak diketahui';
            
            addToTerminal('=========================================', 'output');
            addToTerminal(`📱 Nomor        : ${phone}`, 'output');
            addToTerminal(`🌍 Country Code : +62 (Indonesia)`, 'output');
            addToTerminal(`📡 Provider     : ${provider}`, 'output');
            addToTerminal(``, 'output');
            addToTerminal(`🔗 Cek lebih lanjut di:`, 'output');
            addToTerminal(`   • GetContact (app): https://www.getcontact.com/`, 'output');
            addToTerminal(`   • Truecaller: https://www.truecaller.com/`, 'output');
            addToTerminal(`   • Cek via web: https://www.infokomsel.com/`, 'output');
            addToTerminal('=========================================', 'output');
            
            addLog('osint', 'Phone Tracker', phone, `Phone lookup: ${phone} (${provider})`, 'info');
        });
    }
    
    // ==================== USERNAME TRACKER ====================
    function showUsernameTracker() {
        inputArea.innerHTML = `
            <label style="color:#0ff;">👤 Masukkan Username</label>
            <div style="display:flex; gap:10px; margin-top:8px;">
                <input type="text" id="userInput" placeholder="Contoh: johndoe" style="flex:1; padding:12px; background:#000; border:1px solid #0ff; color:#0f0; border-radius:8px;">
                <button id="trackUserBtn" style="background:#0ff; color:#000; padding:12px 24px; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">CEK</button>
            </div>
            <small style="color:#aaa;">Cek username di 300+ platform via whatsmyname.app</small>
        `;
        
        document.getElementById('trackUserBtn')?.addEventListener('click', async () => {
            const username = document.getElementById('userInput')?.value.trim();
            if(!username) {
                addToTerminal('❌ Masukkan username!', 'error');
                return;
            }
            
            addToTerminal(`>>> Mencari username: ${username} di platform sosial media`, 'command');
            addToTerminal('Mengakses whatsmyname.app API...', 'output');
            
            try {
                const res = await fetch(`https://whatsmyname.app/api/v1/username?username=${username}`);
                const data = await res.json();
                
                addToTerminal('=========================================', 'output');
                addToTerminal(`👤 Username : ${username}`, 'success');
                
                if(data.sites && data.sites.length > 0) {
                    const found = data.sites.filter(s => s.exists);
                    if(found.length > 0) {
                        addToTerminal(`✅ Ditemukan di ${found.length} platform:`, 'success');
                        found.slice(0, 15).forEach(site => {
                            addToTerminal(`   • ${site.name}: ${site.uri_check}`, 'output');
                        });
                        if(found.length > 15) addToTerminal(`   ... dan ${found.length - 15} lainnya`, 'output');
                    } else {
                        addToTerminal(`⚠️ Tidak ditemukan di platform yang discan`, 'output');
                        addToTerminal(`🔗 Cek manual: https://whatsmyname.app/?q=${username}`, 'output');
                    }
                } else {
                    addToTerminal(`⚠️ Tidak bisa mengambil data, cek manual:`, 'output');
                    addToTerminal(`🔗 https://whatsmyname.app/?q=${username}`, 'output');
                }
                addToTerminal('=========================================', 'output');
                
                addLog('osint', 'Username Tracker', username, `Username check: ${username}`, 'info');
            } catch(e) {
                addToTerminal(`⚠️ API error: ${e.message}`, 'error');
                addToTerminal(`🔗 Cek manual: https://whatsmyname.app/?q=${username}`, 'output');
            }
        });
    }
    
    // ==================== EVENT LISTENER ====================
    document.getElementById('menuIPTracker')?.addEventListener('click', () => {
        clearTerminal();
        showIPTracker();
        addToTerminal('Mode: IP Tracker aktif. Masukkan IP target.', 'success');
    });
    
    document.getElementById('menuShowMyIP')?.addEventListener('click', () => {
        clearTerminal();
        showMyIP();
        addToTerminal('Mode: Show My IP. Klik tombol untuk melihat IP publik Anda.', 'success');
    });
    
    document.getElementById('menuPhoneTracker')?.addEventListener('click', () => {
        clearTerminal();
        showPhoneTracker();
        addToTerminal('Mode: Phone Tracker aktif. Masukkan nomor telepon.', 'success');
    });
    
    document.getElementById('menuUsernameTracker')?.addEventListener('click', () => {
        clearTerminal();
        showUsernameTracker();
        addToTerminal('Mode: Username Tracker aktif. Masukkan username target.', 'success');
    });
    
    // Default tampilkan IP Tracker
    showIPTracker();
    addToTerminal('GhostTrack siap digunakan! Klik menu di atas.');
}
