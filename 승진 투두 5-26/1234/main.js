const daysContainer = document.querySelector('.day');
const monthName = document.querySelector('.month-name');
const myInput = document.querySelector('.textToDo input');
const myButton = document.querySelector('.textToDo button')
const pre = document.querySelector('.left');  // 이전 달 버튼
const next = document.querySelector('.right'); // 다음 달 버튼
const date = new Date();
const iopL = document.getElementById('iop');
iopL.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        addList();
    }
});
let ooo = '';
let currentMon = date.getMonth() + 1;
let currentYear = date.getFullYear();
let currentDay = date.getDate();

let DayOfChoice = currentDay;
let MonOfChoice = currentMon;
let yearOfChoice = currentYear;

let year = currentYear;
let mon = currentMon;

let clickEventArr = [];

function isLeapYear(year) {
    return (year % 4 == 0) && (year % 400 == 0 || year % 100 != 0);
}

function getDayOfMon(mon, year) {
    if (mon === 1 || mon === 3 || mon === 5 || mon === 7 || mon === 8 || mon === 10 || mon === 12) {
        return 31;
    } else if (mon === 2) {
        return isLeapYear(year) ? 29 : 28;
    } else {
        return 30;
    }
}

function getDay(year, mon, date) {
    const conYMD = year + '-' + mon + '-' + date;
    return (new Date(conYMD).getDay());
}

function makeCalendar(year, mon, dayCount) {
    clickEventArr = [];
    daysContainer.innerHTML = '';
    let getFirstDay = getDay(year, mon, 1);
    let previousMon;
    if (mon - 1 < 0) {
        previousMon = 12;
    } else {
        previousMon = mon - 1;
    }
    let getDayOfPreMon = getDayOfMon(previousMon, year);
    for (let i = (getFirstDay + 6) % 7; i > 0; i--) {
        const listPre = document.createElement('li');
        listPre.textContent = `${getDayOfPreMon - (i - 1)}`;
        listPre.style.opacity = '0.5';
        listPre.classList.add('disabled');
        daysContainer.appendChild(listPre);
    }

    for (let i = 1; i <= dayCount; i++) {
        if (i === currentDay && year === currentYear && mon === currentMon) {
            const onlyOneList = document.createElement('li');
            onlyOneList.textContent = `${i}`;
            if (currentYear === yearOfChoice && currentMon === MonOfChoice && currentDay === DayOfChoice) {
                onlyOneList.style.border = '3px solid red';
            } else {
                onlyOneList.style.border = '3px solid black';
            }

            if (0 === getDay(year, mon, i)) {
                onlyOneList.style.color = 'red';
            } else if (6 == getDay(year, mon, i)) {
                onlyOneList.style.color = 'blue';
            }

            daysContainer.addEventListener('click', (event) => {
                if (event.target !== onlyOneList) {
                    onlyOneList.style.border = '3px solid black';
                }
            });

            daysContainer.appendChild(onlyOneList);
            continue;
        }

        const list = document.createElement('li');
        list.textContent = `${i}`;
        if (i === DayOfChoice && year === yearOfChoice && mon === MonOfChoice) {
            list.style.border = '3px solid red';
            daysContainer.addEventListener('click', (event) => {
                if (event.target !== list) {
                    list.style.border = 'none';
                }
            });
        }

        if (0 === getDay(year, mon, i)) {
            list.style.color = 'red';
        } else if (6 == getDay(year, mon, i)) {
            list.style.color = 'blue';
        }

        daysContainer.appendChild(list);
    }
}

function setMonthTitle(year, mon) {
    monthName.textContent = `${year}.${mon}`;
}

function nextMonthOrYear() {
    if (mon === 12) {
        year = year + 1;
        mon = 1;
    } else {
        mon = mon + 1;
    }
    setMonthTitle(year, mon);
    makeCalendar(year, mon, getDayOfMon(mon, year));
}

function preMonthOrYear() {
    if (mon === 1) {
        year = year - 1;
        mon = 12;
    } else {
        mon = mon - 1;
    }
    setMonthTitle(year, mon);
    makeCalendar(year, mon, getDayOfMon(mon, year));
}

