var bool = true;
var taskCount = 1;
var tasktotal = 1;
window.addEventListener('load', loadPage);
function loadPage() {
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
    mainDiv.id = 'missionDiv' + taskCount.toString();
    mainDiv.className = 'missionDiv'; //creates the div which will contain the rest of the elements
    var ButtonE = document.createElement('button'); //the edit button, the edit function is in line 50
    ButtonE.id = 'ButtonEdit' + taskCount.toString();
    console.log(ButtonE.id);
    ButtonE.innerText = 'Edit';
    ButtonE.setAttribute('onclick', "Edit(this.id)");
    var ButtonR = document.createElement('button'); //creats the remove button, its function is in line 78
    ButtonR.innerText = 'Remove';
    ButtonR.setAttribute('onclick', "Remove(this.id)");
    ButtonR.id = 'ButtonRemove' + taskCount.toString();
    console.log(ButtonR.id);
    var taskExpl = document.createElement('label');
    taskExpl.id = 'label' + taskCount;
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
    localStorage.setItem('taskCount', theTask);
    window.localStorage.setItem(taskCount.toString(), theTask);
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
        if (taskDiv)
            taskDiv.replaceWith(input);
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
        if (taskDiv)
            taskDiv.replaceWith(newLable);
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
