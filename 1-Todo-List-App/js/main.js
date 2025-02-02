/* ======================Customize Cursor======================== */
/* =======================Select Elements======================== */
const form=document.querySelector('form');
const todoInput=document.getElementById("todo-input");
const ul=document.getElementById("todo-List");
let addAndUpDateButton=document.getElementById("add-button");
let items=[];
/* ===================listen to Submit Event========================== */
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    items.push(todoInput.value);
    showItems();
    console.log(items.length)
})

/* ============================show Items List================================== */
showItems=()=>{
    for (let i =items.length-1;i<items.length;i++){
       ul.appendChild(creatNewLi(items[i],i))
    }
}
/* =========================== function that's return the new item in il element================================== */

creatNewLi=(ele,index)=>{
    let li =document.createElement("li");
    li.className="todo";
    li.innerHTML=`
            <input type="checkbox" id="todo-${index}">
            <label class="custom-checkbox" for="todo-${index}">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                     fill="transparent"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
            </label>
            <label class="todo-text">${ele}</label>
            <button class="update-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--accent-color)"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93ZM320-320v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T663-540L443-320H320Zm300-263-37-37 37 37ZM380-380h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>
            </button>
            <button class="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                     fill="var(--accent-color)"><path
                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>    
    `
    return li;
}
