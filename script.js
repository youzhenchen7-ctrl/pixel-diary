// --- 1. 初始化資料 ---
let waterRecord = Array(30).fill(0); 

// --- 2. 顯示/隱藏畫布視窗 ---
function openCanvas() {
    const modal = document.getElementById('canvas-modal');
    if (modal) {
        modal.style.display = "block";
        renderWaterGrid();
    } else {
        alert("找不到畫布視窗，請檢查 index.html 是否有 id='canvas-modal'");
    }
}

function closeCanvas() {
    document.getElementById('canvas-modal').style.display = "none";
}

// --- 3. 畫出打卡格子 ---
function renderWaterGrid() {
    const grid = document.getElementById('pixel-grid');
    if (!grid) return;
    grid.innerHTML = "";

    waterRecord.forEach((status, index) => {
        const div = document.createElement('div');
        div.className = 'pixel-day' + (status === 1 ? ' checked' : '');
        div.onclick = () => {
            waterRecord[index] = (waterRecord[index] === 0) ? 1 : 0;
            renderWaterGrid();
        };
        grid.appendChild(div);
    });
}

// --- 4. 今天的打卡按鈕 ---
function checkInToday() {
    const today = new Date().getDate() - 1; 
    waterRecord[today] = 1;
    renderWaterGrid();
    alert("喝水打卡成功！💧");
}

// --- 5. 錄音模擬功能 ---
function startRecording() {
    document.getElementById('transcript-display').innerText = "正在錄音中...";
    setTimeout(() => {
        document.getElementById('transcript-display').innerText = "「今天去散步了，心情很好！」";
    }, 1500);
}

// --- 6. 心情按鈕 ---
function setMood(emoji) {
    alert("今天心情是 " + emoji);
}
