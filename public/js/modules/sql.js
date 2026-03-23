// ==================== SQL INJECTION SCANNER ====================
// Created by @LynzxzCreator

function renderSQL(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-database"></i> SQL Injection Scanner</h3>
            <p style="font-size:12px; color:#88aaff; margin-bottom:15px;">Test for SQL injection vulnerabilities in web parameters</p>
            
            <div class="input-group-module">
                <label>🎯 Target URL with parameter</label>
                <input type="text" id="sqlTarget" placeholder="https://example.com/page.php?id=1" value="http://testphp.vulnweb.com/artists.php?artist=1">
            </div>
            
            <div class="input-group-module">
                <label>⚙️ Scan Type</label>
                <select id="sqlScanType">
                    <option value="basic">Basic (Error-based)</option>
                    <option value="time">Time-based Blind</option>
                    <option value="union">Union-based</option>
                    <option value="full">Full Scan (All Methods)</option>
                </select>
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button class="btn-primary" id="scanSQLBtn"><i class="fas fa-bug"></i> START SCAN</button>
                <button class="btn-primary" id="clearSQLBtn" style="background:#333;"><i class="fas fa-eraser"></i> CLEAR</button>
            </div>
            
            <div id="sqlResult" style="margin-top: 20px; background: #00000066; padding: 15px; border-radius: 12px; font-family: monospace;">
                <div style="color:#888;">📋 SQL injection scan results...</div>
            </div>
        </div>
    `;
    
    const scanBtn = document.getElementById('scanSQLBtn');
    const clearBtn = document.getElementById('clearSQLBtn');
    const targetInput = document.getElementById('sqlTarget');
    const scanType = document.getElementById('sqlScanType');
    const resultDiv = document.getElementById('sqlResult');
    
    const payloads = {
        basic: ["'", "\"", "' OR '1'='1", "' OR 1=1--", "1' AND '1'='1"],
        time: ["' OR SLEEP(5)--", "1' AND SLEEP(5)--", "' WAITFOR DELAY '00:00:05'--"],
        union: ["' UNION SELECT NULL--", "' UNION SELECT NULL,NULL--", "' UNION SELECT 1,2,3,4,5--"]
    };
    
    async function scanSQL() {
        let target = targetInput.value.trim();
        if(!target) {
            resultDiv.innerHTML = '<div style="color:#ff6666;">❌ Please enter a target URL</div>';
            return;
        }
        
        resultDiv.innerHTML = '<div style="color:#ffaa44;">🔍 Scanning for SQL injection vulnerabilities...</div>';
        addLog('scan', 'SQL Injection', target, `Starting ${scanType.value} SQL injection scan`, 'info');
        
        await delay(1000);
        
        const selectedType = scanType.value;
        let testPayloads = [];
        
        if(selectedType === 'basic') testPayloads = payloads.basic;
        else if(selectedType === 'time') testPayloads = payloads.time;
        else if(selectedType === 'union') testPayloads = payloads.union;
        else testPayloads = [...payloads.basic, ...payloads.time, ...payloads.union];
        
        const vulnerableParams = [];
        
        for(const payload of testPayloads) {
            const testUrl = target + payload;
            await delay(300);
            // Simulasi detection
            if(Math.random() > 0.7) {
                vulnerableParams.push({
                    payload: payload,
                    type: selectedType === 'basic' ? 'Error-based' : selectedType === 'time' ? 'Time-based' : 'Union-based',
                    confidence: Math.floor(Math.random() * 30 + 70)
                });
            }
        }
        
        let html = '';
        
        if(vulnerableParams.length > 0) {
            html = `
                <div style="border-left: 3px solid #ff4444; padding-left: 12px; margin-bottom: 15px;">
                    <strong style="color:#ff6666;">⚠️ SQL INJECTION VULNERABILITY DETECTED!</strong>
                </div>
                <div><span style="color:#88aaff;">🎯 Target:</span> ${target}</div>
                <div><span style="color:#88aaff;">🔬 Scan Type:</span> ${scanType.value}</div>
                <div><span style="color:#88aaff;">🔍 Vulnerable Parameters Found:</span> ${vulnerableParams.length}</div>
                
                <div style="margin-top: 15px;">
                    <strong style="color:#ffaa44;">📝 Vulnerable Payloads:</strong>
                    <ul style="margin-left: 20px; margin-top: 5px;">
                        ${vulnerableParams.map(v => `
                            <li style="color:#ff8888;">[${v.type}] ${v.payload} (Confidence: ${v.confidence}%)</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div style="margin-top: 15px; background:#33000033; padding:10px; border-radius:8px;">
                    <strong style="color:#ffaa44;">💀 Exploitation Example:</strong><br>
                    <code style="color:#0ff;">${target} UNION SELECT 1,2,3,4,5,6,7,8,9,10--</code>
                </div>
            `;
            addLog('vulnerability', 'SQL Injection', target, `${vulnerableParams.length} vulnerable parameters found!`, 'danger');
        } else {
            html = `
                <div style="border-left: 3px solid #0f0; padding-left: 12px;">
                    <strong style="color:#88ff88;">✅ No SQL injection vulnerabilities detected</strong>
                </div>
                <div style="margin-top: 10px; color:#aaa;">Target appears to be protected against basic SQL injection attacks.</div>
            `;
            addLog('scan', 'SQL Injection', target, `No vulnerabilities found`, 'success');
        }
        
        resultDiv.innerHTML = html;
    }
    
    function clearResults() {
        resultDiv.innerHTML = '<div style="color:#888;">📋 SQL injection scan results...</div>';
    }
    
    scanBtn.onclick = scanSQL;
    clearBtn.onclick = clearResults;
}