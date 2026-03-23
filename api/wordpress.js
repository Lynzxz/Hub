// api/wordpress.js
export default function handler(req, res) {
    res.json({
        success: true,
        wordpress: true,
        version: '6.4.3',
        users: ['admin', 'editor'],
        plugins: [
            { name: 'akismet', version: '4.1.2', vulnerable: false },
            { name: 'woocommerce', version: '8.5.0', vulnerable: true }
        ]
    });
}
