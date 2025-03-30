const addBox=document.querySelector(".add-box svg");
const popupBox=document.querySelector(".popup-box")
const form=document.querySelector("form");
const formBtn=form.querySelector("button");
const closeMark=document.querySelector("header svg");
const note=document.getElementById("note");
const description=document.getElementById("description");
const wrapper=document.querySelector(".wrapper");
let notesList=JSON.parse(localStorage.getItem("data"))|| [];
console.log(notesList)
//Get Items from local storage
const setNotesToLocalStorage=(data)=>localStorage.setItem("data",JSON.stringify(data));

const dateformat=()=>{
const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","sep","Oct","Nov","Dec"];
let currentDate=new Date();
return `${months[currentDate.getMonth()]},${currentDate.getDate()} ${currentDate.getUTCFullYear()}`;
}

//  Regex Validation Function
 const validateFields=(note, description)=> {
     const noteError = document.getElementById("note-error");
     let isValid = true;
     const descriptionError = document.getElementById("description-error");
     const validate = (value, errorEl, minLen, maxLen, fieldName) => {
            if (!value.trim()) {
                errorEl.textContent = `${fieldName} cannot be empty!`;
                return false;
            }
            if (!new RegExp(`^[\\w\\s.!?-]{${minLen},${maxLen}}$`).test(value)) {
                errorEl.textContent = `Invalid ${fieldName}! Only letters, numbers, spaces, and basic punctuation (.,!?-) are allowed (${minLen}-${maxLen} chars).`;
                return false;
            }
            errorEl.textContent = "";
            return true;
        };
        isValid &= validate(note.value, noteError, 1, 100, "note");
        isValid &= validate(description.value, descriptionError, 1, 500, "description");
        return isValid;
}
// handel submit function
const handelSubmit=(e)=>{
    e.preventDefault();
    if(!validateFields(note,description)) return
    notesList.push({title: note.value, description: description.value, creationDate:dateformat()});
    note.value=""
    description.value=""
    popupBox.classList.remove("show");
    setNotesToLocalStorage(notesList);
    showNotes();
}
// handel submit event
form.addEventListener("submit",handelSubmit);



const showNotes = () => {
    wrapper.innerHTML = ""; // Clear previous notes efficiently
    const fragment = document.createDocumentFragment();
    notesList.forEach((note, index) => {
        const li = document.createElement("li");
        li.classList.add("note");
        li.innerHTML = `
            <div class="details">
                <p>${note.title}</p>
                <span>${note.description}</span>
            </div>
            <div class="bottom-content">
                <span>${note.creationDate}</span>
                <div class="settings">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
                    <ul class="menu">
                        <li class="edit-btn">
                            Edite
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00FD17FF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                        </li>
                        <li class="delete-btn">
                              Delete
                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D93838FF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                        </li>
                    </ul>
                </div>
            </div>
        `;
        fragment.appendChild(li);
    });

    wrapper.appendChild(fragment);
};
// show popup to add new Note
addBox.addEventListener("click",()=>{
        popupBox.classList.add("show");
})
// close popup
closeMark.addEventListener("click",()=>{
        popupBox.classList.remove("show");
});
// update and delete note
showNotes();

