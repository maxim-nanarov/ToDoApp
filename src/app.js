var taskCount;
var bool = true;
window.addEventListener('load', loadPage);
function loadPage() {
    taskCount = window.localStorage.length;
    allStorage();
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
    ButtonR.id = 'ButtonRemove' + taskCount;
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
    taskCount = window.localStorage.length;
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
function Remove(id) {
    var element = document.getElementById(id).parentElement;
    console.log(id[id.length - 1]);
    window.localStorage.removeItem((id[id.length - 1]).toString());
    element.remove();
}
//Todo: repair the remove all function, it moves up the footer div 
function removeAll() {
    var element = document.getElementById('list');
    element.remove();
    var maindiv = document.createElement('div');
    maindiv.id = 'list';
    document.getElementById('body').appendChild(maindiv);
    window.localStorage.clear();
}
function allStorage() {
    var values = [], keys = Object.keys(localStorage), i = keys.length;
    while (i--) {
        values.push(localStorage.getItem(keys[i]));
        addMission(localStorage.getItem(keys[i]));
    }
    return values;
}
