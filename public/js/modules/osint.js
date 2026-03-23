// ==================== OSINT WITH REAL API ====================
// Created by @LynzxzCreator
// Pake ip-api.com (akurat buat Indonesia)
// Terminal di dalam dashboard, bisa di HP

function renderOSINT(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-ghost"></i> GHOSTTRACK - OSINT with Terminal</h3>
            <p style="font-size:12px; color:#ffaa44; margin-bottom:15px;">
                🔥 Terminal di dalam dashboard! Data REAL dari API.
                <br>📌 Klik menu, masukkan data, hasil langsung keluar.
            </p>
            
            <!-- 4 MENU UTAMA (WARNA TERANG) -->
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                <button id="menuIPTracker" style="padding:15px; background:#1a2a3a; border:2px solid #00ccff; border-radius:12px; cursor:pointer; color:white; font-weight:bold;">
                    <i class="fas fa-map-marker-alt" style="font-size:28px; color:#00ccff;"></i>
                    <h3 style="margin:10px 0 5px; color:white;">IP Tracker</h3>
                    <small style="color:#aaa;">Lacak lokasi IP address (Real)</small>
                </button>
                <button id="menuShowMyIP" style="padding:15px; background:#1a2a3a; border:2px solid #00ccff; border-radius:12px; cursor:pointer; color:white; font-weight:bold;">
                    <i class="fas fa-eye" style="font-size:28px; color:#00ccff;"></i>
                    <h3 style="margin:10px 0 5px; color:white;">Show My IP</h3>
                    <small style="color:#aaa;">Lihat IP publik sendiri</small>
                </button>
                <button id="menuPhoneTracker" style="padding:15px; background:#1a2a3a; border:2px solid #00ccff; border-radius:12px; cursor:pointer; color:white; font-weight:bold;">
                    <i class="fas fa-phone-alt" style="font-size:28px; color:#00ccff;"></i>
                    <h3 style="margin:10px 0 5px; color:white;">Phone Tracker</h3>
                    <small style="color:#aaa;">Validasi & cari info nomor</small>
                </button>
                <button id="menuUsernameTracker" style="padding:15px; background:#1a2a3a; border:2px solid #00ccff; border-radius:12px; cursor:pointer; color:white; font-weight:bold;">
                    <i class="fas fa-user" style="font-size:28px; color:#00ccff;"></i>
                    <h3 style="margin:10px 0 5px; color:white;">Username Tracker</h3>
                    <small style="color:#aaa;">Cari username di sosial media</small>
                </button>
            </div>
            
            <!-- INPUT AREA -->
            <div id="osintInputArea" style="background:#0a1a2a; padding:15px; border-radius:12px; margin-bottom:15px; border:1px solid #00ccff;">
                <div style="text-align:center; color:#00ccff;">👆 Klik menu di atas, lalu masukkan data</div>
            </div>
            
            <!-- TERMINAL EMULATOR -->
            <div style="border: 2px solid #00ccff; border-radius: 12px; background: #000; overflow: hidden;">
                <div style="background: #0a2a3a; padding: 8px 12px; border-bottom: 1px solid #00ccff; font-family: monospace; font-size: 12px; color: #00ccff;">
                    <i class="fas fa-terminal"></i> GhostTrack Terminal <span style="color:#0f0;">●</span> Ready
                </div>
                <div id="osintTerminal" style="height: 350px; overflow-y: auto; padding: 12px; font-family: 'Courier New', monospace; font-size: 12px; color: #0f0; background: #000;">
                    <div>> GhostTrack OSINT Terminal v2.0</div>
                    <div>> Klik menu di atas untuk memulai tracking</div>
                    <div>> ==========================================</div>
                </div>
            </div>
        </div>
    `;
    
    const terminalDiv = document.getElementById('osintTerminal');
    const inputArea = document.getElementById('osintInputArea');
    
    function addToTerminal(text, type = 'output') {
        const line = document.createElement('div');
        if (type === 'command') {
            line.innerHTML = `<span style="color:#ffaa44;">$></span> ${text}`;
        } else if (type === 'error') {
            line.innerHTML = `<span style="color:#ff6666;">[!]</span> ${text}`;
        } else if (type === 'success') {
            line.innerHTML = `<span style="color:#88ff88;">[✓]</span> ${text}`;
        } else if (type === 'warning') {
            line.innerHTML = `<span style="color:#ffaa44;">[⚠️]</span> ${text}`;
        } else {
            line.innerHTML = text;
        }
        terminalDiv.appendChild(line);
        line.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    
    function clearTerminal() {
        terminalDiv.innerHTML = '';
        addToTerminal('GhostTrack OSINT Terminal v2.0');
        addToTerminal('Klik menu di atas untuk memulai tracking');
        addToTerminal('==========================================');
    }
    
    // ========== IP TRACKER (PAKE ip-api.com, AKURAT) ==========
    function showIPTracker() {
        inputArea.innerHTML = `
            <label style="color:#00ccff;">🌐 Masukkan IP Address</label>
            <div style="display: flex; gap: 10px; margin-top: 8px;">
                <input type="text" id="ipTargetInput" placeholder="Contoh: 8.8.8.8 atau 180.244.0.0" style="flex:1; padding:12px; background:#000; border:1px solid #00ccff; color:#0f0; border-radius:8px; font-size:14px;">
                <button id="runIPTrackBtn" style="background:#00ccff; color:#000; padding:12px 24px; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">TRACK</button>
            </div>
            <small style="color:#aaa;">⚠️ IP hanya estimasi lokasi dalam radius beberapa kilometer, bukan GPS!</small>
        `;
        
        document.getElementById('runIPTrackBtn')?.addEventListener('click', async () => {
            const ip = document.getElementById('ipTargetInput')?.value.trim();
            if (!ip) {
                addToTerminal('Masukkan IP address!', 'error');
                return;
            }
            
            addToTerminal(`>>> Memulai tracking IP: ${ip}`, 'command');
            addToTerminal('Mengambil data dari ip-api.com...', 'output');
            
            try {
                const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,zip,lat,lon,isp,org,as,mobile,proxy,hosting,query`);
                const data = await res.json();
                
                if (data.status === 'fail') {
                    addToTerminal(`Error: ${data.message || 'IP tidak valid'}`, 'error');
                    return;
                }
                
                let radiusText = '';
                if (data.mobile) {
                    radiusText = '📍 Estimasi radius: 500m - 5km (IP seluler)';
                } else {
                    radiusText = '📍 Estimasi radius: 10km - 50km (IP kabel/ISP)';
                }
                
                addToTerminal('=========================================', 'output');
                addToTerminal(`📡 IP Target    : ${data.query}`, 'success');
                addToTerminal(`📍 Country      : ${data.country || '-'}`, 'output');
                addToTerminal(`🏙️ City         : ${data.city || '-'}`, 'output');
                addToTerminal(`🗺️ Region       : ${data.regionName || '-'}`, 'output');
                addToTerminal(`📮 Postal       : ${data.zip || '-'}`, 'output');
                addToTerminal(`📍 Koordinat    : ${data.lat || '-'}, ${data.lon || '-'}`, 'output');
                addToTerminal(`🎯 Akurasi      : ${radiusText}`, 'output');
                addToTerminal(`🔌 ISP          : ${data.isp || '-'}`, 'output');
                addToTerminal(`📱 Mobile       : ${data.mobile ? 'Ya (IP HP/Seluler)' : 'Tidak (IP Kabel/WiFi)'}`, 'output');
                addToTerminal(`🗺️ Maps         : https://www.google.com/maps?q=${data.lat},${data.lon}`, 'output');
                addToTerminal('=========================================', 'output');
                addToTerminal('⚠️ Catatan: IP hanya estimasi lokasi provider, bukan lokasi persis perangkat!', 'warning');
                
                addLog('osint', 'IP Tracker', ip, `IP ${ip} tracked - ${data.city}, ${data.country} (${data.mobile ? 'mobile' : 'fixed'})`, 'success');
            } catch (e) {
                addToTerminal(`Gagal mengambil data: ${e.message}`, 'error');
            }
        });
    }
    
    // ========== SHOW MY IP ==========
    async function showMyIP() {
        inputArea.innerHTML = `
            <div style="text-align:center;">
                <button id="getMyIPBtn" style="background:#00ccff; color:#000; padding:12px 24px; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">🔍 AMBIL IP SAYA</button>
            </div>
            <small style="color:#aaa;">⚠️ IP yang ditampilkan adalah IP publik, lokasi adalah estimasi provider internet.</small>
        `;
        
        document.getElementById('getMyIPBtn')?.addEventListener('click', async () => {
            addToTerminal('>>> Mengambil IP publik...', 'command');
            try {
                const res = await fetch('https://api.ipify.org?format=json');
                const data = await res.json();
                addToTerminal(`🌐 IP Publik Anda: ${data.ip}`, 'success');
                
                addToTerminal('Mengambil estimasi lokasi dari provider...', 'output');
                const geoRes = await fetch(`http://ip-api.com/json/${data.ip}?fields=status,country,regionName,city,isp,lat,lon,mobile`);
                const geo = await geoRes.json();
                if (geo.status === 'success') {
                    let deviceType = geo.mobile ? 'Perangkat Seluler (HP/Modem)' : 'Perangkat Kabel/WiFi';
                    addToTerminal(`📍 Estimasi Lokasi: ${geo.city}, ${geo.regionName}, ${geo.country}`, 'output');
                    addToTerminal(`🔌 ISP: ${geo.isp}`, 'output');
                    addToTerminal(`📱 Tipe Koneksi: ${deviceType}`, 'output');
                    addToTerminal(`🎯 Catatan: Lokasi di atas adalah estimasi dari database provider, bukan lokasi GPS sebenarnya.`, 'warning');
                }
                addLog('osint', 'Show My IP', data.ip, `IP publik: ${data.ip}`, 'info');
            } catch (e) {
                addToTerminal(`Gagal: ${e.message}`, 'error');
            }
        });
    }
    
    // ========== PHONE TRACKER ==========
    function showPhoneTracker() {
        inputArea.innerHTML = `
            <label style="color:#00ccff;">📱 Masukkan Nomor Telepon</label>
            <div style="display: flex; gap: 10px; margin-top: 8px;">
                <input type="text" id="phoneTargetInput" placeholder="Contoh: 628123456789" style="flex:1; padding:12px; background:#000; border:1px solid #00ccff; color:#0f0; border-radius:8px; font-size:14px;">
                <button id="runPhoneTrackBtn" style="background:#00ccff; color:#000; padding:12px 24px; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">VALIDASI</button>
            </div>
            <small style="color:#aaa;">Validasi nomor + cek provider + link ke GetContact/Truecaller</small>
        `;
        
        document.getElementById('runPhoneTrackBtn')?.addEventListener('click', async () => {
            const phone = document.getElementById('phoneTargetInput')?.value.trim();
            if (!phone) {
                addToTerminal('Masukkan nomor telepon!', 'error');
                return;
            }
            
            addToTerminal(`>>> Mencari info nomor: ${phone}`, 'command');
            
            let countryCode = '62';
            let number = phone;
            if (phone.startsWith('62')) {
                countryCode = '62';
                number = phone.substring(2);
            } else if (phone.startsWith('0')) {
                number = phone.substring(1);
            }
            
            const prefixes = {
                '0811': 'Telkomsel', '0812': 'Telkomsel', '0813': 'Telkomsel', '0821': 'Telkomsel', '0822': 'Telkomsel', '0823': 'Telkomsel',
                '0851': 'Telkomsel', '0852': 'Telkomsel', '0853': 'Telkomsel', '0854': 'Telkomsel', '0855': 'Telkomsel', '0856': 'Telkomsel', '0857': 'Telkomsel', '0858': 'Telkomsel', '0859': 'Telkomsel',
                '0814': 'Indosat', '0815': 'Indosat', '0816': 'Indosat', '0855': 'Indosat', '0856': 'Indosat', '0857': 'Indosat', '0858': 'Indosat',
                '0817': 'XL', '0818': 'XL', '0819': 'XL', '0877': 'XL', '0878': 'XL', '0879': 'XL',
                '0831': 'Axis', '0832': 'Axis', '0833': 'Axis', '0838': 'Axis',
                '0895': 'Three', '0896': 'Three', '0897': 'Three', '0898': 'Three', '0899': 'Three'
            };
            
            let prefix = number.substring(0, 4);
            let provider = prefixes[prefix] || 'Tidak diketahui';
            
            addToTerminal('=========================================', 'output');
            addToTerminal(`📱 Nomor        : ${phone}`, 'output');
            addToTerminal(`🌍 Country Code : +${countryCode} (Indonesia)`, 'output');
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
    
    // ========== USERNAME TRACKER (REAL API) ==========
    function showUsernameTracker() {
        inputArea.innerHTML = `
            <label style="color:#00ccff;">👤 Masukkan Username</label>
            <div style="display: flex; gap: 10px; margin-top: 8px;">
                <input type="text" id="userTargetInput" placeholder="Contoh: johndoe" style="flex:1; padding:12px; background:#000; border:1px solid #00ccff; color:#0f0; border-radius:8px; font-size:14px;">
                <button id="runUserTrackBtn" style="background:#00ccff; color:#000; padding:12px 24px; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">CEK</button>
            </div>
            <small style="color:#aaa;">Cek username di 300+ platform sosial media via whatsmyname.app</small>
        `;
        
        document.getElementById('runUserTrackBtn')?.addEventListener('click', async () => {
            const username = document.getElementById('userTargetInput')?.value.trim();
            if (!username) {
                addToTerminal('Masukkan username!', 'error');
                return;
            }
            
            addToTerminal(`>>> Mencari username: ${username} di platform sosial media`, 'command');
            addToTerminal('Mengakses whatsmyname.app API...', 'output');
            
            try {
                const res = await fetch(`https://whatsmyname.app/api/v1/username?username=${username}`);
                const data = await res.json();
                
                addToTerminal('=========================================', 'output');
                addToTerminal(`👤 Username : ${username}`, 'success');
                
                if (data.sites && data.sites.length > 0) {
                    const found = data.sites.filter(s => s.exists);
                    if (found.length > 0) {
                        addToTerminal(`✅ Ditemukan di ${found.length} platform:`, 'success');
                        found.slice(0, 15).forEach(site => {
                            addToTerminal(`   • ${site.name}: ${site.uri_check}`, 'output');
                        });
                        if (found.length > 15) addToTerminal(`   ... dan ${found.length - 15} lainnya`, 'output');
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
            } catch (e) {
                addToTerminal(`⚠️ API error: ${e.message}`, 'error');
                addToTerminal(`🔗 Cek manual: https://whatsmyname.app/?q=${username}`, 'output');
            }
        });
    }
    
    // ========== PASANG EVENT KE MENU ==========
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