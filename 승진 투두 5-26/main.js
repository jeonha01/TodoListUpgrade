const daysContainer = document.querySelector('.day');
const monthName = document.querySelector('.month-name');
let ooo = '';
const month = "2024년 5월";
const lastDay = 31;
const startDay = 3;
const myInput = document.querySelector('.textToDo input');
const myButton = document.querySelector('.textToDo button');
let enterButton  = document.getElementById('iop');
monthName.textContent = month;


enterButton.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        addList();
    }
})
function getCalendar() {
    daysContainer.innerHTML = '';

    for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement('li');
        emptyDay.classList.add('empty');
        daysContainer.appendChild(emptyDay);
    }

    for (let i = 1; i <= lastDay; i++) {
        const day = document.createElement('li');
        day.textContent = i;
        day.id = `day${i}`;
        daysContainer.appendChild(day);
    }
}

document.getElementById('dayCount').addEventListener('click', function (event) {
    ooo = event.target.textContent;
    const ab = event.target.textContent;

    let dayHTML = `<div class="dayList" id="${ab}"> 2024년 5월 ${ab}일</div>`;
    document.getElementById("dayList").innerHTML = dayHTML;
    myInput.style.display = 'block';
    myButton.style.display = 'block';
    render();
});

let list = [];

function addList() {
    let live = document.getElementById("iop");
    if (live.value == '') {
        alert('할 일을 적어주세요');
    } else {
        let task = {
            taskContent: live.value,
            id: listId(),
            re: ooo,
            isComplete: false
        };
        list.push(task);
        render();
        live.value = '';
    }
}

function render() {
    let AllList = "";
    let dayToWrite = "";
    for (let i = 0; i < list.length; i++) {
        let taskHTML = `
            <div class="one">
                <div>
                    <button id="checkbutton2" onclick="buttonchange('${list[i].id}')">
                        <i class="fa-regular fa-${list[i].isComplete ? 'square-check' : 'square'}"></i>
                    </button>
                    <div id="dayTo">5월 ${list[i].re}일</div>
                    <div id="inputrender">${list[i].taskContent}</div>
                </div>
                <button id="checkbutton" onclick="deleteL('${list[i].id}')">
                    <i class="fa-regular fa-circle-xmark"></i>
                </button>
            </div>`;
        
        AllList += taskHTML;
        if (list[i].re == ooo) {
            let dayTaskHTML = taskHTML.replace(`<div id="dayTo">5월 ${list[i].re}일</div>`, '');
            dayToWrite += dayTaskHTML;
        }
    }
    document.getElementById("listAll").innerHTML = AllList;
    document.getElementById("listToDo").innerHTML = dayToWrite;
}

function buttonchange(id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            list[i].isComplete = !list[i].isComplete;
            break;
        }
    }
    render();
}

function deleteL(id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            list.splice(i, 1);
            break;
        }
    }
    render();
}

function listId() {
    return Math.random().toString(36).substring(2, 9);
}

getCalendar();
myInput.style.display = 'none';
myButton.style.display = 'none';