// api/admin.js
export default function handler(req, res) {
    res.json({
        success: true,
        panels: [
            { path: '/admin', status: 200 },
            { path: '/wp-admin', status: 200 }
        ]
    });
}
