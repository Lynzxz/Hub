// ==================== DEFACE GENERATOR PRO ====================
// Created by @LynzxzCreator
// Inspired by script-deface-generator.prinsh.com

function renderDeface(container) {
    container.innerHTML = `
        <div class="module-card">
            <h3><i class="fas fa-paintbrush-fine"></i> Deface Generator Pro</h3>
            <p style="font-size:12px; color:#88aaff; margin-bottom:15px;">Generate custom deface page with live preview</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <!-- LEFT PANEL - CONFIGURATION -->
                <div>
                    <div class="input-group-module">
                        <label>🎭 Deface Title</label>
                        <input type="text" id="defaceTitle" value="HACKED BY LYNZXZ">
                    </div>
                    
                    <div class="input-group-module">
                        <label>💬 Main Message</label>
                        <textarea id="defaceMessage" rows="2">Your security has been compromised. Security is a myth.</textarea>
                    </div>
                    
                    <div class="input-group-module">
                        <label>👤 Hacker Name / Group</label>
                        <input type="text" id="defaceHacker" value="@LynzxzCreator">
                    </div>
                    
                    <div class="input-group-module">
                        <label>🎨 Background Style</label>
                        <select id="defaceBgStyle">
                            <option value="matrix">Matrix Rain (Green)</option>
                            <option value="blood">Blood Rain (Red)</option>
                            <option value="cyber">Cyber Blue (Neon)</option>
                            <option value="dark">Dark Void (Black)</option>
                            <option value="fire">Fire Blaze (Orange)</option>
                        </select>
                    </div>
                    
                    <div class="input-group-module">
                        <label>📀 Glitch Effect</label>
                        <select id="defaceGlitch">
                            <option value="heavy">Heavy Glitch</option>
                            <option value="medium">Medium Glitch</option>
                            <option value="light">Light Glitch</option>
                            <option value="none">No Glitch</option>
                        </select>
                    </div>
                    
                    <div class="input-group-module">
                        <label>🔊 Background Music (YouTube URL)</label>
                        <input type="text" id="defaceMusic" placeholder="https://youtube.com/embed/...">
                    </div>
                    
                    <div class="input-group-module">
                        <label>📝 Footer Text</label>
                        <input type="text" id="defaceFooter" value="© 2025 | Security Testing Only">
                    </div>
                    
                    <button class="btn-primary" id="downloadDefaceBtn" style="width:100%; margin-top:10px;">
                        <i class="fas fa-download"></i> DOWNLOAD DEFACE.HTML
                    </button>
                </div>
                
                <!-- RIGHT PANEL - LIVE PREVIEW -->
                <div>
                    <label style="color:#0ff;">📺 LIVE PREVIEW</label>
                    <div style="border: 2px solid #0ff; border-radius: 12px; overflow: hidden; margin-top: 8px;">
                        <iframe id="defacePreview" style="width:100%; height:400px; background:#000; border:none;"></iframe>
                    </div>
                    <p style="font-size:10px; color:#aaa; margin-top:8px;">Preview updates automatically</p>
                </div>
            </div>
        </div>
    `;
    
    // DOM elements
    const titleInput = document.getElementById('defaceTitle');
    const messageInput = document.getElementById('defaceMessage');
    const hackerInput = document.getElementById('defaceHacker');
    const bgStyle = document.getElementById('defaceBgStyle');
    const glitchStyle = document.getElementById('defaceGlitch');
    const musicInput = document.getElementById('defaceMusic');
    const footerInput = document.getElementById('defaceFooter');
    const previewFrame = document.getElementById('defacePreview');
    const downloadBtn = document.getElementById('downloadDefaceBtn');
    
    // Generate HTML function
    function generateDefaceHTML() {
        const title = titleInput.value || 'HACKED';
        const message = messageInput.value || 'Security is a myth';
        const hacker = hackerInput.value || '@LynzxzCreator';
        const bg = bgStyle.value;
        const glitch = glitchStyle.value;
        const music = musicInput.value;
        const footer = footerInput.value;
        
        // Background styles
        const bgStyles = {
            matrix: 'linear-gradient(135deg, #0a0f0a 0%, #003300 100%)',
            blood: 'linear-gradient(135deg, #1a0000 0%, #660000 100%)',
            cyber: 'linear-gradient(135deg, #001133 0%, #0066cc 100%)',
            dark: 'linear-gradient(135deg, #000000 0%, #111111 100%)',
            fire: 'linear-gradient(135deg, #331100 0%, #cc4400 100%)'
        };
        
        // Glitch animations
        const glitchAnim = {
            heavy: `
                @keyframes glitch {
                    0%,100%{transform:skew(0deg,0deg);text-shadow:0 0;}
                    25%{transform:skew(5deg,3deg);text-shadow:-3px 0 #ff0000,3px 0 #00ff00;}
                    75%{transform:skew(-3deg,-5deg);text-shadow:3px 0 #ff00ff,-3px 0 #00ffff;}
                }
                h1 { animation: glitch 0.3s infinite; }
            `,
            medium: `
                @keyframes glitch {
                    0%,100%{transform:skew(0deg);}
                    50%{transform:skew(2deg);text-shadow:-2px 0 #ff0000;}
                }
                h1 { animation: glitch 0.5s infinite; }
            `,
            light: `
                @keyframes glitch {
                    0%,100%{transform:skew(0deg);}
                    50%{transform:skew(1deg);}
                }
                h1 { animation: glitch 1s infinite; }
            `,
            none: ''
        };
        
        // Matrix rain effect for matrix background
        const matrixEffect = bg === 'matrix' ? `
            <canvas id="matrixCanvas" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;"></canvas>
            <script>
                const canvas = document.getElementById('matrixCanvas');
                const ctx = canvas.getContext('2d');
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&';
                const drops = [];
                for(let i=0; i<canvas.width/20; i++) drops.push(1);
                function draw() {
                    ctx.fillStyle = 'rgba(0,0,0,0.05)';
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                    ctx.fillStyle = '#0f0';
                    ctx.font = '15px monospace';
                    for(let i=0; i<drops.length; i++) {
                        const text = chars[Math.floor(Math.random()*chars.length)];
                        ctx.fillText(text, i*20, drops[i]*20);
                        if(drops[i]*20 > canvas.height && Math.random() > 0.975) drops[i]=0;
                        drops[i]++;
                    }
                    requestAnimationFrame(draw);
                }
                draw();
                window.addEventListener('resize', () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                });
            <\/script>
        ` : '';
        
        // Blood rain effect
        const bloodEffect = bg === 'blood' ? `
            <canvas id="bloodCanvas" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;"></canvas>
            <script>
                const canvas = document.getElementById('bloodCanvas');
                const ctx = canvas.getContext('2d');
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                const drops = [];
                for(let i=0; i<100; i++) drops.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, speed:2+Math.random()*5});
                function draw() {
                    ctx.fillStyle = 'rgba(0,0,0,0.1)';
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                    ctx.fillStyle = '#f00';
                    drops.forEach(d => {
                        ctx.fillRect(d.x, d.y, 2, 8);
                        d.y += d.speed;
                        if(d.y > canvas.height) d.y = 0;
                    });
                    requestAnimationFrame(draw);
                }
                draw();
            <\/script>
        ` : '';
        
        // Cyber effect
        const cyberEffect = bg === 'cyber' ? `
            <canvas id="cyberCanvas" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;"></canvas>
            <script>
                const canvas = document.getElementById('cyberCanvas');
                const ctx = canvas.getContext('2d');
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                let dots = [];
                for(let i=0;i<50;i++) dots.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height});
                function draw() {
                    ctx.fillStyle = 'rgba(0,0,0,0.1)';
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                    ctx.fillStyle = '#0ff';
                    dots.forEach(d => {
                        ctx.beginPath();
                        ctx.arc(d.x, d.y, 2, 0, Math.PI*2);
                        ctx.fill();
                        d.x += (Math.random()-0.5)*2;
                        d.y += (Math.random()-0.5)*2;
                        if(d.x<0) d.x=canvas.width;
                        if(d.x>canvas.width) d.x=0;
                        if(d.y<0) d.y=canvas.height;
                        if(d.y>canvas.height) d.y=0;
                    });
                    requestAnimationFrame(draw);
                }
                draw();
            <\/script>
        ` : '';
        
        return `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title} | Defaced by ${hacker}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    min-height: 100vh;
                    background: ${bgStyles[bg]};
                    font-family: 'Courier New', monospace;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    overflow: hidden;
                }
                ${glitchAnim[glitch]}
                .content {
                    position: relative;
                    z-index: 10;
                    text-align: center;
                    background: rgba(0,0,0,0.7);
                    padding: 50px;
                    border-radius: 20px;
                    border: 2px solid ${bg === 'matrix' ? '#0f0' : bg === 'blood' ? '#f00' : '#0ff'};
                    backdrop-filter: blur(5px);
                    box-shadow: 0 0 50px rgba(0,255,255,0.3);
                    animation: fadeIn 1s ease;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                h1 {
                    font-size: 4em;
                    color: ${bg === 'matrix' ? '#0f0' : bg === 'blood' ? '#f66' : '#0ff'};
                    text-shadow: 0 0 10px currentColor;
                    margin-bottom: 20px;
                }
                .message {
                    font-size: 1.5em;
                    color: #fff;
                    margin: 30px 0;
                    padding: 20px;
                    border-top: 1px solid rgba(255,255,255,0.3);
                    border-bottom: 1px solid rgba(255,255,255,0.3);
                }
                .hacker {
                    font-size: 1.8em;
                    color: ${bg === 'matrix' ? '#0f0' : bg === 'blood' ? '#f66' : '#0ff'};
                    margin: 20px 0;
                    letter-spacing: 2px;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 0.8em;
                    color: #888;
                }
                button {
                    margin-top: 20px;
                    padding: 10px 20px;
                    background: transparent;
                    border: 1px solid ${bg === 'matrix' ? '#0f0' : '#0ff'};
                    color: ${bg === 'matrix' ? '#0f0' : '#0ff'};
                    cursor: pointer;
                    transition: all 0.3s;
                }
                button:hover {
                    background: ${bg === 'matrix' ? '#0f0' : '#0ff'};
                    color: black;
                    transform: scale(1.05);
                }
                .ascii {
                    font-size: 10px;
                    white-space: pre;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            ${matrixEffect}
            ${bloodEffect}
            ${cyberEffect}
            <div class="content">
                <div class="ascii">
    ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ 
    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
    ███████║███████║██║     █████╔╝ █████╗  ██║  ██║
    ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██║  ██║
    ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██████╔╝
    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 
                </div>
                <h1>${title}</h1>
                <div class="message">${message}</div>
                <div class="hacker">~ ${hacker} ~</div>
                <div class="footer">${footer}</div>
                <button onclick="location.reload()">⚡ SECURITY IS A MYTH ⚡</button>
            </div>
            ${music ? `<audio autoplay loop><source src="${music}" type="audio/mpeg"></audio>` : ''}
        </body>
        </html>`;
    }
    
    // Update preview on input change
    function updatePreview() {
        const html = generateDefaceHTML();
        const blob = new Blob([html], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        previewFrame.src = url;
        URL.revokeObjectURL(url);
    }
    
    // Download deface file
    function downloadDeface() {
        const html = generateDefaceHTML();
        const blob = new Blob([html], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `deface_${Date.now()}.html`;
        a.click();
        URL.revokeObjectURL(url);
        
        addLog('generator', 'Deface', '-', `Deface page generated and downloaded`, 'success');
    }
    
    // Event listeners
    const inputs = [titleInput, messageInput, hackerInput, bgStyle, glitchStyle, musicInput, footerInput];
    inputs.forEach(input => {
        if(input) input.addEventListener('input', updatePreview);
        if(input && input.tagName === 'SELECT') input.addEventListener('change', updatePreview);
    });
    
    downloadBtn.addEventListener('click', downloadDeface);
    
    // Initial preview
    setTimeout(updatePreview, 100);
}