document.getElementById('dayCount').addEventListener('click', function (event) {
    if (event.target.tagName === 'LI' && !event.target.classList.contains('disabled')) {
        ooo = event.target.textContent;
        const ab = event.target.textContent;

        let dayHTML = `<div class="dayList" id="${ab}"> ${year}년 ${mon}월 ${ab}일</div>`;
        document.getElementById("dayList").innerHTML = dayHTML;

       
        myInput.style.display = 'block';
        myInput.style.visibility = 'visible';
        myButton.style.display = 'block';
        myButton.style.visibility = 'visible';

        DayOfChoice = ab;
        MonOfChoice = mon;
        yearOfChoice = year;

        render();
    }
});

function addList() {
    let live = document.getElementById("iop");
    if (live.value == '') {
        alert('할 일을 적어주세요');
    } else {
        let task = {
            taskContent: live.value,
            id: listId(),
            date: `${yearOfChoice}-${MonOfChoice}-${DayOfChoice}`,
            isComplete: false, num:0
        };
        let todos = JSON.parse(localStorage.getItem(task.date)) || [];
        todos.push(task);
        localStorage.setItem(task.date, JSON.stringify(todos));
        render();
        live.value = '';
    }
}

function render() {
    let AllList = "";
    let dayToWrite = "";
    let currentDayTasks = JSON.parse(localStorage.getItem(`${yearOfChoice}-${MonOfChoice}-${DayOfChoice}`)) || [];
    let allTasks = [];

    for (let date in localStorage) {
        if (localStorage.hasOwnProperty(date)) {
            let tasks = JSON.parse(localStorage.getItem(date)) || [];
            tasks.forEach(task => {
                allTasks.push(task);
            });
        }
    }

    // 날짜순으로 정렬
    allTasks.sort((a, b) => new Date(a.date) - new Date(b.date));

    allTasks.forEach(task => {
        let taskHTML = `
            <div class="one">
                <div>
                    <button id="checkbutton2" onclick="buttonchange('${task.id}')">
                        <i class="fa-regular fa-${task.isComplete ? 'square-check' : 'square'}"></i>
                    </button>
                    <div id="dayTo">${task.date}</div>
                    <div id="inputrender">${task.taskContent}</div>
                </div>
                <button id="checkbutton" onclick="deleteL('${task.id}', '${task.date}')">
                    <i class="fa-regular fa-circle-xmark"></i>
                </button>
            </div>`;
        AllList += taskHTML;
    });

    currentDayTasks.forEach(task => {
       
        let dayTaskHTML = `
            <div class="one">
                <div>
                    <button id="checkbutton2" onclick="buttonchange('${task.id}')">
                        <i class="fa-regular fa-${task.isComplete ? 'square-check' : 'square'}"></i>
                    </button>
                    <div id="inputrender">${task.taskContent}</div>
                </div>
                <button id="checkbutton" onclick="deleteL('${task.id}', '${task.date}')">
                    <i class="fa-regular fa-circle-xmark"></i>
                </button>
            </div>`;
        dayToWrite += dayTaskHTML;
        
    });
    
    document.getElementById("listAll").innerHTML = AllList;
    document.getElementById("listToDo").innerHTML = dayToWrite;
}

function buttonchange(id) {
    for (let date in localStorage) {
        if (localStorage.hasOwnProperty(date)) {
            let tasks = JSON.parse(localStorage.getItem(date)) || [];
            tasks.forEach(task => {
                if (task.id === id) {
                    task.isComplete = !task.isComplete;
                }
            });
            localStorage.setItem(date, JSON.stringify(tasks));
        }
    }
    render();
}

function deleteL(id, date) {
    let tasks = JSON.parse(localStorage.getItem(date)) || [];
    tasks = tasks.filter(task => task.id !== id);
    if (tasks.length === 0) {
        localStorage.removeItem(date);
    } else {
        localStorage.setItem(date, JSON.stringify(tasks));
    }
    render();
}

function listId() {
    return Math.random().toString(36).substring(2, 9);
}

function main() {
    setMonthTitle(year, mon);
    makeCalendar(year, mon, getDayOfMon(mon, year));
}

pre.addEventListener('click', preMonthOrYear);
next.addEventListener('click', nextMonthOrYear);

main();
render();

myInput.style.display = 'none';
myButton.style.display = 'none';