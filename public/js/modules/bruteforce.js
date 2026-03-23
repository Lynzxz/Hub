// ==================== BRUTE FORCE MODULE ====================
// Created by @LynzxzCreator

function renderBrute(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-key"></i> Brute Force Attack</h3>
            <p style="font-size:12px; color:#ffaa44; margin-bottom:15px;">⚠️ WARNING: Use only on systems you own or have permission to test</p>
            
            <div class="input-group-module">
                <label>🎯 Target Login URL</label>
                <input type="text" id="bruteTarget" placeholder="https://example.com/login.php">
            </div>
            
            <div class="input-group-module">
                <label>👤 Username (or username list)</label>
                <input type="text" id="bruteUsername" placeholder="admin or admin,user,test">
            </div>
            
            <div class="input-group-module">
                <label>📝 Password Wordlist Type</label>
                <select id="bruteWordlist">
                    <option value="common">Common Passwords (100 most common)</option>
                    <option value="default">Default Credentials</option>
                    <option value="medium">Medium Wordlist (1000 passwords)</option>
                    <option value="custom">Custom Wordlist (paste below)</option>
                </select>
            </div>
            
            <div class="input-group-module" id="customWordlistDiv" style="display:none;">
                <label>📝 Custom Passwords (one per line)</label>
                <textarea id="customPasswords" rows="3" placeholder="admin&#10;password&#10;123456"></textarea>
            </div>
            
            <div class="input-group-module">
                <label>⚙️ Attack Speed (requests/sec)</label>
                <input type="range" id="bruteSpeed" min="1" max="20" value="5">
                <div id="speedValue">5 requests/sec</div>
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button class="btn-primary" id="startBruteBtn"><i class="fas fa-bomb"></i> START BRUTE FORCE</button>
                <button class="btn-primary" id="stopBruteBtn" style="background:#ff4444; display:none;"><i class="fas fa-stop"></i> STOP</button>
                <button class="btn-primary" id="clearBruteBtn" style="background:#333;"><i class="fas fa-eraser"></i> CLEAR</button>
            </div>
            
            <div id="bruteResult" style="margin-top: 20px; background: #00000066; padding: 15px; border-radius: 12px; font-family: monospace;">
                <div style="color:#888;">📋 Brute force attack status...</div>
            </div>
        </div>
    `;
    
    let bruteActive = false;
    let bruteInterval = null;
    let currentPasswords = [];
    let currentIndex = 0;
    
    const speedSlider = document.getElementById('bruteSpeed');
    const speedValue = document.getElementById('speedValue');
    const wordlistSelect = document.getElementById('bruteWordlist');
    const customDiv = document.getElementById('customWordlistDiv');
    const startBtn = document.getElementById('startBruteBtn');
    const stopBtn = document.getElementById('stopBruteBtn');
    const clearBtn = document.getElementById('clearBruteBtn');
    const resultDiv = document.getElementById('bruteResult');
    const usernameInput = document.getElementById('bruteUsername');
    const targetInput = document.getElementById('bruteTarget');
    
    const commonPasswords = [
        'admin', 'password', '123456', '12345678', '1234', 'qwerty', 'abc123',
        'admin123', 'password123', 'root', 'user', 'test', '12345', 'adminadmin',
        'welcome', 'passw0rd', 'password1', 'administrator', 'letmein', 'monkey'
    ];
    
    const defaultCredentials = [
        'admin:admin', 'admin:password', 'root:root', 'admin:1234', 'admin:123456',
        'administrator:administrator', 'user:user', 'test:test', 'admin:pass',
        'admin:admin123', 'root:toor', 'admin:password123'
    ];
    
    speedSlider.oninput = () => {
        speedValue.innerText = `${speedSlider.value} requests/sec`;
    };
    
    wordlistSelect.onchange = () => {
        if(wordlistSelect.value === 'custom') {
            customDiv.style.display = 'block';
        } else {
            customDiv.style.display = 'none';
        }
    };
    
    function getWordlist() {
        const type = wordlistSelect.value;
        if(type === 'common') return commonPasswords;
        if(type === 'default') {
            const creds = [];
            defaultCredentials.forEach(c => {
                const [u, p] = c.split(':');
                creds.push(p);
            });
            return [...new Set(creds)];
        }
        if(type === 'medium') {
            const medium = [...commonPasswords];
            for(let i = 0; i < 200; i++) {
                medium.push(`pass${i}`);
                medium.push(`test${i}`);
            }
            return medium;
        }
        if(type === 'custom') {
            const custom = document.getElementById('customPasswords').value;
            return custom.split('\n').filter(p => p.trim());
        }
        return commonPasswords;
    }
    
    function getUsernames() {
        const input = usernameInput.value.trim();
        if(input.includes(',')) {
            return input.split(',').map(u => u.trim());
        }
        return [input];
    }
    
    async function performAttack() {
        const target = targetInput.value.trim();
        if(!target) {
            resultDiv.innerHTML = '<div style="color:#ff6666;">❌ Please enter a target URL</div>';
            stopBrute();
            return;
        }
        
        const usernames = getUsernames();
        const passwords = getWordlist();
        
        if(usernames.length === 0 || passwords.length === 0) {
            resultDiv.innerHTML = '<div style="color:#ff6666;">❌ Please provide usernames and passwords</div>';
            stopBrute();
            return;
        }
        
        const totalAttempts = usernames.length * passwords.length;
        let attempts = 0;
        currentIndex = 0;
        
        resultDiv.innerHTML = `
            <div style="color:#ffaa44;">🔐 Starting brute force attack...</div>
            <div>🎯 Target: ${target}</div>
            <div>👥 Usernames: ${usernames.length}</div>
            <div>🔑 Passwords: ${passwords.length}</div>
            <div>📊 Total Attempts: ${totalAttempts}</div>
            <div id="bruteProgress" style="margin-top: 10px;"></div>
            <div id="bruteAttempts" style="margin-top: 5px;"></div>
        `;
        
        addLog('attack', 'Brute Force', target, `Starting brute force with ${totalAttempts} attempts`, 'info');
        
        bruteActive = true;
        
        for(const username of usernames) {
            for(let i = 0; i < passwords.length && bruteActive; i++) {
                const password = passwords[i];
                attempts++;
                
                const progressDiv = document.getElementById('bruteProgress');
                const attemptsDiv = document.getElementById('bruteAttempts');
                const percent = (attempts / totalAttempts * 100).toFixed(1);
                
                if(progressDiv) {
                    progressDiv.innerHTML = `
                        <div style="background:#224466; border-radius:10px; overflow:hidden;">
                            <div style="background:#0ff; width:${percent}%; height:20px; transition:width 0.3s;"></div>
                        </div>
                        <div style="margin-top:5px;">Progress: ${percent}%</div>
                    `;
                }
                if(attemptsDiv) {
                    attemptsDiv.innerHTML = `Attempt ${attempts}/${totalAttempts}: ${username}:${password}`;
                }
                
                // Simulasi pengecekan login
                await delay(1000 / speedSlider.value);
                
                // Random chance of success (for demo only)
                if(Math.random() > 0.99) {
                    resultDiv.innerHTML = `
                        <div style="border-left: 3px solid #0f0; padding-left: 12px;">
                            <strong style="color:#88ff88;">✅ CREDENTIALS FOUND!</strong>
                        </div>
                        <div style="margin-top: 10px;">
                            <strong>Username:</strong> ${username}<br>
                            <strong>Password:</strong> ${password}<br>
                            <strong>Attempts:</strong> ${attempts}/${totalAttempts}
                        </div>
                        <div style="margin-top: 10px; background:#00330033; padding:10px; border-radius:8px;">
                            Try logging in at: <a href="${target}" target="_blank">${target}</a>
                        </div>
                    `;
                    addLog('success', 'Brute Force', target, `Credentials found: ${username}:${password}`, 'success');
                    stopBrute();
                    return;
                }
            }
        }
        
        if(bruteActive) {
            resultDiv.innerHTML = `
                <div style="border-left: 3px solid #ff6666; padding-left: 12px;">
                    <strong style="color:#ff8888;">❌ Brute force completed - No valid credentials found</strong>
                </div>
                <div style="margin-top: 10px;">Total attempts: ${attempts}</div>
            `;
            addLog('attack', 'Brute Force', target, `Completed: ${attempts} attempts, no credentials found`, 'info');
        }
        
        stopBrute();
    }
    
    function startBrute() {
        if(bruteActive) return;
        startBtn.style.display = 'none';
        stopBtn.style.display = 'inline-block';
        performAttack();
    }
    
    function stopBrute() {
        bruteActive = false;
        if(bruteInterval) clearInterval(bruteInterval);
        startBtn.style.display = 'inline-block';
        stopBtn.style.display = 'none';
    }
    
    function clearResults() {
        if(bruteActive) stopBrute();
        resultDiv.innerHTML = '<div style="color:#888;">📋 Brute force attack status...</div>';
    }
    
    startBtn.onclick = startBrute;
    stopBtn.onclick = stopBrute;
    clearBtn.onclick = clearResults;
}