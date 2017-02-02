var todos = [];
var table;
var newTr;
var newTd;
var newBox;
var newX;
var taskId = 0;
var CRowTr;
var CRowTr2;

function processForm(e) 
{
        var tb = document.getElementById('textbox');
    //  console.log(tb.value);
        var task = {lbl: tb.value, done: false, deleted: false};
        todos.push(task);
        debug();
        appendToList(task);
        tb.value="";
        CRowTr.style.visibility = "";
        CRowTr2.style.visibility = "";
}

function debug()
{
    for (var i = 0; i < todos.length; i++)
    {
        var task = todos[i];
        console.log(task.lbl);
    }
}

function appendToList(task)
{
    var myId = taskId;
    newTr = document.createElement('tr');
    newTd = document.createElement('td');
    task.id = myId;
    newTr.id = "newTr" + myId;
    newTd.id = "newTd" + myId;
    var newLbl = document.createElement('label');
    newLbl.innerHTML = task.lbl;
    newTd.setAttribute('colspan', '3');
    newTr.appendChild(newTd);
    table.appendChild(newTr);
    newTr.className = "purpleBorder";
    newBox = document.createElement('input');
    newBox.id = "done";
    newBox.name = "displayItem";
    newBox.type = "checkbox";
    newBox.value = "newItem";
    newBox.onclick = function() {
        if (newLbl.classList.contains('line')) {
            newLbl.classList.remove('line');
            task.done = false;
            countActiveItems();
        } else {
            newLbl.classList.add('line');
            task.done = true;
            countActiveItems();
        }
    };
    if(task.done === true)
    {
        newLbl.classList.add('line');
    }
    newLbl.classList.add("todoItem");
    newLbl.classList.add("newRow");
    //newLbl.className = "todoItem";
    newLbl.id = "line" + myId;
    newLbl.for = "done";
    newX = document.createElement('span');
    newX.id = "x";
    newX.className = "glyphicon glyphicon-remove";
    newX.onclick = function() { deleteRow('newTr' + myId, myId); };
    table.className = "";
    newTd.appendChild(newBox);
    newTd.appendChild(newLbl);
    newTd.appendChild(newX);
    countActiveItems();
  // }
    
    var chev = document.getElementById('chev');
    chev.classList.remove('hide');
    taskId += 1;
}

function deleteRow(tableRow, myId)
{
    var row = document.getElementById(tableRow);
    table.removeChild(row);
    todos = todos.filter(todo => todo.id !== myId);
    countActiveItems();
}
function deleteTableRow(tableRow)
{
    var row = document.getElementById(tableRow);
    table.removeChild(row);
    countActiveItems();
}
function deleteCompleted()
{
    
    todos.filter(todo => todo.done)
        .map(todo => todo.id)
        .forEach(id => deleteRow('newTr' + id, id));
    countActiveItems();
}
function showAll()
{
        var rows = document.getElementsByTagName('tr');
        var rowParent;
    for(var i = rows.length-1; i >= 0; i--)
    {
        var tr = rows[i]; 
        if (tr.id !== "firstRow")
        {
            rowParent = tr.parentElement;
            //tr.parentElement.removeChild(tr);
            table.removeChild(tr);
        }
    }
   
    for(var j = 0; j < todos.length; j++)
    {
        appendToList(todos[j]);
        if (todos[j].done === true) {
            newBox.checked = true;
        }
    }
}
function showActive()
{
   var rows = document.getElementsByTagName('tr');
   var rowParent;
for(var i = rows.length-1; i >= 0; i--)
    {
        var tr = rows[i]; 
        if (tr.id !== "firstRow")
            {
                rowParent = tr.parentElement;
                //tr.parentElement.removeChild(tr);
                table.removeChild(tr);
            }
    }
    for(var j = 0; j < todos.length; j++)
    {
        if(todos[j].done === false){
            appendToList(todos[j]);
        }
    }
}
function showCompleted()
{
   var rows = document.getElementsByTagName('tr');
   var rowParent;
for(var i = rows.length-1; i >= 0; i--)
    {
        var tr = rows[i]; 
        if (tr.id !== "firstRow")
            {
                rowParent = tr.parentElement;
                //tr.parentElement.removeChild(tr);
                table.removeChild(tr);
            }
    }
    for(var j = 0; j < todos.length; j++)
    {
        if(todos[j].done === true){
            appendToList(todos[j]);
            newBox.checked = true;
        }
    }
}
function countActiveItems()
{
    var count = 0;
    for(var m = 0; m < todos.length; m++)
    {
        if(todos[m].done === false)
        {
            count++;
        }
    }
    var number = document.getElementById('itemNumber');
    number.innerHTML = count;
    if (count === 1)
    {
        document.getElementById('itemsLeft').innerHTML = "item left";
    } else {
        document.getElementById('itemsLeft').innerHTML = "items left";
    }
}

