
const daysContainer = document.querySelector('.day');
const monthName = document.querySelector('.month-name');
let todoTitle = document.getElementById("todo-title")
const month = "2024년 5월";
const lastDay = 31;
const startDay = 3;
const Day = document.querySelector('.day');
monthName.textContent = month;
inputRender = '';
let taskInput = document.getElementById("iop")
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


let dayCount = document.getElementById('dayCount')
dayCount.addEventListener('click', function (event) {
    const ab = event.target.textContent

    let dayHTML = `<div class = "dayList" id="${ab}"> 2024년 5월 ${ab}일</div>`
    //dayHTML.addEventListener('click', ?)
    document.getElementById("dayList").innerHTML = dayHTML;

    let inputT = `<input type="text" id="iop">
                <button id="add-button" class="addB" onclick="render1()">추가</button>`
    document.getElementById("textToDo").innerHTML = inputT;


});

/*taskInput.addEventListener('keydown', function (event) { <----------- // 엔터키 치면 버튼 눌러지는거 보류 코드 ㅎㅎ
    if (event.keyCode === 13) {
        render1(event)
    }
})*/

getCalendar();

let oppp = [];

function render1() { // 할 일 클릭하면 보여주는 함수
    if (document.getElementById('iop').value == '') {
        alert('할 일을 적어주세요')
    } else {
        inputRender += `<div class="ooo"><button id="checkbutton"><i class="fa-regular fa-square"></i></button>
                        <div id="inputrender">${document.getElementById('iop').value}</div>
                        </div>`
        oppp.push(inputRender);
        for (i = 0; i < oppp.length; i++) {
            document.getElementById("listToDo").innerHTML = oppp[i];
            document.getElementById('iop').value = '' // 추가하면 input 창 비워지게
        }
    }
}

