let taskCount; 
let tasktotal;
let bool = true; 


window.addEventListener('load', loadPage)

function loadPage(){
    if(window.localStorage.getItem('taskCount') === undefined && window.localStorage.getItem('tasktotal') === undefined){
        let taskCount:number = 1;
        let tasktotal: number = 1;
        window.localStorage.setItem('taskCount', '0');
        window.localStorage.setItem('tasktotal', '0');
        } else{
            let taskCount: number = parseInt(window.localStorage.getItem('taskCount'));
            let tasktotal: number = parseInt(window.localStorage.getItem('tasktotal'));
        }
console.log('loaded the page');
console.log('this is the first local storage data there was: '+ window.localStorage.getItem('1'));
document.getElementById('ADD').addEventListener('click', OnClick);

}


function OnClick(){
console.log('clicked');
console.log((<HTMLInputElement>document.getElementById('fname')).value);
addMission((<HTMLInputElement>document.getElementById('fname')).value); 
}

function addMission(theTask:string){

//creats the task and all its elements. 
let mainDiv = document.createElement('div'); 
mainDiv.id = 'missionDiv' + taskCount.toString();
mainDiv.className = 'missionDiv';                      //creates the div which will contain the rest of the elements
let ButtonE = document.createElement('button');        //the edit button, the edit function is in line 50
ButtonE.id = 'ButtonEdit'+taskCount.toString();
console.log(ButtonE.id);
ButtonE.innerText = 'Edit';
ButtonE.setAttribute('onclick', "Edit(this.id)");
let ButtonR = document.createElement('button');        //creats the remove button, its function is in line 78
ButtonR.innerText = 'Remove';                               
ButtonR.setAttribute('onclick', "Remove(this.id)")
ButtonR.id = 'ButtonRemove'+ taskCount.toString();
console.log(ButtonR.id);
let taskExpl = document.createElement('label');
taskExpl.id = 'label'+taskCount;
console.log('tasl expamole id: ' + taskExpl.id);
taskExpl.textContent = theTask;
let checkboxFinished = document.createElement('input'); 
checkboxFinished.type = "checkbox";
checkboxFinished.name = "isFinished";
mainDiv.appendChild(checkboxFinished);
mainDiv.appendChild(taskExpl);
mainDiv.appendChild(ButtonE);
mainDiv.appendChild(ButtonR);
document.getElementById('list').appendChild(mainDiv);
// localStorage.setItem('taskCount', theTask);
window.localStorage.setItem(taskCount.toString(), theTask);
taskCount++;
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

// function finishEdit(id:any){
//     let element = document.getElementById(id).previousSibling;
//     let text = element.nodeValue;
//     let newtask = document.createElement('label');
//     newtask.nodeValue = text;
//     document.getElementById(id).previousSibling.remove();
//     document.getElementById(id).remove();
//     document.getElementById("mainDiv").appendChild(newtask);
// }

function Remove(id:any){
    let element = document.getElementById(id).parentElement; 
    element.remove();
}
//Todo: repair the remove all function, it moves up the footer div 
function removeAll(){
    let element = document.getElementById('list');
    element.remove();
    let maindiv = document.createElement('div'); 
    maindiv.id = 'list'; 
    document.getElementById('body').appendChild(maindiv);
}