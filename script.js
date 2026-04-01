// 初始化資料
let waterRecord = JSON.parse(localStorage.getItem('water_data')) || Array(30).fill(0);

// --- 讓恐龍長大的功能 ---
function updateDino() {
    const count = waterRecord.filter(x => x === 1).length; // 計算總共打卡幾次
    const sprite = document.getElementById('dino-sprite');
    const status = document.getElementById('dino-status');
    const fill = document.getElementById('progress-fill');
    const countText = document.getElementById('count-text');

    if (countText) countText.innerText = `本月已打卡: ${count} 次`;
    if (fill) fill.style.width = (count / 30 * 100) + "%";

    if (count === 0) {
        sprite.innerText = "🥚";
        status.innerText = "恐龍還是一顆蛋...";
    } else if (count > 0 && count < 5) {
        sprite.innerText = "🐣";
        status.innerText = "喔！蛋裂開了！";
    } else if (count >= 5 && count < 15) {
        sprite.innerText = "🦖";
        status.innerText = "小恐龍出生了！";
    } else if (count >= 15) {
        sprite.innerText = "🐉";
        status.innerText = "恐龍變成了噴火龍！";
    }
}

// --- 視窗與畫布 ---
function openCanvas() {
    document.getElementById('canvas-modal').style.display = "block";
    renderWaterGrid();
}
function closeCanvas() {
    document.getElementById('canvas-modal').style.display = "none";
}

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

// --- 打卡功能 ---
function checkInToday() {
    const nextIndex = waterRecord.indexOf(0);
    if (nextIndex !== -1) {
        waterRecord[nextIndex] = 1;
        localStorage.setItem('water_data', JSON.stringify(waterRecord));
        renderWaterGrid();
        updateDino(); // 每次打卡都要檢查恐龍長大沒
        alert("打卡成功！💧");
    }
}

// 啟動時立刻執行一次，確保恐龍狀態正確
window.onload = updateDino;

// 心情功能
function setMood(emoji) {
    alert("今天心情是 " + emoji);
}
