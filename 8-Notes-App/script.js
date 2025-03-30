const addBox=document.querySelector(".add-box");
const popupBox=document.querySelector(".popup-box")
const form=document.querySelector("form");
const formBtn=form.querySelector("button");
const closeMark=document.querySelector("header span");
const note=document.getElementById("note");
const description=document.getElementById("description");
const wrapper=document.querySelector(".wrapper");
let notesList=[];
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
            if (!new RegExp(`^[\\w\\s.,!?-]{${minLen},${maxLen}}$`).test(value)) {
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
    if(!validateFields(note,description)) {
        return
    }
    notesList.push({title: note.value, description: description.value, creationDate:dateformat()});
    note.value=""
    description.value=""
    setTimeout(()=>{
        popupBox.classList.remove("show");
    },300);
    showNotes();
}

// handel submit event
form.addEventListener("submit",handelSubmit)
// show form popup to add new Note
addBox.addEventListener("click",()=>{
    setTimeout(()=>{
        popupBox.classList.add("show");
        },300)
})
// close popup
 closeMark.addEventListener("click",()=>{
    setTimeout(()=>{
        popupBox.classList.remove("show");
    },300)
});
//  able and disable form button
// show the notes
const showNotes=()=>{
    notesList.forEach((note,index)=>{
        wrapper.innerHTML+=`
          <li class="note">
                <div class="details">
                    <p>${note.title}</p>
                    <span>${note.description}</span>
                </div>
                <div class="bottom-content">
                    <span>${note.creationDate}</span>
                    <div class="settings">
                        <span class="material-symbols-outlined">more_horiz</span>
                        <ul class="menu">
                        <li>
                            <span>Edite</span>
                            <span class="material-symbols-outlined">edit</span>
                        </li>
                        <li>
                            <span>Delete</span>
                            <span class="material-symbols-outlined">delete</span>
                        </li>
                        </ul>
                    </div>
                </div>
            </li>
        `
    })
}
showNotes();

// set and get Items from local storage
// update and delete note