window.onload = function()
{
    table = document.getElementById('tbody');
    table.className = "hiddenBorder";
    CRowTr = document.createElement('div');
    var CRowTd = document.createElement('span');
    var CRowTd2 = document.createElement('span');
    var CRowTd3 = document.createElement('span');
    var CRowLbl = document.createElement('label');
    var CRowBtn = document.createElement('button');
    CRowTr2 = document.createElement('div');
    var CRowTr2Style = document.createElement('div');
    CRowTr2Style.id = "bottomRowStyle";
    var CRowTd4 = document.createElement('span');
    var CRowTd5 = document.createElement('span');
    var CRowLbl2 = document.createElement('label');
    var CRowBtn2 = document.createElement('button');
    var CRowBtn3 = document.createElement('button');
    var CRowBtn4 = document.createElement('button');
    var CRowNumber = document.createElement('lbl');
    CRowTr.classList.add('CRowDiv');
    CRowTr2.classList.add('CRowDiv');
    CRowTr2.id = "bottomRow";
    CRowTr.appendChild(CRowTd);
    CRowTr.appendChild(CRowTd2);
    CRowTr.appendChild(CRowTd3);
    CRowTr.classList.add('purpleBorder');
    CRowTr.style.visibility = "hidden";
    CRowTd.appendChild(CRowNumber);
    CRowTd2.appendChild(CRowLbl);
    CRowTd4.appendChild(CRowLbl2);
    CRowTr2Style.appendChild(CRowTd4);
    CRowTr2Style.appendChild(CRowTd5);
    CRowTr2.appendChild(CRowTr2Style);
    CRowTr2.style.visibility = "hidden";
    CRowTd3.appendChild(CRowBtn);
    CRowTd3.rowSpan = "2";
    CRowTd.id = "controlRowCell1";
    CRowTd2.id = "controlRowCell2";
    CRowTd3.id = "controlRowCell3";
    CRowNumber.id = "itemNumber";
    CRowLbl.id = "show";
    CRowLbl.innerHTML = "show:";
    CRowBtn.id = "button1";
    CRowBtn.className = "btn btn-primary";
    CRowBtn.innerHTML = "Clear \n Completed";
    CRowBtn.onclick = deleteCompleted;
    CRowTd4.id = "controlRowCell4";
    CRowLbl2.id = "itemsLeft";
    CRowLbl2.innerHTML = "items left";
    CRowTd5.id = "controlRowCell5";
    CRowTd5.appendChild(CRowBtn2);
    CRowTd5.appendChild(CRowBtn3);
    CRowTd5.appendChild(CRowBtn4);
    CRowBtn2.id = "button2";
    CRowBtn3.id = "button3";
    CRowBtn4.id = "button4";
    CRowBtn2.className = "btn btn-primary";
    CRowBtn3.className = "btn btn-primary";
    CRowBtn4.className = "btn btn-primary";
    CRowBtn2.onclick = showAll;
    CRowBtn3.onclick = showActive;
    CRowBtn4.onclick = showCompleted;
    CRowBtn2.innerHTML = "All";
    CRowBtn3.innerHTML = "Active";
    CRowBtn4.innerHTML = "Completed";
    document.body.appendChild(CRowTr);
    document.body.appendChild(CRowTr2);
    document.getElementById('textbox').onkeydown = function(event){
        if (event.keyCode == 13) {
            processForm();
        }
    };
}
/*var form = document.getElementById('formTodo');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}*/


/*
function onLoad()
{
    document.getElementById('newRow').style.visibility="hidden";
    document.getElementById('controlRow1').style.visibility="hidden";
    document.getElementById('controlRow2').style.visibility="hidden";
    document.getElementById('chev').style.visibility="hidden";
}


function enterKey(e)
{
    var char =('charCode' in event) ? event.charCode : event.keyCode;
    if(e.keyCode === 13)
    document.getElementById("textbox")
    .addEventListener("keydown", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("submit").click();
    }
});
document.onkeydown = function(event) {
     var keyCode = event ? (event.which ? event.which : event.keyCode) : event.keyCode;
     if (keyCode == 13) {
        document.getElementById('table').style.class="purpleBorder";
        document.getElementById('newRow').style.visibility="visible";
        document.getElementById('controlRow1').style.visibility="visible";
        document.getElementById('controlRow2').style.visibility="visible";
        document.getElementById('chev').style.visibility="visible";
        /*return false;
     }
}*/
