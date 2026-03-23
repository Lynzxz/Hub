// server.js - Lynzxz Hub Main Server
// Created by @LynzxzCreator

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ==================== GHOSTTRACK INSTALLER ====================
const { exec } = require('child_process');
const os = require('os');

app.post('/api/ghosttrack/install', (req, res) => {
    const platform = os.platform();
    let command = '';

    if (platform === 'win32') {
        // Windows: buka cmd baru dan jalankan instalasi
        command = `start cmd /k "echo Installing GhostTrack... && git clone https://github.com/HunxBytes/GhostTrack.git && cd GhostTrack && pip install -r requirements.txt && echo Instalasi selesai! Jalankan 'python GhostTR.py' untuk memulai && pause"`;
    } else if (platform === 'linux') {
        // Linux: buka terminal baru (gnome-terminal, xterm, atau default)
        command = `gnome-terminal -- bash -c "echo 'Installing GhostTrack...'; git clone https://github.com/HunxBytes/GhostTrack.git; cd GhostTrack; pip3 install -r requirements.txt; echo 'Instalasi selesai! Jalankan python3 GhostTR.py'; exec bash"`;
    } else if (platform === 'darwin') {
        // macOS
        command = `osascript -e 'tell app "Terminal" to do script "echo Installing GhostTrack... && git clone https://github.com/HunxBytes/GhostTrack.git && cd GhostTrack && pip3 install -r requirements.txt && echo Instalasi selesai! Jalankan python3 GhostTR.py"'`;
    } else {
        return res.json({ success: false, error: 'OS tidak didukung' });
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.json({ success: false, error: error.message });
        }
        res.json({ success: true, message: 'Terminal dibuka untuk instalasi GhostTrack' });
    });
});

// ==================== API ROUTES ====================

// DDoS Attack API
app.post('/api/ddos', async (req, res) => {
    const { action, target, method, threads, duration, attackId } = req.body;
    
    if (action === 'start') {
        // Simulasi DDoS untuk testing
        const newAttackId = Date.now().toString();
        
        // Kirim response sukses
        res.json({ 
            success: true, 
            attackId: newAttackId,
            message: `DDoS attack started on ${target} with ${threads} threads`
        });
        
        // Log ke console
        console.log(`[DDoS] Started ${method} attack on ${target}`);
        
        // Simulasi serangan (opsional)
        let requestCount = 0;
        const interval = setInterval(() => {
            requestCount += Math.floor(threads * 0.5);
            console.log(`[DDoS] ${target} - Requests: ${requestCount}`);
        }, 1000);
        
        // Stop setelah durasi
        setTimeout(() => {
            clearInterval(interval);
            console.log(`[DDoS] Attack finished. Total requests: ~${requestCount}`);
        }, duration * 1000);
        
    } else if (action === 'stop') {
        res.json({ success: true, message: `Attack ${attackId} stopped` });
    } else {
        res.json({ error: 'Unknown action' });
    }
});

// WordPress Scanner API (simulasi)
app.post('/api/wordpress/scan', async (req, res) => {
    const { target } = req.body;
    
    // Simulasi hasil scan
    res.json({
        success: true,
        wordpress: true,
        version: '6.4.2',
        users: ['admin', 'editor', 'subscriber'],
        plugins: [
            { name: 'akismet', version: '4.1.2', vulnerable: false },
            { name: 'woocommerce', version: '8.5.0', vulnerable: true }
        ],
        themes: ['twentytwentyfour', 'custom-theme'],
        vulnerabilities: [
            { type: 'plugin', name: 'woocommerce', cve: 'CVE-2023-12345', severity: 'high' }
        ]
    });
});

// SQL Injection Scanner API
app.post('/api/sql/scan', async (req, res) => {
    const { target } = req.body;
    
    res.json({
        success: true,
        vulnerable: true,
        parameters: ['id', 'page', 'cat'],
        payloads: ["' OR '1'='1", "1' AND '1'='1"],
        database: 'MySQL 8.0',
        tables: ['users', 'posts', 'config']
    });
});

// Admin Panel Finder API
app.post('/api/admin/find', async (req, res) => {
    const { target } = req.body;
    
    const commonPanels = [
        '/admin', '/login', '/wp-admin', '/administrator', 
        '/cpanel', '/dashboard', '/admincp', '/backend'
    ];
    
    // Simulasi panel yang ditemukan
    const found = [
        { path: '/wp-admin', status: 200, title: 'WordPress Admin' },
        { path: '/login', status: 200, title: 'Login Page' },
        { path: '/admin', status: 403, title: 'Admin Area' }
    ];
    
    res.json({ success: true, panels: found });
});

// Brute Force API
app.post('/api/brute', async (req, res) => {
    const { target, username, wordlistType } = req.body;
    
    // Simulasi brute force
    res.json({
        success: true,
        found: true,
        password: 'admin123',
        attempts: 145,
        timeElapsed: '12.5 seconds'
    });
});

// Deface Generator (simpan file)
app.post('/api/deface/save', async (req, res) => {
    const { html, filename } = req.body;
    const savePath = path.join(__dirname, 'public', 'downloads', `${filename || 'deface'}.html`);
    
    // Buat folder downloads jika belum ada
    const downloadDir = path.join(__dirname, 'public', 'downloads');
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
    }
    
    try {
        fs.writeFileSync(savePath, html);
        res.json({ 
            success: true, 
            downloadUrl: `/downloads/${filename || 'deface'}.html`,
            message: 'Deface page saved'
        });
    } catch(e) {
        res.json({ success: false, error: e.message });
    }
});

// Get creator info
app.get('/api/creator', (req, res) => {
    res.json({
        name: '@LynzxzCreator',
        tools: ['DDoS', 'Deface Generator', 'WordPress Scanner', 'SQL Scanner', 'Admin Finder', 'Brute Force'],
        version: '2.0.0',
        features: ['Global Logs', 'Real-time Stats', 'Multi-thread Attack']
    });
});

// Serve dashboard
// Serve About page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════════════════════╗
    ║     LYNZXZ HUB - SECURITY SUITE                         ║
    ║     Created by: @LynzxzCreator                          ║
    ║     Server running on: http://localhost:${PORT}          ║
    ║     Dashboard: http://localhost:${PORT}/dashboard        ║
    ╚══════════════════════════════════════════════════════════╝
    `);
});