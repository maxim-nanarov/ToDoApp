var taskCount;
var tasktotal;
var bool = true;
window.addEventListener('load', loadPage);
function loadPage() {
    if (window.localStorage.getItem('taskCount') === undefined && window.localStorage.getItem('tasktotal') === undefined) {
        var taskCount_1 = 1;
        var tasktotal_1 = 1;
        window.localStorage.setItem('taskCount', '0');
        window.localStorage.setItem('tasktotal', '0');
    }
    else {
        var taskCount_2 = parseInt(window.localStorage.getItem('taskCount'));
        var tasktotal_2 = parseInt(window.localStorage.getItem('tasktotal'));
        allStorage();
    }
    console.log('loaded the page');
    console.log('this is the first local storage data there was: ' + window.localStorage.getItem('1'));
    document.getElementById('ADD').addEventListener('click', OnClick);
}
function OnClick() {
    console.log('clicked');
    console.log(document.getElementById('fname').value);
    addMission(document.getElementById('fname').value);
}
function addMission(theTask) {
    //creats the task and all its elements. 
    var mainDiv = document.createElement('div');
    mainDiv.id = 'missionDiv' + String(taskCount);
    mainDiv.className = 'missionDiv'; //creates the div which will contain the rest of the elements
    var ButtonE = document.createElement('button'); //the edit button, the edit function is in line 50
    ButtonE.id = 'ButtonEdit' + String(taskCount);
    console.log(ButtonE.id);
    ButtonE.innerText = 'Edit';
    ButtonE.setAttribute('onclick', "Edit(this.id)");
    var ButtonR = document.createElement('button'); //creats the remove button, its function is in line 78
    ButtonR.innerText = 'Remove';
    ButtonR.setAttribute('onclick', "Remove(this.id)");
    ButtonR.id = 'ButtonRemove' + String(taskCount);
    console.log(ButtonR.id);
    var taskExpl = document.createElement('label');
    taskExpl.id = 'label' + String(taskCount);
    console.log('tasl expamole id: ' + taskExpl.id);
    taskExpl.textContent = theTask;
    var checkboxFinished = document.createElement('input');
    checkboxFinished.type = "checkbox";
    checkboxFinished.name = "isFinished";
    mainDiv.appendChild(checkboxFinished);
    mainDiv.appendChild(taskExpl);
    mainDiv.appendChild(ButtonE);
    mainDiv.appendChild(ButtonR);
    document.getElementById('list').appendChild(mainDiv);
    // localStorage.setItem('taskCount', theTask);
    window.localStorage.setItem(String(taskCount), theTask);
    taskCount++;
}
function Edit(id) {
    console.log('id = ' + id[id.length - 1]);
    if (bool) {
        var taskDiv = document.getElementById("label" + id[id.length - 1]);
        console.log(taskDiv);
        var content = taskDiv === null || taskDiv === void 0 ? void 0 : taskDiv.innerHTML;
        var input = document.createElement("input");
        input.setAttribute("id", "toReplace" + id[id.length - 1]);
        input.setAttribute("value", content);
        if (taskDiv) {
            taskDiv.replaceWith(input);
            window.localStorage.setItem(id[id.length - 1], content);
        }
        bool = false;
    }
    else {
        var taskDiv = document.getElementById("toReplace" + id[id.length - 1]);
        var newContent = (document.getElementById("toReplace" + id[id.length - 1])).value;
        if (taskDiv)
            taskDiv.innerHTML = "";
        var newLable = document.createElement("label");
        newLable.setAttribute("id", "label" + taskCount.toString());
        newLable.innerHTML = newContent;
        if (taskDiv) {
            taskDiv.replaceWith(newLable);
            window.localStorage.setItem(id[id.length - 1], newContent);
        }
        bool = true;
    }
}
// function finishEdit(id:any){
//     let element = document.getElementById(id).previousSibling;
//     let text = element.nodeValue;
//     let newtask = document.createElement('label');
//     newtask.nodeValue = text;
//     document.getElementById(id).previousSibling.remove();
//     document.getElementById(id).remove();
//     document.getElementById("mainDiv").appendChild(newtask);
// }
function Remove(id) {
    var element = document.getElementById(id).parentElement;
    element.remove();
}
//Todo: repair the remove all function, it moves up the footer div 
function removeAll() {
    var element = document.getElementById('list');
    element.remove();
    var maindiv = document.createElement('div');
    maindiv.id = 'list';
    document.getElementById('body').appendChild(maindiv);
}
function allStorage() {
    var values = [], keys = Object.keys(localStorage), i = keys.length;
    while (i--) {
        values.push(localStorage.getItem(keys[i]));
        addMission(localStorage.getItem(keys[i]));
    }
    return values;
}
