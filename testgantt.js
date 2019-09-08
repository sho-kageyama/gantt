// 開始する日付を入力してください
let now = new Date();
let days = new Date(now.getFullYear(),now.getMonth() + 1,0).getDate();

let startDay = {
    year: now.getFullYear(),
    month: now.getMonth()+1,
    day : days
}
    
    // 始業時間と就業時間を入力してください(30分単位で入力してください)
    let openingTime = 1;
    let closingTime = days;
    
    
    // tasks.jsに配列が存在する日の回数分、チャートを表示するdaily-area要素を描画する
    const dailyAreaDOM = () => {
        for(let i=0; i < Object.keys(task).length; i++) {
            let contentObj = document.getElementById("testgantt");
            let chartElement = document.createElement('div');
            chartElement.className = 'chart';
            contentObj.appendChild(chartElement);
            let chartArea = document.querySelectorAll(".chart");
            chartArea[i].innerHTML = `
            <span id="date${i}"></span>
            <div class="daily-area">
            <div class="scale"></div>
            <ul class="data" id="task${i}"></ul>
            </div>
            `;
        }
    }
    
    // 始業時間と就業時間から、30分区切りでhh:mmというフォーマットに変換する
    const setTimeScale = (open, close) => {
        closeDay = startDay.day;
        timeScale = [];
        for(let i=0; i < closeDay; i++) {
            let day = Number(i) + 1;
            timeScale[i] = String(day);
        }
    }
    
    // #easygantt要素の幅を取得して、scaleを均等に分割する
    const setTimeScaleWidth = () => {
        clientWidth = document.getElementById('testgantt').clientWidth-70;
        let singleTimeScaleWidth =  clientWidth / (startDay.day);
        return singleTimeScaleWidth;
    }
    
    // setTimeScaleWidthで取得したひとつあたりのtimeScaleの値に応じたwidthで、時間軸を描画する
    const scaleDOM = (i, width) => {
        
        let scale = document.querySelectorAll(".scale");
        scale[i].insertAdjacentHTML('beforeend', '<div class="hr">')
        for(let j=0; j<timeScale.length; j++) {
            scale[i].insertAdjacentHTML('beforeend',`
                                        <section style="width: ${width}px;">${timeScale[j]}</section></div>
                                        `);
        }
    }
    
    // startDayの値をmm/dd(w)のフォーマットにして描画する
    const dateDOM = (i) => {
        let taskDay = new Date(startDay.year, startDay.month -1, startDay.day + i);
        let y = taskDay.getFullYear();
        let m = taskDay.getMonth()+1;
        let d = taskDay.getDate();
        let w = taskDay.getDay();
        let weekNames = ['日', '月', '火', '水', '木', '金', '土'];
        document.getElementById("date" + [i]).innerText = `${y}年${m}月`;
    }
    
    // hhmmのフォーマットの時間を分数にして返す
    const convertTimesToMins = (time) => {
        let hour = parseInt(String(time));
        let min = parseInt(String(time));
        let sumMins = hour * 60 + min;
        return sumMins;
    }
    
    // tasks.jsの配列をもとに、チャートにバブルを描画する
    const bubbleDOM = (i, j, start, duration, element, width, state) => {
        // 1日あたりのバブルの長さ[px]
        let widthAboutMin = width;
        // 始業からタスク開始までの日数
        let startTaskMin = start - openingTime;
        if(state == "plan"){
            element.insertAdjacentHTML('beforeend', `
                                       <li><div class="${task[i][j].category}">
                                       <span class="bubble plan" style="margin-left: ${startTaskMin * widthAboutMin}px;
                                       width: ${duration * widthAboutMin}px;"></span>
                                       ${bubbleData(i,j)}</div></li>
                                       `);
        }else{
            element.insertAdjacentHTML('beforeend', `
                                       <li><div class="${task[i][j].category}">
                                       <span class="bubble result" style="margin-left: ${startTaskMin * widthAboutMin}px;
                                       width: ${duration * widthAboutMin}px;"></span>
                                       ${bubbleData(i,j)}</div></li>
                                       `);
        }
        
    }
    
    // task.jsの配列のデータを、「hh:mm-hh:mm タスクの説明」のフォーマットにして返す
    const bubbleData = (i, j) => {
        console.log('i :'+ i +'  j :'+j);
        if(task[i][j].category !== "milest") {
//            let daytime = task[i][j].endTime - task[i][j].startTime + 1;
//            data = `<span class="time">
//            ${String(daytime)}日間
//            </span>
            data = `
            <span class="bubble-span">${task[i][j].name}</span>`;
        } else {
            data = `<span class="time">${String(task[i][j].startTime)}</span>
            <span class="milestone-span">${task[i][j].name}</span>`;
        }
        return data
    }
    
    window.onload = () => {
        dailyAreaDOM();
        let startTimeToMins = [], endTimeToMins = [], durationTimes = [];
        for(let i=0; i < Object.keys(task).length; i++) {
            if(task[i][0]) {
                setTimeScale(openingTime, closingTime);
                timeScaleWidth = setTimeScaleWidth();
                scaleDOM(i, timeScaleWidth);
                dateDOM(i);
                let createBubble = document.getElementById(`task${i}`);
                startTimeToMins[i] = [], endTimeToMins[i] = [], durationTimes[i] = [];
                for(let j=0; j < Object.keys(task[i]).length; j++) {
                    let k = Number(j)+1;
                    for(var l in task[i]){
                        if(task[i][l].id == k){
                            bubbleDOM(i, l,
                                      task[i][l].startTime,
                                      (task[i][l].endTime+1 - task[i][l].startTime),
                                      createBubble,
                                      timeScaleWidth,
                                      task[i][l].state
                                      );
                        }
                    }
                    
                }
            }
        }
    }
    
