// DOM Elements
const closeSvg = document.querySelector("header svg");
const form = document.querySelector("form");
const noteInput = form.querySelector("input");
const descriptionInput = form.querySelector("textarea");
const wrapper = document.querySelector(".wrapper");
const deleteBtn = document.querySelector("button.delete");
const cancelBtn = document.querySelector("button.cancel");
const popupBox = document.querySelector(".popup-box");
const deletePopup = document.querySelector(".delete-popup");

let notes = JSON.parse(localStorage.getItem("notesList")) || [];
let editMode = false,globalIndex;
const dateFormat = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    return `${months[now.getMonth()]},${now.getDate()} ${now.getFullYear()}`;
};

const createAddNoteElement = () => {
    const li = document.createElement("li");
    li.className = "add-box";
    li.innerHTML = `
    <div class="icon">
       <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
       <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
    </div>
    <h3>Add New Note</h3>`;
    li.addEventListener("click", () => popupBox.classList.add("show"));
    wrapper.appendChild(li);
};
const createNoteItem = (note, index) => {
    const li = document.createElement("li");
    li.className = "note";
    li.innerHTML = `
    <div class="details">
      <div class="title">
        <h3>${note.title}</h3>
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z"/></svg>
        </span>
      </div>
      <span class="description">${cutText(note.description)}</span>
    </div>
    <div class="bottom-content">
      <span>${note.createAt}</span>
      <div class="settings">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
        <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
        </svg>
        <ul>
          <li class="edit" onclick="editNote(${index})">
          Edit 
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00FD17FF">
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
          </svg>
          </li>
          <li class="delete" onclick="deleteNote(${index})">
          Delete
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D93838FF">
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
          </svg>
          </li>
        </ul>
      </div>
    </div>`;
    return li;
};

const cutText = (text, limit = 200) => text.length > limit ? text.slice(0, limit) + "..." : text;

const validateFields = () => {
    const notePattern = /^[a-zA-Z0-9\s.,!?@#$%^&*()\-]{1,100}$/;
    const descriptionPattern = /^[\p{L}\p{N}\s.,!?@#$%^&*()\-]{1,1500}$/u;
    const inputMsg = document.getElementById("note-error");
    const descriptionMsg = document.getElementById("description-error");

    const title = noteInput.value.trim();
    const description = descriptionInput.value.trim();

    let valid = true;

    if (!title) {
        inputMsg.textContent = "This field cannot be empty";
        valid = false;
    } else if (!notePattern.test(title)) {
        inputMsg.textContent = "Invalid note title.";
        valid = false;
    } else {
        inputMsg.textContent = "";
    }

    if (!description) {
        descriptionMsg.textContent = "This field cannot be empty";
        valid = false;
    } else if (!descriptionPattern.test(description)) {
        descriptionMsg.textContent = "Invalid description.";
        valid = false;
    } else {
        descriptionMsg.textContent = "";
    }

    return valid;
};

const setItemsToLocalStorage = (data) => localStorage.setItem("notesList", JSON.stringify(data));
const showNotes = () => {
    wrapper.innerHTML = "";
    createAddNoteElement();
    notes.forEach((note, index) => {
        wrapper.appendChild(createNoteItem(note, index));
    });
};
const addNewNote = () => {
    notes.push({
        title: noteInput.value,
        description: descriptionInput.value,
        createAt: dateFormat()
    });
};
const editNote = (index) => {
    globalIndex = index;
    editMode = true;
    popupBox.classList.add("show");
    noteInput.value = notes[index].title;
    descriptionInput.value = notes[index].description;
};
const deleteNote = (index) => {
    deletePopup.classList.add("show");
    deleteBtn.onclick = () => {
        notes.splice(index, 1);
        setItemsToLocalStorage(notes);
        deletePopup.classList.remove("show");
        showNotes();
    };
    cancelBtn.onclick = () => deletePopup.classList.remove("show");
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    if (editMode) {
        notes[globalIndex].title = noteInput.value;
        notes[globalIndex].description = descriptionInput.value;
    } else {
        addNewNote();
    }
    setItemsToLocalStorage(notes);
    noteInput.value = "";
    descriptionInput.value = "";
    popupBox.classList.remove("show");
    editMode = false;
    showNotes();
};

form.addEventListener("submit", handleFormSubmit);
closeSvg.addEventListener("click", () => popupBox.classList.remove("show"));

showNotes();
