// ==================== DEFACE GENERATOR ====================
function renderDeface(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-paint-roller"></i> Deface Generator</h3>
            <div class="input-group-module">
                <label>🎭 Deface Title</label>
                <input type="text" id="defaceTitle" value="HACKED BY LYNZXZ" style="width:100%;">
            </div>
            <div class="input-group-module">
                <label>💬 Message</label>
                <textarea id="defaceMessage" rows="2">Security is a myth</textarea>
            </div>
            <div class="input-group-module">
                <label>👤 Hacker Name</label>
                <input type="text" id="defaceHacker" value="@LynzxzCreator" style="width:100%;">
            </div>
            <button class="btn-primary" id="generateDefaceBtn">🎨 GENERATE DEFACE</button>
            <div id="defaceResult" style="margin-top:20px; background:#000; padding:15px; border-radius:8px; font-family:monospace;"></div>
        </div>
    `;
    
    function generateHTML() {
        const title = document.getElementById('defaceTitle').value;
        const message = document.getElementById('defaceMessage').value;
        const hacker = document.getElementById('defaceHacker').value;
        return `<!DOCTYPE html><html><head><title>${title}</title><style>body{background:black;color:red;text-align:center;padding-top:20%;font-family:monospace;}h1{font-size:4em;}</style></head><body><h1>${title}</h1><h2>${message}</h2><h3>~ ${hacker} ~</h3><p>${new Date()}</p></body></html>`;
    }
    
    function downloadDeface() {
        const html = generateHTML();
        const blob = new Blob([html], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `deface_${Date.now()}.html`;
        a.click();
        URL.revokeObjectURL(url);
        addLog('generator', 'Deface', '-', 'Deface page generated', 'success');
    }
    
    document.getElementById('generateDefaceBtn')?.addEventListener('click', () => {
        const resultDiv = document.getElementById('defaceResult');
        resultDiv.innerHTML = `<div style="border-left:3px solid #0f0; padding-left:12px;"><strong>✅ Deface page generated!</strong></div><div>Klik tombol di bawah untuk download.</div><button class="btn-primary" id="downloadBtn" style="margin-top:10px;">💾 DOWNLOAD</button>`;
        document.getElementById('downloadBtn')?.addEventListener('click', downloadDeface);
    });
}
