const addBox=document.querySelector(".add-box");
const popupBox=document.querySelector(".popup-box")
const form=document.querySelector("form");
const formBtn=form.querySelector("button");
const closeMark=document.querySelector("header span");
const note=document.getElementById("note");
const description=document.getElementById("description");
let notesList=[];
//  Regex Validation Function
 const validateFields=(note, description)=> {
     const noteError = document.getElementById("note-error");
     const descriptionError = document.getElementById("description-error");
     let isValid = true;
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
    if(!validateFields(note,description))return
    e.preventDefault();
    notesList.push({noteText: note.value, descriptionText: description.value,creationDate:new Date("YYYY-MM-DD")});
}

// handel submit event
form.addEventListener("submit",handelSubmit)
// close popup
closeMark.addEventListener("click",()=>{
    popupBox.classList.remove("show")
});
// show the notes
// set and get Items from local storage
// update and delete note
