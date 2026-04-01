// --- 基礎設定與紀錄 ---
let waterRecord = Array(30).fill(0); // 30天喝水紀錄，0沒喝，1有喝
const streakDisplay = document.getElementById('streak-days');
const dinoSprite = document.getElementById('dino-sprite');
const dinoStatus = document.getElementById('dino-status');

// --- 1. 喝水打卡畫布功能 ---

// 讓視窗跳出來
function openCanvas() {
    const modal = document.getElementById('canvas-modal');
    if (modal) {
        modal.style.display = "block";
        renderWaterGrid();
    }
}

// 讓視窗關掉
function closeCanvas() {
    document.getElementById('canvas-modal').style.display = "none";
}

// 畫出 30 個格子
function renderWaterGrid() {
    const grid = document.getElementById('pixel-grid');
    if (!grid) return;
    grid.innerHTML = "";

    waterRecord.forEach((status, index) => {
        const div = document.createElement('div');
        div.className = 'pixel-day' + (status === 1 ? ' checked' : '');
        div.onclick = () => toggleCheck(index);
        grid.appendChild(div);
    });
}

// 點擊格子切換狀態
function toggleCheck(index) {
    waterRecord[index] = waterRecord[index] === 0 ? 1 : 0;
    renderWaterGrid();
}

// 「我喝水了」大按鈕功能
function checkInToday() {
    const todayIndex = new Date().getDate() - 1; // 自動抓今天的日期
    waterRecord[todayIndex] = 1;
    renderWaterGrid();
    
    // 恐龍給予獎勵
    dinoStatus.innerText = "太棒了！多喝水身體好！";
    dinoSprite.innerText = "🦖";
    alert("打卡成功！💧");
}

// --- 2. 錄音與心情功能 (保留原本功能) ---

function setMood(emoji) {
    alert("今天心情是 " + emoji + "，已幫你記下來囉！");
}

const recordBtn = document.getElementById('record-btn');
if (recordBtn) {
    recordBtn.addEventListener('click', () => {
        const display = document.getElementById('transcript-display');
        display.innerText = "正在錄音中...";
        setTimeout(() => {
            display.innerText = "「今天去散步了，心情很好！」";
        }, 1500);
    });
}

// 初始化
window.onload = () => {
    console.log("App 已啟動");
};
