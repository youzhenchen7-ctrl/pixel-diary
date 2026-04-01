// --- 1. 初始化資料 ---
// 這裡改用 localStorage，這樣長輩關掉網頁後，紀錄才不會消失
let waterRecord = JSON.parse(localStorage.getItem('water_data')) || Array(30).fill(0); 

function openCanvas() {
    const modal = document.getElementById('canvas-modal');
    if (modal) {
        modal.style.display = "block";
        renderWaterGrid();
    }
}

function closeCanvas() {
    document.getElementById('canvas-modal').style.display = "none";
}

// --- 2. 畫出打卡格子 ---
function renderWaterGrid() {
    const grid = document.getElementById('pixel-grid');
    if (!grid) return;
    grid.innerHTML = "";

    waterRecord.forEach((status, index) => {
        const div = document.createElement('div');
        div.className = 'pixel-day' + (status === 1 ? ' checked' : '');
        
        // 我們把「隨便點格子就會變色」的功能拿掉，或者改成提示
        // 這樣就不會亂掉順序了
        div.onclick = () => {
            console.log("請點擊下方的綠色按鈕來打卡喔！");
        };
        
        grid.appendChild(div);
    });
}

// --- 3. 讓按鈕「按順序」變藍色 ---
function checkInToday() {
    // 尋找第一個還是 0 (灰色) 的格子索引
    const nextIndex = waterRecord.indexOf(0);

    if (nextIndex !== -1) {
        // 找到空格了，把它變成 1 (藍色)
        waterRecord[nextIndex] = 1;
        
        // 儲存到瀏覽器紀錄裡，下次打開還會在
        localStorage.setItem('water_data', JSON.stringify(waterRecord));
        
        // 重新繪製畫面
        renderWaterGrid();
        
        // 成功回饋
        alert("喝水打卡成功！第 " + (nextIndex + 1) + " 格亮起囉！💧");
        
        // 讓恐龍開心
        const dinoStatus = document.getElementById('dino-status');
        if(dinoStatus) dinoStatus.innerText = "太棒了！水份充足！";
        
    } else {
        alert("太厲害了！這個月的格子都填滿囉！🏆");
    }
}
