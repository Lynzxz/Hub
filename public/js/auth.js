// ==================== AUTH SYSTEM ====================
// Created by @LynzxzCreator

let currentUser = null;

function checkAuth() {
    const session = sessionStorage.getItem('lynzxz_session');
    if(!session) {
        window.location.href = 'index.html';
        return null;
    }
    currentUser = JSON.parse(session);
    return currentUser;
}

function getUser() {
    if(!currentUser) {
        const session = sessionStorage.getItem('lynzxz_session');
        if(session) currentUser = JSON.parse(session);
    }
    return currentUser;
}

function isDeveloper() {
    const user = getUser();
    return user && user.role === 'developer';
}

function isPremium() {
    const user = getUser();
    return user && (user.role === 'premium' || user.role === 'developer');
}

function isGuest() {
    const user = getUser();
    return user && user.role === 'guest';
}

function canExecute(target = null) {
    const user = getUser();
    if(!user) return false;
    if(user.role === 'guest') return false;
    if(user.role === 'developer') return true;
    
    // Premium user: cek apakah target diblokir oleh owner
    if(target && isProtectedTarget(target)) {
        addLog('security', 'Protected Target', target, 'Target dilindungi oleh owner', 'warning');
        return false;
    }
    return true;
}

function isProtectedTarget(url) {
    try {
        const blacklist = JSON.parse(localStorage.getItem('lynzxz_blacklist') || '[]');
        const domain = new URL(url).hostname;
        return blacklist.some(item => domain.includes(item) || url.includes(item));
    } catch(e) {
        return false;
    }
}

function addProtectedDomain(domain) {
    if(!isDeveloper()) return false;
    const blacklist = JSON.parse(localStorage.getItem('lynzxz_blacklist') || '[]');
    if(!blacklist.includes(domain)) {
        blacklist.push(domain);
        localStorage.setItem('lynzxz_blacklist', JSON.stringify(blacklist));
        addLog('security', 'Blacklist', domain, `Domain ${domain} ditambahkan ke proteksi`, 'success');
    }
    return true;
}

function removeProtectedDomain(domain) {
    if(!isDeveloper()) return false;
    let blacklist = JSON.parse(localStorage.getItem('lynzxz_blacklist') || '[]');
    blacklist = blacklist.filter(d => d !== domain);
    localStorage.setItem('lynzxz_blacklist', JSON.stringify(blacklist));
    addLog('security', 'Blacklist', domain, `Domain ${domain} dihapus dari proteksi`, 'info');
    return true;
}

function getProtectedDomains() {
    return JSON.parse(localStorage.getItem('lynzxz_blacklist') || '[]');
}

function getAllUsers() {
    if(!isDeveloper()) return [];
    return JSON.parse(localStorage.getItem('lynzxz_users') || '{}');
}

function promoteToPremium(username) {
    if(!isDeveloper()) return false;
    const users = JSON.parse(localStorage.getItem('lynzxz_users') || '{}');
    if(users[username]) {
        users[username].role = 'premium';
        localStorage.setItem('lynzxz_users', JSON.stringify(users));
        addLog('admin', 'User Management', username, `User ${username} dipromosikan ke premium`, 'success');
        return true;
    }
    return false;
}

function demoteToUser(username) {
    if(!isDeveloper()) return false;
    const users = JSON.parse(localStorage.getItem('lynzxz_users') || '{}');
    if(users[username] && users[username].role !== 'developer') {
        users[username].role = 'premium';
        localStorage.setItem('lynzxz_users', JSON.stringify(users));
        addLog('admin', 'User Management', username, `User ${username} didemote ke premium`, 'info');
        return true;
    }
    return false;
}

function deleteUser(username) {
    if(!isDeveloper()) return false;
    const users = JSON.parse(localStorage.getItem('lynzxz_users') || '{}');
    if(users[username] && users[username].role !== 'developer') {
        delete users[username];
        localStorage.setItem('lynzxz_users', JSON.stringify(users));
        addLog('admin', 'User Management', username, `User ${username} dihapus`, 'warning');
        return true;
    }
    return false;
}

function getAccessLogs() {
    return JSON.parse(localStorage.getItem('lynzxz_access_logs') || '[]');
}

function clearAccessLogs() {
    if(!isDeveloper()) return false;
    localStorage.setItem('lynzxz_access_logs', JSON.stringify([]));
    addLog('admin', 'Logs', 'System', 'Semua log dihapus', 'info');
    return true;
}

// Export ke global
window.checkAuth = checkAuth;
window.getUser = getUser;
window.isDeveloper = isDeveloper;
window.isPremium = isPremium;
window.isGuest = isGuest;
window.canExecute = canExecute;
window.addProtectedDomain = addProtectedDomain;
window.removeProtectedDomain = removeProtectedDomain;
window.getProtectedDomains = getProtectedDomains;
window.getAllUsers = getAllUsers;
window.promoteToPremium = promoteToPremium;
window.demoteToUser = demoteToUser;
window.deleteUser = deleteUser;
window.getAccessLogs = getAccessLogs;
window.clearAccessLogs = clearAccessLogs;
