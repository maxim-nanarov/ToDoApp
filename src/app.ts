let taskCount; 
let bool = true; 


window.addEventListener('load', loadPage)

function loadPage(){

    taskCount = window.localStorage.length; 
    allStorage();
    document.getElementById('ADD').addEventListener('click', OnClick);
}


function OnClick(){
addMission((<HTMLInputElement>document.getElementById('fname')).value); 
}

function addMission(theTask:string){

//creats the task and all its elements. 
let mainDiv = document.createElement('div'); 
mainDiv.id = 'missionDiv' + String(taskCount);
mainDiv.classList.add('missionDiv');                      //creates the div which will contain the rest of the elements
let ButtonE = document.createElement('button');        //the edit button, the edit function is in line 50
ButtonE.id = 'ButtonEdit'+String(taskCount);
console.log(ButtonE.id);
ButtonE.innerText = 'Edit';
ButtonE.setAttribute('onclick', "Edit(this.id)");
let ButtonR = document.createElement('button');        //creats the remove button, its function is in line 78
ButtonR.innerText = 'Remove';                               
ButtonR.setAttribute('onclick', "Remove(this.id)")
ButtonR.id = 'ButtonRemove'+ taskCount;
console.log(ButtonR.id);
let taskExpl = document.createElement('label');
taskExpl.id = 'label'+String(taskCount);
console.log('tasl expamole id: ' + taskExpl.id);
taskExpl.textContent = theTask;
let checkboxFinished = document.createElement('input'); 
checkboxFinished.type = "checkbox";
checkboxFinished.name = "isFinished";
mainDiv.appendChild(checkboxFinished);
mainDiv.appendChild(taskExpl);
let buttondiv = document.createElement('div');
buttondiv.id = 'buttonDiv';
buttondiv.classList.add('buttonDiv');
buttondiv.appendChild(ButtonE);
buttondiv.appendChild(ButtonR);
mainDiv.appendChild(buttondiv);
document.getElementById('list').appendChild(mainDiv);
// localStorage.setItem('taskCount', theTask);
window.localStorage.setItem(String(taskCount), theTask);
taskCount = window.localStorage.length;
}

function Edit(id: string) {
    console.log('id = ' +id[id.length - 1]);
    if (bool) {
        let taskDiv = document.getElementById("label" + id[id.length - 1]);
        console.log(taskDiv);
        let content: any = taskDiv?.innerHTML;
        let input = document.createElement("input");
        input.setAttribute("id", "toReplace" + id[id.length - 1]);
        input.setAttribute("value", content);
        if(taskDiv) {
            taskDiv.replaceWith(input);
            window.localStorage.setItem(id[id.length - 1], content);
        }
        bool = false;
    } else {
        let taskDiv = document.getElementById("toReplace" + id[id.length - 1]);
        let newContent = (<HTMLInputElement>(
            document.getElementById("toReplace" + id[id.length - 1])
        )).value;
        if (taskDiv) taskDiv.innerHTML = "";
        let newLable = document.createElement("label");
        newLable.setAttribute("id", "label" + taskCount.toString());
        newLable.innerHTML = newContent;
        if(taskDiv) {
            taskDiv.replaceWith(newLable);
            window.localStorage.setItem(id[id.length - 1], newContent);
        }
        bool = true;
    }
}


function Remove(id:any){
    let element = document.getElementById(id).parentElement;
    console.log(id[id.length -1]); 
    window.localStorage.removeItem((id[id.length -1]).toString());
    element.remove();
}
//Todo: repair the remove all function, it moves up the footer div 
function removeAll(){
    let element = document.getElementById('list');
    element.remove();
    let maindiv = document.createElement('div'); 
    maindiv.id = 'list'; 
    document.getElementById('body').appendChild(maindiv);
    window.localStorage.clear();
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]));
        addMission(localStorage.getItem(keys[i]))
    }

    return values;
}
