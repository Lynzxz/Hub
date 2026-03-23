// ==================== UTILS ====================
// Creator: @LynzxzCreator

// Global logs array (disimpan di localStorage agar persistent)
let globalLogs = [];

// Inisialisasi logs dari localStorage
function initLogs() {
    const stored = localStorage.getItem('lynzxz_global_logs');
    if(stored) {
        globalLogs = JSON.parse(stored);
    } else {
        globalLogs = [];
    }
    renderLogs();
}

// Tambah log baru
function addLog(type, module, target, message, status = 'info') {
    const logEntry = {
        id: Date.now() + Math.random(),
        timestamp: new Date().toLocaleString(),
        type: type, // 'attack', 'scan', 'generator', etc
        module: module,
        target: target,
        message: message,
        status: status // 'success', 'error', 'warning', 'info'
    };
    globalLogs.unshift(logEntry); // tambah di awal
    // Batasi jumlah log (max 200)
    if(globalLogs.length > 200) globalLogs.pop();
    localStorage.setItem('lynzxz_global_logs', JSON.stringify(globalLogs));
    renderLogs();
}

// Render logs ke panel
function renderLogs() {
    const logContainer = document.getElementById('globalLogList');
    if(!logContainer) return;
    
    if(globalLogs.length === 0) {
        logContainer.innerHTML = '<div class="log-entry">✨ Belum ada aktivitas</div>';
        return;
    }
    
    logContainer.innerHTML = globalLogs.map(log => `
        <div class="log-entry ${log.status}">
            <span class="time">[${log.timestamp}]</span>
            <strong>${log.module}</strong> → ${log.message}
            ${log.target ? `<span style="color:#88aaff"> (${log.target})</span>` : ''}
        </div>
    `).join('');
    
    // Auto-scroll ke bawah
    logContainer.scrollTop = 0;
}

// Hapus semua logs
function clearAllLogs() {
    if(confirm('Hapus seluruh riwayat log?')) {
        globalLogs = [];
        localStorage.setItem('lynzxz_global_logs', JSON.stringify(globalLogs));
        renderLogs();
        addLog('system', 'Logger', 'System', 'Semua log telah dibersihkan', 'info');
    }
}

// Fetch API dengan timeout
async function fetchWithTimeout(url, options = {}, timeout = 15000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

// Format angka
function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

// Simulasi delay (untuk efek)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Export untuk modul lain (karena pakai vanilla JS, semua fungsi global)
window.addLog = addLog;
window.clearAllLogs = clearAllLogs;
window.initLogs = initLogs;
window.fetchWithTimeout = fetchWithTimeout;
window.formatNumber = formatNumber;
window.delay = delay;