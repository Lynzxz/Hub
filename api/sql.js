// api/sql.js
export default function handler(req, res) {
    res.json({
        success: true,
        vulnerable: true,
        parameters: ['id', 'page'],
        payloads: ["' OR '1'='1", "1' AND '1'='1"]
    });
}
