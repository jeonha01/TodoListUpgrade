

const daysContainer = document.querySelector('.day');
const monthName = document.querySelector('.month-name');
let todoTitle = document.getElementById("todo-title")
const month = "2024년 5월";
const lastDay = 31;
const startDay = 3;
const Day = document.querySelector('.day');
let aqweqwe = document.getElementById('#textToDo');
monthName.textContent = month;



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



/*let inputT = document.querySelector('#iop')
let myInput = live.querySelector('input')
inputT.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addList(event)
    }
});*/





let ooo = '';
let dayCount = document.getElementById('dayCount')
dayCount.addEventListener('click', function (event) {
    ooo = event.target.textContent;
    const ab = event.target.textContent

    let dayHTML = `<div class = "dayList" id="${ab}"> 2024년 5월 ${ab}일</div>`
    //dayHTML.addEventListener('click', ?)
    document.getElementById("dayList").innerHTML = dayHTML;

    /*let inputT = `<input type="text" id="iop">
    <button id="add-button" class="addB" onclick="addList(${event.target.textContent})">추가</button>`
    document.getElementById("textToDo").innerHTML = inputT;
*/



    render();


});


list = [];
function addList(e) {
    let live = document.getElementById("iop")
    if (document.getElementById('iop').value == '') {
        alert('할 일을 적어주세요')
    } else {
        let task = {
            taskContent: live.value
            , id: listId(), re: e,
            isComplete: false
        }
        list.push(task);
        render(e);
        document.getElementById('iop').value = ''
    }

}

function render() {
    let AllList = "";
    let dayToWrite = "";
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            ppp = `<div class="one">
            <div>
            <button id="checkbutton2" onclick="buttonchange('${list[i].id}')"><i class="fa-regular fa-square-check"></i></button>
            <div id="dayTo">5월 ${list[i].re}일</div>
            <div id="inputrender">${list[i].taskContent}</div>
            </div>
                    
                    <button id="checkbutton" onclick="deleteL('${list[i].id}')"><i class="fa-regular fa-circle-xmark"></i></button>
                
             </div>`;
            AllList += ppp;
            let qqq = ppp.replace(`<div id="dayTo">5월 ${list[i].re}일</div>`, '');
            if (list[i].re == ooo) {
                dayToWrite += qqq;
            }
        }
        else {
            ppp = `<div class="one">
        <div>
        <button id="checkbutton2" onclick="buttonchange('${list[i].id}')"><i class="fa-regular fa-square"></i></button>
        <div id="dayTo">5월 ${list[i].re}일</div>
        <div id="inputrender">${list[i].taskContent}</div>
        </div>
                
                <button id="checkbutton" onclick="deleteL('${list[i].id}')"><i class="fa-regular fa-circle-xmark"></i></button>
            
         </div>`;
            AllList += ppp;
            let qqq = ppp.replace(`<div id="dayTo">5월 ${list[i].re}일</div>`, '');
            if (list[i].re == ooo) {
                dayToWrite += qqq;
            }
        }


    }
    document.getElementById("listAll").innerHTML = AllList;
    document.getElementById("listToDo").innerHTML = dayToWrite;

}

function buttonchange(id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            list[i].isComplete = !list[i].isComplete
            break
        }
    }
    render()
}

function deleteL(id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            list.splice(i, 1)
            break;
        }
    }
    render();
}

function listId() {
    return Math.random().toString(36).substring(2, 9);
}
awqeqwe
getCalendar();
