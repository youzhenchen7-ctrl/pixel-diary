// 確保資料能存下來，不會重整就消失
let waterRecord = JSON.parse(localStorage.getItem('water_data')) || Array(30).fill(0);

// --- 1. 畫出格子 (加入鎖定邏輯) ---
function renderWaterGrid() {
    const grid = document.getElementById('pixel-grid');
    if (!grid) return;
    grid.innerHTML = "";

    waterRecord.forEach((status, index) => {
        const div = document.createElement('div');
        // 這裡如果是 1 就是藍色，0 就是灰色
        div.className = 'pixel-day' + (status === 1 ? ' checked' : '');
        
        // 【重要】這裡空空的，就是為了讓手動點擊「完全失效」
        div.onclick = null; 
        
        grid.appendChild(div);
    });
}

// --- 2. 讓按鈕「自動找下一格」打卡 ---
function checkInToday() {
    // 找出第一個還沒變藍色的格子 (值為 0 的位置)
    const nextEmptyIndex = waterRecord.indexOf(0);

    if (nextEmptyIndex !== -1) {
        // 把這一格變藍色
        waterRecord[nextEmptyIndex] = 1;
        
        // 存進瀏覽器記憶體
        localStorage.setItem('water_data', JSON.stringify(waterRecord));
        
        // 重新畫圖
        renderWaterGrid();
        
        if (navigator.vibrate) navigator.vibrate(50);
        alert("打卡成功！第 " + (nextEmptyIndex + 1) + " 格亮起 💧");
    } else {
        alert("太棒了，本月已全數達成！🏆");
    }
}

// --- 3. 基本開關功能 ---
function openCanvas() {
    document.getElementById('canvas-modal').style.display = "block";
    renderWaterGrid();
}

function closeCanvas() {
    document.getElementById('canvas-modal').style.display = "none";
}

// 初始化
window.onload = () => { console.log("健康助手已就緒"); };
