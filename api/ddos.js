// api/ddos.js
export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    const { action, target, method, threads, duration } = req.body || {};
    
    if (action === 'start') {
        return res.json({ 
            success: true, 
            attackId: Date.now().toString(),
            message: `DDoS simulation started on ${target}`
        });
    }
    
    return res.json({ success: true, message: 'DDoS endpoint ready' });
}
