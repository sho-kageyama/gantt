// 開始する日付を入力してください
let now = new Date();
let days = new Date(now.getFullYear(),now.getMonth() + 1,0).getDate();

let startDay = {
    year: now.getFullYear(),
    month: now.getMonth()+1,
    day : days
}
    
    // 始業時間と就業時間を入力してください(30分単位で入力してください)
    let openingDay = 1;
    let closingDay = days;
    
    
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
    
    // 始業時間と就業時間から、1日区切りで（day)日というフォーマットに変換する
    const setTimeScale = (open, close) => {
        closeDay = startDay.day;
        timeScale = [];
        for(let i=0; i < closeDay; i++) {
            let day = Number(i) + 1;
            timeScale[i] = String(day)+'日';
        }
    }
    
    // #easygantt要素の幅を取得して、scaleを均等に分割する
    const setTimeScaleWidth = () => {
        clientWidth = document.getElementById('testgantt').clientWidth-75;
        let singleTimeScaleWidth =  clientWidth / (startDay.day);
        return singleTimeScaleWidth;
    }
    
    // setTimeScaleWidthで取得したひとつあたりのtimeScaleの値に応じたwidthで、時間軸を描画する
    const scaleDOM = (i, width) => {
        
        let scale = document.querySelectorAll(".scale");
        scale[i].insertAdjacentHTML('beforeend', '<div class="hr">')
        for(let j=0; j<timeScale.length; j++) {
            scale[i].insertAdjacentHTML('beforeend',`
                                        <section style="width: ${width}px; font-size:10px;">${timeScale[j]}</section></div>
                                        `);
        }
    }
    
    // startDayの値を年月のフォーマットにして描画する
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
//    const convertTimesToMins = (time) => {
//        let hour = parseInt(String(time));
//        let min = parseInt(String(time));
//        let sumMins = hour * 60 + min;
//        return sumMins;
//    }

    // tasks.jsの配列をもとに、チャートにバブルを描画する
    const bubbleDOM = (i, j, start, duration, element, width, state) => {
        // 1日あたりのバブルの長さ[px]
        let widthDay = width;
        // 始業からタスク開始までの日数
        let startTaskDay = start - openingDay;
        if(state == "plan"){
            element.insertAdjacentHTML('beforeend', `
                                       <li><div class="${task[i][j].category}">
                                       <span class="bubble task-plan" id="bubble-span$[j]" name="${i}:${j}" style="margin-left: ${startTaskDay * widthDay}px;
                                       width: ${duration * widthDay}px;"></span><p class="arrow_box" style="margin-left: ${startTaskDay * widthDay}px; z-index:200;">${task[i][j].name}<br>${task[i][j].startTime}日〜${task[i][j].endTime}日</p>
                                       ${bubbleData(i,j)}</div></li>
                                       `);
        }else{
            element.insertAdjacentHTML('beforeend', `
                                       <li><div class="${task[i][j].category}">
                                       <span class="bubble task-result" id="bubble-span${j}" name="${i}:${j}" style="margin-left: ${startTaskDay * widthDay}px;
                                       width: ${duration * widthDay}px;"></span><p class="arrow_box" style="margin-left: ${startTaskDay * widthDay}px; z-index:200;">${task[i][j].name}<br>${task[i][j].startTime}日〜${task[i][j].endTime}日</p>
                                       ${bubbleData(i,j)}</div></li>
                                       `);
        }
        
    }


function taskinfo(){
//    $('span.task').hover(function(){
//                         $(this).next('p').show();
//
//                         },function() {
//                         $(this).next('p').hide();
//                         });
//        var index = $(this).attr('name').split(':');
//                         alert('i :'+index[0]+'j :'+index[1]);
//                         var info = task[index[0]][index[1]];
//                         alert(info.name);
//
//                         var element = document.getElementById('bubble-span'+index[1]);
//                         element.style.position = "absolute";
//                         document.addEventListener("mousemove",onMouseMove);
//
//                         var onMouseMove = function(event){
//                         var x = event.clientX;
//                         var y = event.clientY;
//                         var width = ball.offsetWidth;
//                         var height = ball.offsetHeight;
//                         element.style.top = (y-height/2) + "px";
//                         element.style.left = (x-width/2) + "px";
//                         }
                         

    
}
    
    // task.jsの配列のデータを、「[日数]タスクの説明」のフォーマットにして返す
    const bubbleData = (i, j) => {
        console.log('i :'+ i +'  j :'+j);
//            let daytime = task[i][j].endTime - task[i][j].startTime + 1;
//            data = `<span class="time">
//            ${String(daytime)}日間
//            </span>
        let status = task[i][j].state;
        if(status == "plan"){
            data = `<span class="bubble-span plan">${task[i][j].name}</span>`;
        }else{
            data = `<span class="bubble-span result">${task[i][j].name}</span>`;
        }
        
        return data
    }
    
    window.onload = () => {
        dailyAreaDOM();
        let startTimeToMins = [], endTimeToMins = [], durationTimes = [];
        for(let i=0; i < Object.keys(task).length; i++) {
            if(task[i][0]) {
                setTimeScale(openingDay, closingDay);
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
        taskinfo();
    }


    
