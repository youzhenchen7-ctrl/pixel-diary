// --- 1. 資料存儲：讓紀錄存在平板裡 ---
let waterRecord = JSON.parse(localStorage.getItem('water_data')) || Array(30).fill(0);

// --- 2. 打卡視窗控制 ---
function openCanvas() {
    const modal = document.getElementById('canvas-modal');
    if (modal) {
        modal.style.display = "block";
        renderWaterGrid(); // 打開時畫出格子
    } else {
        alert("找不到畫布視窗！");
    }
}

function closeCanvas() {
    const modal = document.getElementById('canvas-modal');
    if (modal) {
        modal.style.display = "none";
    }
}

// --- 3. 畫出 30 個格子 (喝水紀錄) ---
function renderWaterGrid() {
    const grid = document.getElementById('pixel-grid');
    if (!grid) return;
    grid.innerHTML = "";

    waterRecord.forEach((status, index) => {
        const div = document.createElement('div');
        // 如果 status 為 1，就加上 checked 類別變成藍色
        div.className = 'pixel-day' + (status === 1 ? ' checked' : '');
        
        // 鎖定格子點擊，避免亂掉
        div.onclick = null; 
        grid.appendChild(div);
    });
}

// --- 4. 綠色按鈕打卡功能 (照順序) ---
function checkInToday() {
    // 找出第一個為 0 (灰色) 的位置
    const nextIndex = waterRecord.indexOf(0);
    
    if (nextIndex !== -1) {
        waterRecord[nextIndex] = 1;
        localStorage.setItem('water_data', JSON.stringify(waterRecord)); // 存檔
        renderWaterGrid(); // 更新畫面
        alert("喝水打卡成功！💧");
    } else {
        alert("這個月已經填滿囉！太棒了 🏆");
    }
}

// --- 5. 心情按鈕功能 ---
function setMood(emoji) {
    alert("今天的心情是 " + emoji + "，已經記在心裡囉！");
}

// --- 6. 錄音按鈕模擬 ---
function startRecording() {
    const display = document.getElementById('transcript-display');
    if (display) {
        display.innerText = "正在錄音中...";
        setTimeout(() => {
            display.innerText = "「今天去散步了，心情很好！」";
        }, 1500);
    }
}
