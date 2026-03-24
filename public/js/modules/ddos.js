// ==================== DDOS ATTACK ====================
function renderDdos(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-bolt"></i> DDoS Attack (Simulasi Edukasi)</h3>
            <div class="input-group-module">
                <label>🎯 Target URL</label>
                <input type="text" id="ddosTarget" placeholder="https://example.com" style="width:100%;">
            </div>
            <div class="input-group-module">
                <label>🧵 Threads (1-200)</label>
                <input type="number" id="ddosThreads" value="50" min="1" max="200" style="width:100%;">
            </div>
            <div class="input-group-module">
                <label>⏱️ Duration (seconds)</label>
                <input type="number" id="ddosDuration" value="10" min="5" max="60" style="width:100%;">
            </div>
            <button class="btn-primary" id="startDDoSBtn">🔥 START DDOS</button>
            <div id="ddosResult" style="margin-top:20px; background:#000; padding:15px; border-radius:8px; font-family:monospace;"></div>
        </div>
    `;
    
    function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
    
    async function startDDoS() {
        let target = document.getElementById('ddosTarget').value.trim();
        let threads = parseInt(document.getElementById('ddosThreads').value);
        let duration = parseInt(document.getElementById('ddosDuration').value);
        const resultDiv = document.getElementById('ddosResult');
        
        if(!target) { resultDiv.innerHTML = '<div style="color:#ff6666;">❌ Masukkan target URL!</div>'; return; }
        if(!canExecute(target)) return;
        
        resultDiv.innerHTML = `<div style="color:#ffaa44;">🔥 Memulai DDoS ke ${target} dengan ${threads} threads selama ${duration} detik...</div>`;
        addLog('attack', 'DDoS', target, `Starting ${threads} threads for ${duration}s`, 'info');
        
        let count = 0;
        const interval = setInterval(() => {
            count += threads;
            resultDiv.innerHTML = `<div style="color:#ffaa44;">🔥 Attack running: ${Math.floor(Date.now()/1000 - startTime)}s | Requests: ${count}</div>`;
        }, 1000);
        const startTime = Date.now()/1000;
        
        await delay(duration * 1000);
        clearInterval(interval);
        resultDiv.innerHTML = `<div style="border-left:3px solid #0f0; padding-left:12px;"><strong>✅ DDoS Attack Finished</strong></div><div>Total requests: ${count}</div>`;
        addLog('attack', 'DDoS', target, `Finished: ${count} requests`, 'success');
    }
    
    document.getElementById('startDDoSBtn')?.addEventListener('click', startDDoS);
}
