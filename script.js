/**
 * 像素聯絡簿 - 功能核心
 * 包含：心情記錄、模擬語音轉文字、恐龍養成邏輯
 */

// 1. 模擬語音辨識的題目池（當長輩不知道說什麼時顯示）
const questionPrompts = [
    "今天喝的第一杯飲料是什麼顏色？",
    "今天去公園散步了嗎？有看到什麼嗎？",
    "中午吃了什麼好吃的？自己煮還是買的？",
    "今天有想起哪位老朋友嗎？",
    "現在窗外的天氣看起來怎麼樣？"
];

let isRecording = false;
let recordTimer;

// 取得 DOM 元素
const recordBtn = document.getElementById('record-btn');
const transcriptDisplay = document.getElementById('transcript-display');
const streakDisplay = document.getElementById('streak-days');
const dinoSprite = document.getElementById('dino-sprite');
const dinoStatus = document.getElementById('dino-status');

// 2. 錄音按鈕邏輯 (支援觸控與滑鼠)
function startRecording() {
    isRecording = true;
    recordBtn.innerText = "● 正在聆聽...";
    recordBtn.style.backgroundColor = "#ff4444"; // 變紅色提醒正在錄音
    recordBtn.style.transform = "scale(0.95)"; // 按下的視覺回饋
    
    // 手機震動回饋
    if (navigator.vibrate) navigator.vibrate(50);
}

function stopRecording() {
    if (!isRecording) return;
    isRecording = false;
    recordBtn.innerText = "● 按住錄音";
    recordBtn.style.backgroundColor = "#4CAF50"; // 恢復綠色
    recordBtn.style.transform = "scale(1)";

    // 模擬語音轉文字處理
    transcriptDisplay.innerText = "正在轉換語音...";
    
    setTimeout(() => {
        // 這裡未來可以串接 Web Speech API
        const mockResults = [
            "今天心情很好，去超市買了新鮮的蘋果。",
            "剛才跟鄰居聊了一下天，太陽好大。",
            "中午吃了麵條，味道還不錯。",
            "小明啊，奶奶今天有乖乖去散步喔！"
        ];
        const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
        transcriptDisplay.innerText = "「" + randomResult + "」";
        
        // 完成錄音，增加進度
        updateProgress();
    }, 800);
}

// 綁定事件 (相容電腦與平板)
recordBtn.addEventListener('mousedown', startRecording);
recordBtn.addEventListener('mouseup', stopRecording);
recordBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startRecording(); });
recordBtn.addEventListener('touchend', stopRecording);

// 3. 心情按鈕功能
function setMood(emoji) {
    const messages = {
        '😊': "記下來了！今天很開心呢！",
        '💢': "別生氣了，喝口水休息一下。",
        '😢': "沒事的，抱抱你，明天會更好。",
        '😆': "太棒了！充滿活力的一天！"
    };
    alert(messages[emoji] || "心情已記錄！");
    if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
}

// 4. 像素恐龍進化邏輯 (模擬天數增加)
let currentStreak = parseInt(streakDisplay.innerText);

function updateProgress() {
    // 每次紀錄成功，有機會增加天數 (此為示範邏輯)
    console.log("進度已更新");
    // 如果要做真正的天數，需要後端儲存，這裡先做視覺變化
}

// 測試：點擊恐龍看進化 (方便你展示給長輩看)
dinoSprite.addEventListener('click', () => {
    currentStreak += 1;
    streakDisplay.innerText = currentStreak;
    
    if (currentStreak >= 10) {
        dinoSprite.innerText = "🦖";
        dinoStatus.innerText = "哇！恐龍變大英雄了！";
        dinoStatus.style.color = "#E65100";
    } else if (currentStreak >= 7) {
        dinoSprite.innerText = "🦕";
        dinoStatus.innerText = "恐龍學會走路了！";
    } else if (currentStreak >= 3) {
        dinoSprite.innerText = "🐣";
        dinoStatus.innerText = "小恐龍破殼而出囉！";
    }
});

// 初始化：顯示隨機問題
window.onload = () => {
    const randomPrompt = questionPrompts[Math.floor(Math.random() * questionPrompts.length)];
    transcriptDisplay.innerText = "今日小卡片：\n" + randomPrompt;
};

// 模擬紀錄，0 代表沒喝，1 代表有喝
let waterRecord = Array(30).fill(0); 

function openCanvas() {
    document.getElementById('canvas-modal').style.display = "block";
    renderWaterGrid();
}

function renderWaterGrid() {
    const grid = document.getElementById('pixel-grid');
    grid.innerHTML = "";

    waterRecord.forEach((status, index) => {
        const div = document.createElement('div');
        div.className = 'pixel-day';
        if (status === 1) div.classList.add('checked');
        
        // 點擊小方塊也可以切換狀態
        div.onclick = () => toggleCheck(index);
        grid.appendChild(div);
    });
}

// 今天的打卡功能
function checkInToday() {
    // 假設今天是第 12 天 (你可以根據日期自動計算)
    const todayIndex = 11; 
    waterRecord[todayIndex] = 1;
    renderWaterGrid();
    
    // 恐龍給予鼓勵
    document.getElementById('dino-status').innerText = "太棒了！多喝水身體好！";
    document.getElementById('dino-sprite').innerText = "🦕";
    
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    alert("打卡成功！今天也要補充水分喔 💧");
}

function toggleCheck(index) {
    waterRecord[index] = waterRecord[index] === 0 ? 1 : 0;
    renderWaterGrid();
}

function closeCanvas() {
    document.getElementById('canvas-modal').style.display = "none";
}
