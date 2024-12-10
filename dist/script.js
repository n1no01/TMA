"use strict";
var _a, _b;
const startBtn = document.getElementById('startBtn');
const modal = document.getElementById('modal');
const tonWalletBtn = document.getElementById('ton-connect');
const websiteBtn = document.getElementById('websiteBtn');
const groupBtn = document.getElementById('groupBtn');
// Check if the elements exist before adding event listeners
if (startBtn && modal && tonWalletBtn && websiteBtn && groupBtn) {
    // Show modal on start button click
    startBtn.addEventListener('click', () => {
        if (window.innerWidth <= 600) {
            modal.classList.remove('hidden');
            modal.classList.add('displayFlexResponsive');
            startBtn.classList.add('hidden');
        }
        modal.classList.remove('hidden');
        modal.classList.add('displayFlex');
        startBtn.classList.add('hidden');
    });
    // Website Redirect
    websiteBtn.addEventListener('click', () => {
        window.location.href = 'https://rzlt.io/';
    });
    // Telegram Group Redirect
    groupBtn.addEventListener('click', () => {
        window.location.href = 'https://t.me/cbinsider';
    });
}
else {
    console.error('One or more elements not found');
}
const tg = window.Telegram.WebApp;
const initData = tg.initDataUnsafe;
const userData = {
    telegramId: (_a = initData.user) === null || _a === void 0 ? void 0 : _a.id,
    telegramUsername: (_b = initData.user) === null || _b === void 0 ? void 0 : _b.username,
    websiteClick: false,
    joinedGroup: false,
};
fetch('http://localhost:3000/api/saveUserData', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
});
// Handle button clicks
websiteBtn.addEventListener('click', () => {
    fetch('http://localhost:3000/api/saveUserData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.assign(Object.assign({}, userData), { websiteClick: true })),
    });
});
groupBtn.addEventListener('click', () => {
    fetch('http://localhost:3000/api/saveUserData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.assign(Object.assign({}, userData), { joinedGroup: true })),
    });
});
