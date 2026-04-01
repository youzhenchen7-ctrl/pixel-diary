// 初始化資料：從瀏覽器記憶體拿，拿不到就給 30 個 0
let waterRecord = JSON.parse(localStorage.getItem('water_data')) || Array(30).fill(0);

// --- 視窗開關 ---
function openCanvas() {
    document.getElementById('canvas-modal').style.display = "block";
    renderWaterGrid();
}

function closeCanvas() {
    document.getElementById('canvas-modal').style.display = "none";
}

// --- 畫出格子 ---
function renderWaterGrid() {
    const grid = document.getElementById('pixel-grid');
    if (!grid) return;
    grid.innerHTML = "";

    waterRecord.forEach((status) => {
        const div = document.createElement('div');
        div.className = 'pixel-day' + (status === 1 ? ' checked' : '');
        grid.appendChild(div);
    });
}

// --- 照順序打卡 ---
function checkInToday() {
    const nextIndex = waterRecord.indexOf(0);
    if (nextIndex !== -1) {
        waterRecord[nextIndex] = 1;
        localStorage.setItem('water_data', JSON.stringify(waterRecord)); // 存檔
        renderWaterGrid(); // 刷新
        alert("喝水打卡成功！💧");
    } else {
        alert("太棒了，這個月全滿囉！🏆");
    }
}

// --- 心情與錄音 ---
function setMood(emoji) {
    alert("今天心情是 " + emoji);
}

function startRecording() {
    const display = document.getElementById('transcript-display');
    display.innerText = "正在錄音中...";
    setTimeout(() => {
        display.innerText = "「今天心情很不錯！」";
    }, 1500);
}
